import { ArrowRight, Calendar, Check, MessageCircle } from 'lucide-react';
import content from '../content/accounting-automation.json';
import {
  BASE_SCHEMAS,
  Seo,
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  serviceSchema,
  webPageSchema,
} from '../components/seo/Seo';

const PATH = '/accounting-automation-uk';
const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';
const WHATSAPP_URL = 'https://wa.me/905318299701?text=Hi%2C%20I%27d%20like%20to%20see%20the%20accounting%20automation%20demo.';

const jsonLd = [
  ...BASE_SCHEMAS,
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Accounting automation', path: PATH },
  ]),
  webPageSchema({
    path: PATH,
    title: content.title,
    description: content.description,
    inLanguage: 'en-GB',
    primaryTopic: 'AI automation for accounting and tax firms',
  }),
  serviceSchema({
    name: 'AI automation for accounting and tax firms',
    description: content.answer,
    path: PATH,
    category: 'Accounting practice workflow automation',
  }),
  howToSchema({
    name: 'How an accounting deadline and document reminder workflow operates',
    description: content.fit,
    path: PATH,
    steps: content.workflow.map((step, index) => ({
      name: `Step ${index + 1}`,
      text: step,
    })),
  }),
  faqSchema(
    content.faqs.map((item) => ({ question: item.question, answer: item.answer })),
  ),
];

const sectionStyle = {
  padding: 'clamp(64px, 5vw + 20px, 112px) 0',
  borderBottom: '1px solid var(--border)',
} as const;

export default function AccountingAutomation() {
  return (
    <>
      <Seo
        title={content.title}
        description={content.description}
        path={PATH}
        locale="en_GB"
        keywords={[
          'AI automation for accounting firms UK',
          'accounting deadline reminder system',
          'Companies House deadline automation',
          'accountant document collection automation',
          'accounting practice receivables automation',
          'n8n automation for accountants',
        ]}
        jsonLd={jsonLd}
      />

      <section style={{ ...sectionStyle, background: 'var(--paper)' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <span className="eyebrow">{content.eyebrow}</span>
          <h1
            style={{
              marginTop: 16,
              maxWidth: 900,
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 1.4rem + 3vw, 4.4rem)',
              lineHeight: 1.02,
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            {content.heading}
          </h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 820, color: 'var(--fg-1)', lineHeight: 1.7 }}>
            {content.answer}
          </p>
          <p style={{ marginTop: 16, maxWidth: 780, color: 'var(--fg-2)', lineHeight: 1.65 }}>
            {content.fit}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
            <a className="btn btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageCircle size={15} /> Request a sample-data demo
            </a>
            <a className="btn btn-ghost" href={CALENDAR_URL} target="_blank" rel="noreferrer">
              <Calendar size={15} /> Book a 15-minute review
            </a>
          </div>
          <p style={{ marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', overflowWrap: 'anywhere' }}>
            Reviewed {content.updated} by Mustafa Gul, founder of MGL Digital Media Ltd.
          </p>
        </div>
      </section>

      <section style={{ ...sectionStyle, background: 'var(--paper-2)' }}>
        <div className="container" style={{ maxWidth: 1120 }}>
          <span className="eyebrow">WHAT THE SYSTEM CAN HANDLE</span>
          <h2 style={{ marginTop: 16, maxWidth: 760, fontFamily: 'var(--font-serif)', fontSize: 'var(--t-h2)', color: 'var(--ink)' }}>
            One controlled workflow from due date to staff handoff.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 40 }}>
            {content.capabilities.map((item, index) => (
              <article key={item.title} style={{ padding: 24, border: '1px solid var(--border)', borderRadius: 'var(--r-md)', background: 'var(--paper)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ember)' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 style={{ marginTop: 14, fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--ink)' }}>{item.title}</h3>
                <p style={{ marginTop: 10, color: 'var(--fg-2)', lineHeight: 1.65 }}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="on-coal" style={{ ...sectionStyle, background: 'var(--coal)', color: 'var(--bone)' }}>
        <div className="container" style={{ maxWidth: 1040 }}>
          <span className="eyebrow" style={{ color: 'var(--ember)' }}>EXAMPLE WORKFLOW</span>
          <h2 style={{ marginTop: 16, maxWidth: 760, fontFamily: 'var(--font-serif)', fontSize: 'var(--t-h2)', color: 'var(--bone)' }}>
            A deadline reminder flow, step by step.
          </h2>
          <ol style={{ listStyle: 'none', padding: 0, margin: '40px 0 0', display: 'grid', gap: 12 }}>
            {content.workflow.map((step, index) => (
              <li key={step} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 16, alignItems: 'start', padding: 20, border: '1px solid var(--coal-3)', borderRadius: 'var(--r-md)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ember)' }}>{index + 1}</span>
                <span style={{ color: 'var(--bone-2)', lineHeight: 1.6 }}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section style={{ ...sectionStyle, background: 'var(--paper)' }}>
        <div className="container" style={{ maxWidth: 1120, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>
          <div>
            <span className="eyebrow">CONNECTIONS</span>
            <h2 style={{ marginTop: 16, fontFamily: 'var(--font-serif)', fontSize: 'var(--t-h2)', color: 'var(--ink)' }}>Works with the tools already in use.</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'grid', gap: 12 }}>
              {content.integrations.map((item) => (
                <li key={item} style={{ display: 'flex', gap: 10, color: 'var(--fg-1)' }}><Check size={17} color="var(--ember)" /> {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">CONTROL & SAFEGUARDS</span>
            <h2 style={{ marginTop: 16, fontFamily: 'var(--font-serif)', fontSize: 'var(--t-h2)', color: 'var(--ink)' }}>Automation with clear boundaries.</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'grid', gap: 12 }}>
              {content.safeguards.map((item) => (
                <li key={item} style={{ display: 'flex', gap: 10, color: 'var(--fg-1)', lineHeight: 1.55 }}><Check size={17} color="var(--ember)" /> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ ...sectionStyle, background: 'var(--paper-2)' }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <span className="eyebrow">COMMON QUESTIONS</span>
          <h2 style={{ marginTop: 16, fontFamily: 'var(--font-serif)', fontSize: 'var(--t-h2)', color: 'var(--ink)' }}>Accounting automation FAQ</h2>
          <div style={{ display: 'grid', gap: 16, marginTop: 36 }}>
            {content.faqs.map((item) => (
              <article key={item.question} style={{ padding: 24, background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 21, color: 'var(--ink)' }}>{item.question}</h3>
                <p style={{ marginTop: 10, color: 'var(--fg-2)', lineHeight: 1.65 }}>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...sectionStyle, background: 'var(--paper)' }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <span className="eyebrow">PRIMARY REFERENCES</span>
          <h2 style={{ marginTop: 16, fontFamily: 'var(--font-serif)', fontSize: 'var(--t-h2)', color: 'var(--ink)' }}>Technical sources and related pages</h2>
          <div style={{ display: 'grid', gap: 12, marginTop: 28 }}>
            {content.sources.map((source) => (
              <a key={source.url} href={source.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: 18, border: '1px solid var(--border)', borderRadius: 'var(--r-md)', color: 'var(--ink)' }}>
                {source.label}<ArrowRight size={16} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
