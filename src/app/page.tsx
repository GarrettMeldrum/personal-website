'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Music, Code, Github, Mountain, Linkedin, Clock } from 'lucide-react';
import { getFeaturedProjects } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';

// Add these type definitions
type CurrentlyPlaying = {
  is_playing: boolean;
  progress_ms?: number;
  track? : {
    track_id: string;
    track_name: string;
    artist_name: string;
    album_image_url?: string;
    track_duration_ms: number;
    track_spotify_url: string;
    play_count: number;
  };
  tracks?: Array<{
    track_id: string;
    track_name: string;
    artist_name: string;
    album_name: string;
    album_image_url?: string;
    track_duration_ms: number;
  }>;
};

type Project = {
  id: number;
  name: string;
  description: string;
  tech: string[];
  link: string;
  featured: boolean;
};

type Trip = {
  id: string;
  peak: string;
  elevation: string;
  route: string;
  date: string;
};

const poll_interval = 3000;

export default function PersonalLandingPage() {
  const [spotifyData, setSpotifyData] = useState<CurrentlyPlaying | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // pulling spotify data
  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const response = await fetch('/api/currently-playing', { cache: "no-store", signal: AbortSignal.timeout(5000) });
        
        if (!response.ok) throw new Error('Failed to fetch');

        const result = await response.json();
        setSpotifyData(result);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const startPolling = () => {
      fetchSpotify();
      intervalRef.current = setInterval(fetchSpotify, poll_interval);
    };

    const stopPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        startPolling();
      }
    };

    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // pulling projects and mountaineering trips
  useEffect(() => {

    const featuredProjects = getFeaturedProjects();
    setProjects(featuredProjects);
    
    const fetchTrips = async () => {
      try {
        const response = await fetch('/api/mountaineering', { cache: "no-store" });
        const tripsData = await response.json();
        setTrips(tripsData);
      } catch (error) {
            console.error("Error fetching trips:", error);
            setTrips([]);
        }
      };
    
    fetchTrips();
    setLoading(false);

  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Garrett Meldrum
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          I&apos;m passionate about learning and growing as a programmer. I plan to seek higher education to pursue my passion of computer science. In my freetime, I enjoy climbing, mountaineering, cooking, and homebrewing.
        </p>
      </header>

      {/* Platforms Section */}
      <section className="mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">Social Platforms</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="https://github.com/GarrettMeldrum"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-[1.02] border border-white/10"
            >
              <Github className="w-8 h-8 text-white mb-2" />
              <span className="text-sm text-gray-300">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/garrett-meldrum/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-[1.02] border border-white/10"
            >
              <Linkedin className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-sm text-gray-300">LinkedIn</span>
            </Link>
            <Link
              href="https://leetcode.com/u/garrettmeldrum/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-[1.02] border border-white/10"
            >
              <Code className="w-8 h-8 text-yellow-400 mb-2" />
              <span className="text-sm text-gray-300">LeetCode</span>
            </Link>
            <Link
              href="https://alltrails.com/members/garrett-meldrum"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-[1.02] border border-white/10"
            >
              <Mountain className="w-8 h-8 text-green-400 mb-2" />
              <span className="text-sm text-gray-300">AllTrails</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Now Playing Section - Only show if playing */}
      {spotifyData?.is_playing && spotifyData.track && (
        <section className="mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Music className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-semibold text-white">🎵 Now Playing</h2>
            </div>
            
            <div className="flex items-center gap-6">
              {spotifyData.track.album_image_url && (
                <div className="flex-shrink-0">
                  <Image 
                    src={spotifyData.track.album_image_url} 
                    alt={`${spotifyData.track.album_name} cover`}
                    width={96}
                    height={96}
                    unoptimized
                    className="w-24 h-24 rounded-full object-cover animate-spin-slow shadow-lg"
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-bold text-white mb-1 truncate">
                  {spotifyData.track.track_name}
                </p>
                <p className="text-gray-300 text-lg mb-2 truncate">
                  {spotifyData.track.artist_name}
                </p>
                <p className="text-gray-400 text-sm truncate mb-3">
                  {spotifyData.track.album_name}
                </p>
                
                {/* Progress bar */}
                {spotifyData.progress_ms !== undefined && (
                  <div className="mt-3">
                    <div className="bg-white/20 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-green-400 h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${(spotifyData.progress_ms / spotifyData.track.track_duration_ms) * 100}%` 
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>
                        {Math.floor(spotifyData.progress_ms / 1000 / 60)}:
                        {String(Math.floor((spotifyData.progress_ms / 1000) % 60)).padStart(2, '0')}
                      </span>
                      <span>
                        {Math.floor(spotifyData.track.track_duration_ms / 1000 / 60)}:
                        {String(Math.floor((spotifyData.track.track_duration_ms / 1000) % 60)).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-green-400 text-sm font-semibold">
                    {spotifyData.track.play_count} total plays
                  </span>
                  <a 
                    href={spotifyData.track.track_spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 text-sm transition-colors"
                  >
                    Open in Spotify →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recently Played Section */}
      <section className="mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-semibold text-white">Recently Played</h2>
          </div>
          
          {!spotifyData ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : spotifyData.tracks && spotifyData.tracks.length > 0 ? (
            <div className="space-y-3">
              {spotifyData.tracks.slice(0, 3).map((track) => (
                <div 
                  key={track.track_id} 
                  className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-[1.02] border border-white/10 gap-4"
                >
                  {track.album_image_url && (
                    <Image 
                      src={track.album_image_url} 
                      alt={`${track.album_name} cover`}
                      width={48}
                      height={48}
                      unoptimized
                      className="w-12 h-12 rounded object-cover"
                    />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{track.track_name}</p>
                    <p className="text-gray-400 text-sm truncate">
                      {track.artist_name} • {track.album_name}
                    </p>
                  </div>
                </div>
              ))}
              <Link 
                href="/spotifydashboard"
                className="block text-center py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View Full Dashboard →
              </Link>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No recent tracks</p>
          )}
        </div>
      </section>


      {/* Projects Section */}
      <section className="mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-semibold text-white">Featured Projects</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <Link
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-[1.02] border border-white/10 cursor-pointer group"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{project.name}</h3>
                  <p className="text-gray-300 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
              <Link 
                href="/projects"
                className="block text-center py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View All Projects →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Mountaineering Section */}
      <section>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Mountain className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-semibold text-white">Mountaineering</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {trips.slice(0, 3).map((trip) => (
                <Link
                  key={trip.id}
                  href={`/mountaineering/${trip.id}`}
                  className="block p-5 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-[1.02] border border-white/10 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">{trip.peak}</h3>
                    <span className="text-orange-400 text-sm font-semibold">{trip.elevation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{trip.route}</span>
                    <span className="text-gray-400 text-sm">{trip.date}</span>
                  </div>
                </Link>
              ))}
              <Link 
                href="/mountaineering"
                className="block text-center py-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
              >
                View all trips →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
