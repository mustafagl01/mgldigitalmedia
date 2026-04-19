import { useEffect, useRef } from 'react';

const CALENDAR_URL =
  'https://calendar.google.com/calendar/appointments/AcZssZ0OIMa_rZdTDFNj1mCltTUMhjHMJLi6HrNhJgg=?gv=true';
const CSS_URL =
  'https://calendar.google.com/calendar/scheduling-button-script.css';
const JS_URL =
  'https://calendar.google.com/calendar/scheduling-button-script.js';

interface Props {
  label?: string;
  color?: string;
}

export function GoogleCalendarButton({
  label = 'Randevu oluşturun',
  color = '#039BE5',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.querySelector(`link[href="${CSS_URL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CSS_URL;
      document.head.appendChild(link);
    }

    const init = () => {
      const container = containerRef.current;
      const cal = (window as Record<string, unknown>).calendar as
        | { schedulingButton: { load: (opts: unknown) => void } }
        | undefined;
      if (!container || !cal?.schedulingButton) return;

      // Clear everything the script previously injected (button is a sibling of target)
      container.innerHTML = '';

      // Fresh target — the scheduling button gets inserted as a sibling inside our container
      const target = document.createElement('div');
      container.appendChild(target);

      cal.schedulingButton.load({
        url: CALENDAR_URL,
        color,
        label,
        target,
      });
    };

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${JS_URL}"]`,
    );

    if (!script) {
      script = document.createElement('script');
      script.src = JS_URL;
      script.async = true;
      script.onload = init;
      document.head.appendChild(script);
    } else {
      const cal = (window as Record<string, unknown>).calendar as
        | { schedulingButton: { load: (opts: unknown) => void } }
        | undefined;
      if (cal?.schedulingButton) {
        init();
      } else {
        script.addEventListener('load', init);
      }
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [label, color]);

  return <div ref={containerRef} style={{ display: 'inline-flex' }} />;
}
