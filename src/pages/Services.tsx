import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Globe2,
  LineChart,
  MailCheck,
  MessageCircle,
  PhoneCall,
  Rocket,
  Search,
  Target,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Seo, BASE_SCHEMAS, breadcrumbSchema, serviceSchema } from '../components/seo/Seo';
import type { PackageTierKey } from '../config/pricing';
import { formatPrice } from '../utils/formatPrice';

type CategoryKey = 'assistants' | 'systems' | 'web' | 'growth';

type Service = {
  id: string;
  category: CategoryKey;
  icon: LucideIcon;
  nameTR: string;
  nameEN: string;
  descriptionTR: string;
  descriptionEN: string;
  featuresTR: string[];
  featuresEN: string[];
  packageKey?: PackageTierKey;
  detailsPath?: string;
  packageHash?: string;
  noteTR?: string;
  noteEN?: string;
  featured?: boolean;
};

const WHATSAPP_NUMBER = '447482670606';

const categories: Record<CategoryKey, { tr: string; en: string }> = {
  assistants: { tr: 'AI Asistanlar', en: 'AI Assistants' },
  systems: { tr: 'Otomasyon Sistemleri', en: 'Automation Systems' },
  web: { tr: 'Web & Bulunabilirlik', en: 'Web & Discoverability' },
  growth: { tr: 'Büyüme', en: 'Growth' },
};

const services: Service[] = [
  {
    id: 'whatsapp-ai', category: 'assistants', icon: MessageCircle, featured: true,
    nameTR: 'WhatsApp AI Asistanı', nameEN: 'WhatsApp AI Assistant', packageKey: 'whatsapp', detailsPath: '/whatsapp-ai-asistan',
    descriptionTR: 'Gelen mesajları işletme bilgilerinizle yanıtlar, uygun talepleri toplar ve ekibinize iletir.',
    descriptionEN: 'Answers incoming messages using your business information, captures suitable enquiries and hands them to your team.',
    featuresTR: ['Kurulum ücreti yok', 'Türkçe ve İngilizce standart', 'Takvim/CRM bağlantısı kapsam dahilinde', 'Yalnızca AI yanıtları kullanımdan düşer'],
    featuresEN: ['No setup fee', 'Turkish and English standard', 'Calendar/CRM connection when scoped', 'Only AI replies count as usage'],
  },
  {
    id: 'voice-ai', category: 'assistants', icon: PhoneCall,
    nameTR: 'Sesli AI Asistanı', nameEN: 'Voice AI Assistant', packageKey: 'voice', detailsPath: '/sesli-ai',
    descriptionTR: 'Çağrıları doğal sesle karşılar, sık soruları yanıtlar ve görüşme özetini ekibinize iletir.',
    descriptionEN: 'Answers calls naturally, handles common questions and sends a call summary to your team.',
    featuresTR: ['Kurulum ücreti yok', 'Bağlanan dakika kadar kullanım', 'Görüşme özeti ve tam metin', 'Gerektiğinde insana yönlendirme'],
    featuresEN: ['No setup fee', 'Usage billed by connected minute', 'Call summary and transcript', 'Human handoff when required'],
  },
  {
    id: 'n8n', category: 'systems', icon: Workflow,
    nameTR: 'n8n Otomasyon Sistemi', nameEN: 'n8n Automation System', packageKey: 'automation', detailsPath: '/n8n-otomasyon',
    descriptionTR: 'Evrak, rapor, takip ve veri aktarımı gibi tekrarlayan işleri izlenebilir bir sisteme bağlar.',
    descriptionEN: 'Connects repetitive document, reporting, follow-up and data-transfer tasks into one monitored system.',
    featuresTR: ['Kapsam teklifte yazılı belirlenir', 'Mevcut araçlarla entegrasyon', 'Hata uyarıları ve izleme', 'Aylık bakım dahil'],
    featuresEN: ['Scope defined in writing', 'Integration with existing tools', 'Failure alerts and monitoring', 'Monthly maintenance included'],
  },
  {
    id: 'lead-email', category: 'systems', icon: MailCheck,
    nameTR: 'Müşteri Bulma + E-posta Takibi', nameEN: 'Lead Research + Email Follow-up', packageKey: 'leadmail', detailsPath: '/ai-musteri-bulma-mail-takip',
    descriptionTR: 'Uygun şirketleri araştırır, doğrulanmış iletişim verisini düzenler ve onaylı takip akışını çalıştırır.',
    descriptionEN: 'Researches suitable companies, organises verified contact data and runs an approved follow-up sequence.',
    featuresTR: ['İdeal müşteri profili', 'Veri doğrulama ve tekilleştirme', 'Kişiselleştirilmiş e-posta taslağı', 'Alan adı ve veri kredileri hariç'],
    featuresEN: ['Ideal customer profile', 'Verification and deduplication', 'Personalised email drafts', 'Domain and data credits excluded'],
  },
  {
    id: 'landing-page', category: 'web', icon: Rocket,
    nameTR: 'Tek Sayfa Web Sitesi', nameEN: 'One-page Website', packageKey: 'web-landing', packageHash: 'web',
    descriptionTR: 'Tek bir ürün veya kampanya için hızlı, mobil öncelikli ve dönüşüm odaklı sayfa.',
    descriptionEN: 'A fast, mobile-first conversion page for one product or campaign.',
    featuresTR: ['Metin ve görsel yerleşimi', 'Form ve ölçüm kurulumu', 'Sitemap ve temel şema', 'İki revizyon turu'],
    featuresEN: ['Copy and visual layout', 'Form and measurement setup', 'Sitemap and essential schema', 'Two revision rounds'],
  },
  {
    id: 'business-website', category: 'web', icon: Globe2,
    nameTR: 'Kurumsal Web Sitesi', nameEN: 'Business Website', packageKey: 'web-site', packageHash: 'web',
    descriptionTR: 'Hizmetlerinizi anlaşılır anlatan, hızlı ve arama motorlarının okuyabildiği çok sayfalı site.',
    descriptionEN: 'A fast multi-page website that explains your services clearly and can be read by search engines.',
    featuresTR: ['5–7 temel sayfa', 'Mobil ve erişilebilir tasarım', 'GA4 ve Search Console hazırlığı', 'Yerel SEO temeli'],
    featuresEN: ['5–7 core pages', 'Mobile and accessible design', 'GA4 and Search Console readiness', 'Local SEO foundations'],
  },
  {
    id: 'seo-geo', category: 'web', icon: Search,
    nameTR: 'SEO & AI Arama Görünürlüğü', nameEN: 'SEO & AI Search Visibility', packageHash: 'ads',
    descriptionTR: 'Teknik hataları, yerel arama görünürlüğünü ve AI sistemlerinin okuyacağı işletme bilgisini düzenler.',
    descriptionEN: 'Improves technical search health, local visibility and the business information AI search systems can understand.',
    featuresTR: ['Teknik ve içerik denetimi', 'Search Console ve Bing kurulumu', 'Schema, sitemap ve iç bağlantılar', 'Öncelikli içerik planı'],
    featuresEN: ['Technical and content audit', 'Search Console and Bing setup', 'Schema, sitemap and internal links', 'Prioritised content plan'],
    noteTR: 'Web projelerinde teknik temel dahildir; sürekli çalışma ücretsiz analiz sonrası kapsamlandırılır.',
    noteEN: 'Technical foundations are included in web projects; ongoing work is scoped after the free audit.',
  },
  {
    id: 'meta-ads', category: 'growth', icon: Target,
    nameTR: 'Meta Reklam Yönetimi', nameEN: 'Meta Ads Management', packageKey: 'ads-meta', packageHash: 'ads',
    descriptionTR: 'Sabit yönetim ücretiyle kampanya, kreatif test ve dönüşüm ölçümünü birlikte yürütür.',
    descriptionEN: 'Runs campaigns, creative tests and conversion measurement for a fixed management fee.',
    featuresTR: ['Reklam bütçesinden pay yok', 'Pixel/CAPI kurulumu', 'Kreatif test planı', 'Düzenli performans raporu'],
    featuresEN: ['No share of ad spend', 'Pixel/CAPI setup', 'Creative testing plan', 'Regular performance reporting'],
  },
  {
    id: 'google-ads', category: 'growth', icon: LineChart,
    nameTR: 'Google Reklam Yönetimi', nameEN: 'Google Ads Management', packageKey: 'ads-google', packageHash: 'ads',
    descriptionTR: 'Arama niyeti yüksek kullanıcıları ölçülebilir kampanyalarla doğru sayfaya getirir.',
    descriptionEN: 'Brings high-intent searchers to the right page through measurable campaigns.',
    featuresTR: ['Reklam bütçesinden pay yok', 'Arama ve PMax kapsamı', 'Dönüşüm ölçümü', 'Negatif kelime ve sorgu takibi'],
    featuresEN: ['No share of ad spend', 'Search and PMax scope', 'Conversion measurement', 'Negative keyword and query review'],
  },
];

export default function Services() {
  const { language } = useLanguage();
  const { pricing, region } = useLocation();
  const isTR = language === 'tr';
  const [category, setCategory] = useState<CategoryKey | 'all'>('all');
  const visible = useMemo(() => category === 'all' ? services : services.filter((item) => item.category === category), [category]);
  const breadcrumb = breadcrumbSchema([{ name: isTR ? 'Ana Sayfa' : 'Home', path: '/' }, { name: isTR ? 'Hizmetler' : 'Services', path: '/services' }]);

  return (
    <>
      <Seo
        title={isTR ? 'AI, Otomasyon, Web ve Reklam Hizmetleri | MGL' : 'AI, Automation, Web and Advertising Services | MGL'}
        description={isTR ? 'WhatsApp ve sesli AI asistanları, n8n otomasyon, web, SEO ve sabit ücretli reklam yönetimi. Fiyat ve kapsam açık.' : 'WhatsApp and voice AI assistants, n8n automation, web, SEO and fixed-fee ad management with clear scope and pricing.'}
        path="/services"
        locale={isTR ? 'tr_TR' : 'en_GB'}
        jsonLd={[...BASE_SCHEMAS, breadcrumb, ...services.map((service) => serviceSchema({ name: isTR ? service.nameTR : service.nameEN, description: isTR ? service.descriptionTR : service.descriptionEN, path: service.detailsPath ?? `/services#${service.id}`, category: categories[service.category][isTR ? 'tr' : 'en'] }))]}
      />

      <section className="section services-hero">
        <div className="container" style={{ maxWidth: 900 }}>
          <span className="eyebrow">{isTR ? `${services.length} NET HİZMET · TEK EKİP` : `${services.length} CLEAR SERVICES · ONE TEAM`}</span>
          <h1 className="h-display" style={{ marginTop: 20 }}>
            {isTR ? 'İhtiyacınız olan sistemi seçin. Gerisini eklemeyin.' : 'Choose the system you need. Leave out the rest.'}
          </h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 720 }}>
            {isTR ? 'Her hizmetin kapsamı, başlangıç bedeli ve devam eden maliyeti ayrı gösterilir. Birden fazla hizmet gerekiyorsa bunu görüşmede tek akış hâline getiririz.' : 'Each service shows its scope, starting fee and ongoing cost separately. When several services are needed, we combine them into one sensible workflow.'}
          </p>
        </div>
      </section>

      <nav className="service-filter" aria-label={isTR ? 'Hizmet kategorileri' : 'Service categories'}>
        <div className="container service-filter__inner">
          <button type="button" className={category === 'all' ? 'is-active' : ''} onClick={() => setCategory('all')}>{isTR ? 'Tümü' : 'All'} <span>{services.length}</span></button>
          {(Object.keys(categories) as CategoryKey[]).map((key) => (
            <button key={key} type="button" className={category === key ? 'is-active' : ''} onClick={() => setCategory(key)}>
              {categories[key][isTR ? 'tr' : 'en']} <span>{services.filter((service) => service.category === key).length}</span>
            </button>
          ))}
        </div>
      </nav>

      <section className="section">
        <div className="container service-grid">
          {visible.map((service) => {
            const Icon = service.icon;
            const tier = service.packageKey ? pricing.packages[service.packageKey] : null;
            const href = service.detailsPath ?? `/packages${service.packageHash ? `#${service.packageHash}` : ''}`;
            return (
              <article id={service.id} className={service.featured ? 'service-card is-featured' : 'service-card'} key={service.id}>
                <div className="service-card__top">
                  <span className="service-card__icon"><Icon size={20} aria-hidden="true" /></span>
                  <span className="eyebrow">{categories[service.category][isTR ? 'tr' : 'en']}</span>
                </div>
                <h2>{isTR ? service.nameTR : service.nameEN}</h2>
                <p>{isTR ? service.descriptionTR : service.descriptionEN}</p>

                {tier ? (
                  <div className="service-card__price">
                    <div><small>{isTR ? 'Kurulum' : 'Setup'}</small><strong>{tier.setupFee === 0 ? (isTR ? 'Ücretsiz' : 'Free') : formatPrice(tier.setupFee, region)}</strong></div>
                    <div><small>{tier.priceUnit === 'year' ? (isTR ? 'Yıllık' : 'Yearly') : (isTR ? 'Aylık' : 'Monthly')}</small><strong>{formatPrice(tier.price, region)}</strong></div>
                    {tier.usageRate != null && <div><small>{isTR ? 'Kullanım' : 'Usage'}</small><strong>{formatPrice(tier.usageRate, region)} / {tier.usageUnit === 'minute' ? (isTR ? 'dk' : 'min') : (isTR ? 'AI yanıtı' : 'AI reply')}</strong></div>}
                  </div>
                ) : (
                  <div className="service-card__note">{isTR ? service.noteTR : service.noteEN}</div>
                )}

                <ul>{(isTR ? service.featuresTR : service.featuresEN).map((feature) => <li key={feature}><Check size={15} aria-hidden="true" /> <span>{feature}</span></li>)}</ul>
                <a className="service-card__link" href={href}>{service.detailsPath ? (isTR ? 'Ayrıntıları görün' : 'View details') : (isTR ? 'Fiyatları görün' : 'View pricing')} <ArrowUpRight size={16} aria-hidden="true" /></a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section on-coal">
        <div className="container closing-split">
          <div>
            <span className="eyebrow">{isTR ? 'NEREDEN BAŞLAYACAĞINIZI BİLMİYORSANIZ' : 'IF YOU ARE NOT SURE WHERE TO START'}</span>
            <h2 style={{ marginTop: 18 }}>{isTR ? 'Önce darboğazı bulalım.' : 'Find the bottleneck first.'}</h2>
          </div>
          <div>
            <p>{isTR ? '15 dakikalık ücretsiz görüşmede mevcut akışı dinler, en yararlı ilk adımı söyleriz. Gereksiz paket eklemeyiz.' : 'In a free 15-minute call we listen to the current process and identify the most useful first step. We do not add services you do not need.'}</p>
            <a className="btn btn-primary btn-lg" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(isTR ? 'Merhaba, işletmem için doğru ilk adımı konuşmak istiyorum.' : 'Hi, I would like to discuss the right first step for my business.')}`} target="_blank" rel="noreferrer">
              {isTR ? 'WhatsApp’tan başlayın' : 'Start on WhatsApp'} <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
