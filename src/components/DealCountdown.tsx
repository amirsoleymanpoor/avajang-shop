"use client";

import { useSyncExternalStore } from "react";
import { faDigits } from "@/lib/format";

type Clock = { h: number; m: number; s: number };

const ZERO: Clock = { h: 0, m: 0, s: 0 };

function compute(): Clock {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  let diff = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
  const h = Math.floor(diff / 3600);
  diff -= h * 3600;
  const m = Math.floor(diff / 60);
  const s = diff - m * 60;
  return { h, m, s };
}

let snapshot: Clock = ZERO;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (timer == null) {
    snapshot = compute();
    timer = setInterval(() => {
      snapshot = compute();
      for (const l of listeners) l();
    }, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer != null) {
      clearInterval(timer);
      timer = null;
    }
  };
}

function getSnapshot(): Clock {
  return snapshot;
}

function getServerSnapshot(): Clock {
  return ZERO;
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function DealCountdown() {
  const t = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const cells = [
    { v: t.h, l: "ساعت" },
    { v: t.m, l: "دقیقه" },
    { v: t.s, l: "ثانیه" },
  ];

  return (
    <div className="flex items-center gap-1.5" dir="ltr">
      {cells.map((c, i) => (
        <div key={c.l} className="flex items-center gap-1.5">
          <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-brand-600 px-1.5 text-sm font-bold tabular-nums text-white ring-1 ring-brand-300">
            {faDigits(pad(c.v))}
          </span>
          {i < cells.length - 1 ? (
            <span className="text-brand-300">:</span>
          ) : null}
        </div>
      ))}
      <span className="mr-1 pr-1 text-xs font-bold text-brand-600">{cells[0].l}</span>
    </div>
  );
}