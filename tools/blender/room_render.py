"""Olculu ic mekan kabugu + Cycles render.

Kullanim:
    blender -b -P tools/blender/room_render.py -- --w 3.6 --d 4.2 --h 2.8 --out out.png

Tum olculer METRE. Blender'in birim sistemi metrik olarak kurulur, yani
buradaki 3.6 gercekten 3.60 m'dir; musteriye giden gorsel ile ustanin
aldigi olcu ayni sayidir.
"""

import argparse
import math
import sys

import bpy


# --- CLI -------------------------------------------------------------------

def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    p = argparse.ArgumentParser()
    p.add_argument("--w", type=float, default=3.60, help="ic genislik (m)")
    p.add_argument("--d", type=float, default=4.20, help="ic derinlik (m)")
    p.add_argument("--h", type=float, default=2.80, help="tavan yuksekligi (m)")
    p.add_argument("--counter-depth", type=float, default=0.60, help="tezgah derinligi (m)")
    p.add_argument("--counter-height", type=float, default=0.90, help="tezgah yuksekligi (m)")
    p.add_argument("--win-width", type=float, default=1.40, help="pencere genisligi (m)")
    p.add_argument("--win-height", type=float, default=1.30, help="pencere yuksekligi (m)")
    p.add_argument("--win-sill", type=float, default=1.00, help="pencere denizlik kotu (m)")
    p.add_argument("--samples", type=int, default=64)
    p.add_argument("--res", type=int, default=1280)
    p.add_argument("--out", default="/tmp/room.png")
    p.add_argument("--save-blend", default=None,
                   help=".blend olarak da kaydet (Blender GUI'de acip devam etmek icin)")
    p.add_argument("--no-denoise", action="store_true",
                   help="denoise kapat (dagitim derlemesinde OIDN yoksa otomatik de kapanir)")
    return p.parse_args(argv)


# --- yardimcilar -----------------------------------------------------------

def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.length_unit = "METERS"
    return scene


def material(name, color, roughness=0.5, metallic=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    # Blender 4.x'te bazi soket adlari degisti; varsa yaz, yoksa atla.
    def setv(key, value):
        if key in bsdf.inputs:
            bsdf.inputs[key].default_value = value
    setv("Base Color", (*color, 1.0))
    setv("Roughness", roughness)
    setv("Metallic", metallic)
    return mat


def box(name, size, location, mat=None):
    """Merkezi degil, MIN kosesi `location` olan kutu -- olcu takibi kolay olsun diye."""
    bpy.ops.mesh.primitive_cube_add(size=1.0)
    ob = bpy.context.active_object
    ob.name = name
    ob.scale = size
    ob.location = (
        location[0] + size[0] / 2,
        location[1] + size[1] / 2,
        location[2] + size[2] / 2,
    )
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if mat:
        ob.data.materials.append(mat)
    return ob


def main():
    a = parse_args()
    scene = reset_scene()

    W, D, H, T = a.w, a.d, a.h, 0.10  # T = duvar kalinligi

    m_floor = material("Zemin_Parke", (0.38, 0.24, 0.14), roughness=0.35)
    m_wall = material("Duvar_Boya", (0.88, 0.87, 0.84), roughness=0.85)
    m_counter = material("Tezgah_Mermer", (0.90, 0.90, 0.88), roughness=0.18)
    m_cab = material("Dolap", (0.16, 0.20, 0.22), roughness=0.45)

    # Zemin + tavan
    box("Zemin", (W, D, T), (0, 0, -T), m_floor)
    box("Tavan", (W, D, T), (0, 0, H), m_wall)

    # Arka duvar (y = D) -- PENCERE burada, 4 parca halinde orulur (boolean yok)
    ws, wh, sill = a.win_width, a.win_height, a.win_sill
    x0 = (W - ws) / 2
    box("Duvar_Arka_Alt", (W, T, sill), (0, D, 0), m_wall)
    box("Duvar_Arka_Ust", (W, T, H - sill - wh), (0, D, sill + wh), m_wall)
    box("Duvar_Arka_Sol", (x0, T, wh), (0, D, sill), m_wall)
    box("Duvar_Arka_Sag", (W - x0 - ws, T, wh), (x0 + ws, D, sill), m_wall)

    # Yan duvarlar + on duvar (kamera arkasi acik biraktik)
    box("Duvar_Sol", (T, D, H), (-T, 0, 0), m_wall)
    box("Duvar_Sag", (T, D, H), (W, 0, 0), m_wall)

    # Mutfak tezgahi: sol duvar boyunca
    cd, ch = a.counter_depth, a.counter_height
    run = D * 0.75
    box("Dolap_Alt", (cd, run, ch - 0.04), (0, D - run, 0), m_cab)
    box("Tezgah", (cd + 0.02, run, 0.04), (0, D - run, ch - 0.04), m_counter)
    box("Dolap_Ust", (0.35, run * 0.8, 0.70), (0, D - run, 1.50), m_cab)

    # Isik: pencereden gelen gunes + tavanda yumusak dolgu
    bpy.ops.object.light_add(type="SUN", location=(W / 2, D + 4, sill + wh))
    sun = bpy.context.active_object
    sun.data.energy = 4.0
    sun.data.angle = math.radians(2.0)
    sun.rotation_euler = (math.radians(62), 0, math.radians(188))

    bpy.ops.object.light_add(type="AREA", location=(W / 2, D / 2, H - 0.15))
    fill = bpy.context.active_object
    fill.data.energy = 60.0
    fill.data.size = min(W, D) * 0.7

    # Dunya: pencereden disari bakinca gri degil gokyuzu gorunsun
    world = bpy.data.worlds.new("Dunya")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs[0].default_value = (0.55, 0.68, 0.85, 1)
    world.node_tree.nodes["Background"].inputs[1].default_value = 1.2
    scene.world = world

    # Kamera: on kosede, ic mekan icin genis ama distorsiyonsuz (24mm).
    # Aciyi elle Euler ile vermek olcu degisince kamerayi duvara cevirir;
    # bunun yerine odanin icindeki bir hedefe TRACK_TO ile kilitliyoruz.
    target = bpy.data.objects.new("Kamera_Hedefi", None)
    scene.collection.objects.link(target)
    target.location = (W * 0.35, D * 0.62, 1.25)

    bpy.ops.object.camera_add(location=(W - 0.45, 0.45, 1.60))
    cam = bpy.context.active_object
    cam.data.lens = 24
    con = cam.constraints.new(type="TRACK_TO")
    con.target = target
    con.track_axis = "TRACK_NEGATIVE_Z"
    con.up_axis = "UP_Y"
    scene.camera = cam

    # Constraint'i cozup gercek acilari yazdir -- render oncesi dogrulanabilsin.
    bpy.context.view_layer.update()
    mw = cam.matrix_world
    print(f"[room] kamera {tuple(round(v, 2) for v in mw.translation)} -> "
          f"hedef {tuple(round(v, 2) for v in target.location)}")

    # Render: Cycles CPU, denoise acik
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = a.samples
    scene.cycles.use_denoising = not a.no_denoise
    scene.render.resolution_x = a.res
    scene.render.resolution_y = int(a.res * 9 / 16)
    scene.render.filepath = a.out
    scene.render.image_settings.file_format = "PNG"

    print(f"[room] {W}x{D}x{H} m | tezgah {a.counter_depth}x{a.counter_height} m "
          f"| pencere {ws}x{wh} @ {sill} m | {a.samples} sample")

    # Olcu tutanagi: render'a bakip "yaklasik dogru" demek yerine, sahnedeki
    # her parcanin gercek boyutu okunup yazdirilir. Musteriye giden gorselle
    # ustanin aldigi olcunun ayni sayi oldugunu burada kanitliyoruz.
    print("[olcu] parca                 genislik x derinlik x yukseklik (m)")
    for ob in sorted(scene.objects, key=lambda o: o.name):
        if ob.type != "MESH":
            continue
        dx, dy, dz = ob.dimensions
        print(f"[olcu] {ob.name:<22} {dx:6.3f} x {dy:6.3f} x {dz:6.3f}")

    ic_hacim = W * D * H
    print(f"[olcu] ic net hacim: {ic_hacim:.2f} m3 | taban alani: {W * D:.2f} m2")

    if a.save_blend:
        bpy.ops.wm.save_as_mainfile(filepath=a.save_blend)
        print(f"[room] blend kaydedildi: {a.save_blend}")

    try:
        bpy.ops.render.render(write_still=True)
    except RuntimeError as exc:
        # Ubuntu deposundaki Blender OpenImageDenoise'siz derlenmis; resmi
        # blender.org derlemesinde bu dal hic calismaz. Denoise'u kapatip
        # sample sayisini artirarak ayni kaliteyi CPU'da yakalariz.
        if "Denois" not in str(exc):
            raise
        print(f"[room] denoise yok ({exc}); kapatilip {a.samples * 4} sample ile tekrar")
        scene.cycles.use_denoising = False
        scene.cycles.samples = a.samples * 4
        bpy.ops.render.render(write_still=True)

    print(f"[room] yazildi: {a.out}")


main()
