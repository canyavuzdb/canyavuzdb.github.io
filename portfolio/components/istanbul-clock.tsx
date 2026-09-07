"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Istanbul",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export default function IstanbulClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    let timeout: number;
    const updateTime = () => {
      setTime(formatter.format(new Date()));
      timeout = window.setTimeout(updateTime, 60_000 - (Date.now() % 60_000));
    };

    updateTime();

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <span className="tabular-nums" title="Istanbul local time">
      {time ? <time dateTime={time}>{time}</time> : "--:--"}
    </span>
  );
}
