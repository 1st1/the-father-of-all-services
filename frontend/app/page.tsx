"use client";

import { useState } from "react";

export default function Home() {
  const [time, setTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchTime() {
    setLoading(true);
    try {
      const host = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = host ? `https://${host}` : "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/time`);
      const data = await res.json();
      setTime(data.formatted);
    } catch {
      setTime("Failed to fetch time");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-50">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-semibold tracking-tight">Server Time</h1>
        <button
          onClick={fetchTime}
          disabled={loading}
          className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50"
        >
          {loading ? "Fetching..." : "Get Server Time"}
        </button>
        {time && (
          <p className="rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-lg">
            {time}
          </p>
        )}
      </div>
    </div>
  );
}
