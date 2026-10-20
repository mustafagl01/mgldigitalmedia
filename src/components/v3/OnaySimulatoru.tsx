import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SIM } from '../../content/v3';

/* İmza etkileşim (konsey 2026-10-19): ziyaretçi bir işi adım adım ilerletir, son adımda
   "Onayla"ya kendisi basar; kart kobalttan yeşile döner. Canlı panel DEĞİL — açıkça örnek. */

export function OnaySimulatoru({ start = 'randevu' }: { start?: string }) {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'tr';
  const isEN = lang === 'en';
  const [id, setId] = useState(start);
  const [step, setStep] = useState(0);
  const [approved, setApproved] = useState(false);

  useEffect(() => { setId(start); }, [start]);
  useEffect(() => { setStep(0); setApproved(false); }, [id]);

  const sc = SIM.find((s) => s.id === id) ?? SIM[0];
  const last = sc.steps.length - 1;
  const cur = sc.steps[step];

  const state = (i: number) => {
    if (approved) return i === last ? 'is-ok' : 'is-done';
    if (i < step) return 'is-done';
    if (i === step) return sc.steps[i].wait ? 'is-now is-wait' : 'is-now';
    return '';
  };

  return (
    <div className="v3-sim" aria-label={isEN ? 'Approval simulator (demonstration)' : 'Onay simülatörü (örnek)'}>
      <div className="v3-sim__top" role="tablist">
        {SIM.map((s) => (
          <button key={s.id} role="tab" aria-selected={s.id === id} className={`v3-sim__tab ${s.id === id ? 'is-on' : ''}`} onClick={() => setId(s.id)}>
            {s.tab[lang]}
          </button>
        ))}
      </div>

      <div className="v3-sim__body">
        <ol className="v3-sim__rail">
          {sc.steps.map((s, i) => (
            <li key={s.label.en}>
              <button className={`v3-sim__step ${state(i)}`} onClick={() => !approved && i <= step && setStep(i)} aria-current={i === step ? 'step' : undefined}>
                <span className="dot">{approved && i === last ? '✓' : i + 1}</span>
                <span>{s.label[lang]}</span>
              </button>
            </li>
          ))}
          <li>
            <div className={`v3-sim__step ${approved ? 'is-ok is-now' : ''}`}>
              <span className="dot">{approved ? '✓' : sc.steps.length + 1}</span>
              <span>{isEN ? 'Sent' : 'Gönderildi'}</span>
            </div>
          </li>
        </ol>

        <div className="v3-sim__panel" aria-live="polite">
          <div className="v3-sim__label">{isEN ? 'INCOMING' : 'GELEN'}</div>
          <div className="v3-sim__msg">{sc.incoming[lang]}</div>

          {!approved ? (
            <>
              <div className="v3-sim__label">{`${step + 1} / ${sc.steps.length + 1} · ${cur.label[lang].toLocaleUpperCase(isEN ? 'en-GB' : 'tr-TR')}`}</div>
              <div className="v3-sim__rows">
                {cur.rows[lang].map((r) => (
                  <div key={r} className={`v3-sim__row ${cur.wait ? 'wait' : ''}`}>{r}</div>
                ))}
              </div>
            </>
          ) : (
            <div className="v3-sim__done">{sc.done[lang]}</div>
          )}

          <div className="v3-sim__meta">
            <div><b>{isEN ? 'Automatic' : 'Otomatik'}</b>{sc.meta.auto[lang]}</div>
            <div><b>{isEN ? 'Data used' : 'Kullanılan veri'}</b>{sc.meta.data[lang]}</div>
            <div><b>{isEN ? 'Needs your approval' : 'Onayınızı bekler'}</b>{sc.meta.approve[lang]}</div>
            <div><b>{isEN ? 'Plan' : 'Paket'}</b>{sc.meta.plan[lang]}</div>
          </div>

          <div className="v3-sim__actions">
            {approved ? (
              <>
                <button className="v3-approve is-ok" disabled>{isEN ? 'Approved ✓' : 'Onaylandı ✓'}</button>
                <button className="v3-sim__ghost" onClick={() => { setStep(0); setApproved(false); }}>{isEN ? 'Start again' : 'Baştan izle'}</button>
              </>
            ) : cur.wait ? (
              <>
                <button className="v3-approve" onClick={() => setApproved(true)}>{isEN ? 'Approve' : 'Onayla'}</button>
                <button className="v3-sim__ghost" onClick={() => setStep(step - 1)}>{isEN ? 'Back' : 'Geri'}</button>
              </>
            ) : (
              <>
                <button className="v3-approve" style={{ background: 'var(--ink)' }} onClick={() => setStep(Math.min(step + 1, last))}>{isEN ? 'Next step →' : 'Sonraki adım →'}</button>
                {step > 0 && <button className="v3-sim__ghost" onClick={() => setStep(step - 1)}>{isEN ? 'Back' : 'Geri'}</button>}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="v3-sim__note">
        {isEN ? 'Demonstration with sample data, not a live system. In real setups nothing is sent without your approval.' : 'Örnek veriyle gösterimdir, canlı sistem değildir. Gerçek kurulumda onayınız olmadan hiçbir şey gönderilmez.'}
      </div>
    </div>
  );
}
