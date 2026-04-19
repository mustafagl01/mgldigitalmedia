import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const WEBHOOK_URL =
  'https://nt3ys1ml.rpcd.host/webhook/b7256006-aad8-48e9-a2c6-88f10664f5a8';
const CALENDAR_URL = 'https://calendar.app.google/FZnTjsWGfCy33WF36';
const STORAGE_KEY = 'mgl-chat-session';

type Role = 'user' | 'assistant';
interface Message {
  role: Role;
  text: string;
  ts: number;
}

interface Session {
  id: string;
  messages: Message[];
}

function newSessionId() {
  return `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function loadSession(): Session {
  if (typeof window === 'undefined') return { id: newSessionId(), messages: [] };
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Session;
      if (parsed?.id && Array.isArray(parsed.messages)) return parsed;
    }
  } catch {}
  return { id: newSessionId(), messages: [] };
}

function saveSession(s: Session) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
}

function extractReply(data: unknown): string | null {
  if (data == null) return null;
  if (typeof data === 'string') return data.trim() || null;
  if (typeof data !== 'object') return null;
  const obj = data as Record<string, unknown>;
  const candidates = [
    obj.output,
    obj.reply,
    obj.message,
    obj.text,
    obj.answer,
    obj.response,
  ];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c.trim();
  }
  if (Array.isArray(data) && data.length > 0) {
    return extractReply(data[0]);
  }
  return null;
}

export function ChatBot() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session>(() => loadSession());
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isTR = language === 'tr';

  const greeting: Message = {
    role: 'assistant',
    text: isTR
      ? 'Merhaba — ben Era, MGL Digital\'de ilk temas yöneticisi. Kısa tutalım: hangi sektördesiniz, şu an hangi kanalda randevu ya da talep kaçırıyorsunuz?'
      : "Hi — I'm Era, first-contact executive at MGL Digital. Quickly: what sector are you in, and which channel is dropping appointments or leads right now?",
    ts: Date.now(),
  };

  const messages = session.messages.length > 0 ? session.messages : [greeting];

  useEffect(() => {
    saveSession(session);
  }, [session]);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, session.messages.length, sending]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      inputRef.current?.focus();
    }
  }, [open]);

  const pushMessage = (m: Message) => {
    setSession((prev) => {
      const base = prev.messages.length === 0 ? [greeting] : prev.messages;
      return { ...prev, messages: [...base, m] };
    });
  };

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput('');
    const userMsg: Message = { role: 'user', text, ts: Date.now() };
    pushMessage(userMsg);
    setSending(true);
    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.text,
      }));
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.id,
          language,
          message: text,
          history,
          page: typeof window !== 'undefined' ? window.location.pathname : '/',
        }),
      });
      let replyText: string | null = null;
      const raw = await res.text();
      try {
        replyText = extractReply(JSON.parse(raw));
      } catch {
        replyText = raw.trim() || null;
      }
      if (!replyText) {
        replyText = isTR
          ? 'Şu an bağlanamadım. Sizi yormayalım — Mustafa Bey\'in kısa bir görüşmeye almasını ister misiniz? Takvim: ' +
            CALENDAR_URL
          : "I couldn't reach the server. Want a short call with Mustafa instead? Calendar: " +
            CALENDAR_URL;
      }
      pushMessage({ role: 'assistant', text: replyText, ts: Date.now() });
      if (!open) setUnread(true);
    } catch {
      pushMessage({
        role: 'assistant',
        text: isTR
          ? 'Bağlantı kesildi. 10 dakikalık bir görüşme ile devam edelim mi? ' + CALENDAR_URL
          : 'Connection lost. Shall we continue on a 10-min call? ' + CALENDAR_URL,
        ts: Date.now(),
      });
    } finally {
      setSending(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const resetSession = () => {
    const fresh: Session = { id: newSessionId(), messages: [] };
    setSession(fresh);
    saveSession(fresh);
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={isTR ? 'Era ile konuş' : 'Chat with Era'}
        style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          zIndex: 90,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--ink)',
          color: 'var(--paper)',
          border: '1px solid var(--ink)',
          boxShadow:
            '0 14px 40px -14px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 200ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {unread && !open && (
          <span
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--ember)',
              border: '2px solid var(--ink)',
            }}
          />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Era"
          style={{
            position: 'fixed',
            right: 20,
            bottom: 88,
            zIndex: 90,
            width: 'min(380px, calc(100vw - 40px))',
            height: 'min(560px, calc(100vh - 140px))',
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            boxShadow:
              '0 30px 80px -24px rgba(0,0,0,0.3), 0 8px 24px -8px rgba(0,0,0,0.12)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--paper-2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-serif, serif)',
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}
              >
                E
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--ink)',
                  }}
                >
                  Era
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--fg-muted)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {isTR ? 'MGL Digital · İlk Temas' : 'MGL Digital · First Contact'}
                </div>
              </div>
            </div>
            <button
              onClick={resetSession}
              title={isTR ? 'Sohbeti sıfırla' : 'Reset conversation'}
              style={{
                fontSize: 11,
                color: 'var(--fg-muted)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {isTR ? 'Sıfırla' : 'Reset'}
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '10px 13px',
                  borderRadius: 12,
                  fontSize: 14,
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                  background:
                    m.role === 'user' ? 'var(--ink)' : 'var(--paper-2)',
                  color: m.role === 'user' ? 'var(--paper)' : 'var(--ink)',
                  border:
                    m.role === 'user'
                      ? '1px solid var(--ink)'
                      : '1px solid var(--border)',
                }}
              >
                {m.text}
              </div>
            ))}
            {sending && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '10px 13px',
                  borderRadius: 12,
                  background: 'var(--paper-2)',
                  border: '1px solid var(--border)',
                  color: 'var(--fg-muted)',
                  fontSize: 13,
                  display: 'flex',
                  gap: 4,
                }}
              >
                <Dot delay={0} />
                <Dot delay={150} />
                <Dot delay={300} />
              </div>
            )}
          </div>

          {/* Calendar nudge */}
          <div
            style={{
              padding: '8px 16px',
              borderTop: '1px solid var(--border)',
              background: 'var(--paper-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: 'var(--fg-muted)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {isTR ? 'Hazırsan kısa görüşme' : 'Ready? Short call'}
            </span>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                color: 'var(--ember)',
                textDecoration: 'none',
                fontWeight: 500,
                borderBottom: '1px solid var(--ember)',
                paddingBottom: 1,
              }}
            >
              {isTR ? 'Takvim aç →' : 'Open calendar →'}
            </a>
          </div>

          {/* Input */}
          <div
            style={{
              padding: '12px 12px 12px 14px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={isTR ? 'Kısa yazın…' : 'Keep it short…'}
              disabled={sending}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: 14,
                color: 'var(--ink)',
                fontFamily: 'inherit',
                padding: '6px 4px',
              }}
            />
            <button
              onClick={send}
              disabled={sending || !input.trim()}
              aria-label={isTR ? 'Gönder' : 'Send'}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background:
                  sending || !input.trim() ? 'var(--border)' : 'var(--ink)',
                color: 'var(--paper)',
                border: 'none',
                cursor:
                  sending || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 150ms ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes mgl-bot-dot { 0%, 60%, 100% { opacity: 0.25; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-2px); } }
      `}</style>
    </>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--fg-muted)',
        display: 'inline-block',
        animation: `mgl-bot-dot 1.2s ${delay}ms infinite`,
      }}
    />
  );
}
