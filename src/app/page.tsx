'use client';
import React, { useState, useEffect } from 'react';
import { Music, Code, Github, ExternalLink, Mountain, Linkedin, Mail, ChefHat } from 'lucide-react';

export default function PersonalLandingPage() {
  const [spotifyData, setSpotifyData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [trips, setTrips] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // Fetch data from APIs
    const fetchData = async () => {
      try {
        // Fetch Spotify data from your Python API via Next.js route
        const spotifyResponse = await fetch('/api/recent');
        if (spotifyResponse.ok) {
          const spotifyJson = await spotifyResponse.json();
          // Map the data to match component format
          const formattedSpotify = spotifyJson.map((track: any, index: number) => ({
            id: track.id || index + 1,
            track: track.track_name || track.track || "Unknown Track",
            artist: track.artist || "Unknown Artist",
            album: track.album || "Unknown Album",
            plays: track.play_count || track.plays || 0,
          }));
          setSpotifyData(formattedSpotify);
        } else {
          console.error('Failed to fetch Spotify data');
          setSpotifyData([]);
        }
        
        // Mock projects data - replace with your projects API call
        const mockProjects = [
          { 
            id: 1, 
            name: 'Project One', 
            description: 'A cool web application built with React and Node.js',
            tech: ['React', 'Node.js', 'MongoDB'],
            link: '#'
          },
          { 
            id: 2, 
            name: 'Project Two', 
            description: 'Mobile app for tracking fitness goals',
            tech: ['React Native', 'Firebase'],
            link: '#'
          },
          { 
            id: 3, 
            name: 'Project Three', 
            description: 'Data visualization dashboard for analytics',
            tech: ['Next.js', 'D3.js', 'PostgreSQL'],
            link: '#'
          },
        ];

        // Mock mountaineering trips data
        const mockTrips = [
          {
            id: 1,
            peak: 'Mount Rainier',
            location: 'Washington, USA',
            elevation: '14,411 ft',
            date: 'August 2024',
            route: 'Disappointment Cleaver'
          },
          {
            id: 2,
            peak: 'Grand Teton',
            location: 'Wyoming, USA',
            elevation: '13,775 ft',
            date: 'July 2024',
            route: 'Owen-Spalding'
          },
          {
            id: 3,
            peak: 'Longs Peak',
            location: 'Colorado, USA',
            elevation: '14,259 ft',
            date: 'June 2024',
            route: 'Keyhole Route'
          },
        ];

        // Mock recipes data
        const mockRecipes = [
          {
            id: 1,
            name: 'Homemade Sourdough Bread',
            category: 'Baking',
            prepTime: '24 hours',
            difficulty: 'Intermediate'
          },
          {
            id: 2,
            name: 'Thai Green Curry',
            category: 'Main Course',
            prepTime: '45 min',
            difficulty: 'Easy'
          },
          {
            id: 3,
            name: 'Classic Tiramisu',
            category: 'Dessert',
            prepTime: '30 min',
            difficulty: 'Easy'
          },
        ];

        setProjects(mockProjects);
        setTrips(mockTrips);
        setRecipes(mockRecipes);
        setContributions(mockContributions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSpotifyData([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient">
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background: linear-gradient(-45deg, #0f172a, #581c87, #1e1b4b, #065f46, #7c2d12);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Garrett Meldrum
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            I'm a passionate developer who loves building beautiful, functional web experiences. When I'm not coding, you'll find me exploring new music, contributing to open source, or learning the latest technologies in the ever-evolving world of web development.
          </p>
        </header>

        {/* Connections Section */}
        <section className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6">Platforms</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105 border border-white/10"
              >
                <Github className="w-8 h-8 text-white mb-2" />
                <span className="text-sm text-gray-300">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105 border border-white/10"
              >
                <Linkedin className="w-8 h-8 text-blue-400 mb-2" />
                <span className="text-sm text-gray-300">LinkedIn</span>
              </a>
              <a
                href="https://leetcode.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105 border border-white/10"
              >
                <Code className="w-8 h-8 text-yellow-400 mb-2" />
                <span className="text-sm text-gray-300">LeetCode</span>
              </a>
              <a
                href="https://alltrails.com/members/yourusername"
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
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {spotifyData.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div>
                      <p className="text-white font-medium">{item.track}</p>
                      <p className="text-gray-400 text-sm">{item.artist} • {item.album}</p>
                    </div>
                    <span className="text-green-400 text-sm font-semibold">{item.plays} plays</span>
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
                    <p className="text-gray-400 text-sm mb-1">{trip.location}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{trip.route}</span>
                      <span className="text-gray-400">{trip.date}</span>
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
    </div>
  );
}
