"use client";
import { useState, useRef } from "react";
import LiveUpdates from "../components/LiveUpdates";
import Dashboard from "../components/Dashboard";

export default function Page() {
  const [tracks, setTracks] = useState<unkown[]>([]);
  const fetchingRef = useRef(false);

  async function refresh() {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    try {
      const r = await fetch("/api/recent", { cache: "no-store" });
      if (r.ok) setTracks(await r.json());
    } finally {
      fetchingRef.current = false;
    }
  }

  return (
    <div>
      <h1>Garrett Meldrum</h1>
      <h3>This is a collection of my personal projects, hobbies, and life updates!</h3>
      <LiveUpdates onUpdate={refresh} />
      <Dashboard tracks={tracks} />
    </div>
  );
}
