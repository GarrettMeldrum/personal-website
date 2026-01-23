'use client';
import React, { useState, useEffect } from 'react';
import { Music, Code, Github, Mountain, Linkedin, ChefHat } from 'lucide-react';
import { getFeaturedProjects } from '@/data/projects';

export default function PersonalLandingPage() {
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [trips, setTrips] = useState([]);
  const [recipes, setRecipes] = useState([]);
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
    // Mock projects data
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
          I'm a passionate developer who loves building beautiful, functional web experiences. 
          When I'm not coding, you'll find me exploring new music, contributing to open source, 
          or learning the latest technologies in the ever-evolving world of web development.
        </p>
      </header>

      {/* Platforms Section */}
      <section className="mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">Platforms</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="https://github.com/GarrettMeldrum"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105 border border-white/10"
            >
              <Github className="w-8 h-8 text-white mb-2" />
              <span className="text-sm text-gray-300">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/garrett-meldrum/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105 border border-white/10"
            >
              <Linkedin className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-sm text-gray-300">LinkedIn</span>
            </a>
            <a
              href="https://leetcode.com/u/garrettmeldrum/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105 border border-white/10"
            >
              <Code className="w-8 h-8 text-yellow-400 mb-2" />
              <span className="text-sm text-gray-300">LeetCode</span>
            </a>
            <a
              href="https://alltrails.com/members/garrett-meldrum"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105 border border-white/10"
            >
              <Mountain className="w-8 h-8 text-green-400 mb-2" />
              <span className="text-sm text-gray-300">AllTrails</span>
            </a>
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <ChefHat className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-semibold text-white">Favorite Recipes</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {recipes.slice(0, 3).map((recipe) => (
                <div 
                  key={recipe.id} 
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div>
                    <p className="text-white font-medium">{recipe.name}</p>
                    <p className="text-gray-400 text-sm">{recipe.category} • {recipe.prepTime}</p>
                  </div>
                  <span className="text-amber-400 text-sm font-semibold">{recipe.difficulty}</span>
                </div>
              ))}
              <a 
                href="/recipes"
                className="block text-center py-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                View all recipes →
              </a>
            </div>
          )}
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
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {/* Album Cover - Only show for first (currently playing) track */}
                  {index === 0 && item.album_cover_url && (
                    <div className="flex-shrink-0">
                      <img 
                        src={item.album_cover_url} 
                        alt={`${item.album_name} cover`}
                        className="w-16 h-16 rounded-full object-cover animate-spin-slow"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium truncate">{item.track_name}</p>
                      {index === 0 && (
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse delay-75"></div>
                          <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse delay-150"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm truncate">{item.artist_name} • {item.album_name}</p>
                  </div>
                  
                  <span className="text-green-400 text-sm font-semibold flex-shrink-0">
                    {item.play_count || 0} plays
                  </span>
                </div>
              ))}
              <a 
                href="/music-analytics"
                className="block text-center py-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                View More Analytics →
              </a>
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
                <a
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
                </a>
              ))}
              <a 
                href="/projects"
                className="block text-center py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View all projects →
              </a>
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
                  className="p-5 bg-white/5 rounded-lg hover:bg-white/10 transition-all border border-white/10"
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
              <a 
                href="/mountaineering"
                className="block text-center py-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
              >
                View all trips →
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
