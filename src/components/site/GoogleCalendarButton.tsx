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
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load CSS once
    if (!document.querySelector(`link[href="${CSS_URL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CSS_URL;
      document.head.appendChild(link);
    }

    const init = () => {
      const cal = (window as Record<string, unknown>).calendar as
        | { schedulingButton: { load: (opts: unknown) => void } }
        | undefined;
      if (targetRef.current && cal?.schedulingButton) {
        // Clear previous button before loading new one
        targetRef.current.innerHTML = '';
        cal.schedulingButton.load({
          url: CALENDAR_URL,
          color,
          label,
          target: targetRef.current,
        });
      }
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
      // Script already in DOM — may or may not be loaded yet
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
      if (targetRef.current) {
        targetRef.current.innerHTML = '';
      }
    };
  }, [label, color]);

  return <div ref={targetRef} />;
}
