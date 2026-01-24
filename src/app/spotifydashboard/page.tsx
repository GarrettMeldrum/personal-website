'use client';

import React, { useState, useEffect } from 'react';
import { Music, TrendingUp, Clock, User, Disc } from 'lucide-react';
import Image from 'next/image';

interface AnalyticsData {
  stats: {
    total_plays: number;
    unique_tracks: number;
    unique_artists: number;
  };
  top_tracks: Array<{
    track_id: string;
    track_name: string;
    artist_name: string;
    album_name: string;
    album_cover_url?: string;
    play_count: number;
  }>;
  top_artists: Array<{
    artist_name: string;
    play_count: number;
  }>;
  recent_plays: Array<{
    id: number;
    track_name: string;
    artist_name: string;
    album_name: string;
    album_cover_url?: string;
    played_at: string;
  }>;
}

export default function SpotifyDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/spotify-analytics', { cache: "no-store" });
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Poll every 10 seconds for updates
    const interval = setInterval(fetchData, 10000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
          Spotify Dashboard
        </h1>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Music className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Total Plays</h3>
          </div>
          <p className="text-4xl font-bold text-green-400">{data.stats.total_plays}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Disc className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Unique Tracks</h3>
          </div>
          <p className="text-4xl font-bold text-blue-400">{data.stats.unique_tracks}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Unique Artists</h3>
          </div>
          <p className="text-4xl font-bold text-purple-400">{data.stats.unique_artists}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Tracks */}
        <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-semibold text-white">Most Played Tracks</h2>
          </div>

          <div className="space-y-3">
            {data.top_tracks.map((track, index) => (
              <div
                key={track.track_id}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all border border-white/10"
              >
                <span className="text-2xl font-bold text-gray-500 w-8">
                  {index + 1}
                </span>

                {track.album_cover_url && (
                  <Image
                    src={track.album_cover_url}
                    alt={track.album_name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded object-cover"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{track.track_name}</p>
                  <p className="text-gray-400 text-sm truncate">{track.artist_name}</p>
                </div>

                <span className="text-green-400 font-semibold flex-shrink-0">
                  {track.play_count} plays
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Top Artists */}
        <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-semibold text-white">Top Artists</h2>
          </div>

          <div className="space-y-4">
            {data.top_artists.map((artist, index) => (
              <div key={artist.artist_name} className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-500 w-8">
                  {index + 1}
                </span>

                <div className="flex-1">
                  <p className="text-white font-medium">{artist.artist_name}</p>
                  <div className="mt-2 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-purple-400 h-full rounded-full transition-all"
                      style={{ 
                        width: `${(artist.play_count / data.top_artists[0].play_count) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                <span className="text-purple-400 font-semibold flex-shrink-0">
                  {artist.play_count} plays
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Recent Listening History */}
      <section className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-semibold text-white">Recent Listening History</h2>
        </div>

        <div className="space-y-2">
          {data.recent_plays.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {track.album_cover_url && (
                  <Image
                    src={track.album_cover_url}
                    alt={track.album_name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{track.track_name}</p>
                  <p className="text-gray-400 text-xs truncate">{track.artist_name}</p>
                </div>
              </div>

              <span className="text-gray-400 text-xs flex-shrink-0">
                {new Date(parseInt(track.played_at)).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}