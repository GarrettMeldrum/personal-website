'use client';
import React, { useState, useEffect } from 'react';
import { Music, Code, Github, Mountain, Linkedin } from 'lucide-react';
import { getFeaturedProjects } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';

// Add these type definitions
type SpotifyTrack = {
  id: number;
  track_name: string;
  artist_name: string;
  album_name: string;
  album_cover_url?: string;
  play_count?: number;
  is_playing?: boolean;
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

export default function PersonalLandingPage() {
  const [data, setData] = useState<SpotifyTrack[] | null>(null); // Add type annotation
  const [projects, setProjects] = useState<Project[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  // pulling spotify data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/recent', { cache: "no-store" });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling interval (every 2.5 seconds)
    const intervalId = setInterval(fetchData, 2500);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // pulling the rest of the data
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

      {/* Spotify Section */}
      <section className="mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Music className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-semibold text-white">Currently Listening</h2>
          </div>
          
          {!data ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {data.map((item, index) => (
                <div 
                  key={item.id || index} 
                  className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-[1.02] border border-white/10 gap-4"
                >
                  {/* Album Cover - Only show for first (currently playing) track */}
                  {index === 0 && item.album_cover_url && (
                    <div className="flex-shrink-0">
                      <Image 
                        src={item.album_cover_url} 
                        alt={`${item.album_name} cover`}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover animate-spin-slow"
                        style={{ animationPlayState: item.is_playing ? 'running' : 'paused' }}
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-white font-medium truncate flex-1">{item.track_name}</p>
                      <span className="text-green-400 text-sm font-semibold flex-shrink-0">
                        {item.play_count || 0} plays
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm truncate">{item.artist_name} • {item.album_name}</p>
                  </div>
                </div>
              ))}
              <Link 
                href="/spotifydashboard"
                className="block text-center py-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                View Spotify Dashboard →
              </Link>
            </div>
          )}
        </div>
        
        <style jsx>{`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
          .delay-75 {
            animation-delay: 75ms;
          }
          .delay-150 {
            animation-delay: 150ms;
          }
        `}</style>
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
                <div 
                  key={trip.id} 
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
                </div>
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
