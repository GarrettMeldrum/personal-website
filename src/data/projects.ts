export const projects = [
  { 
    id: 1, 
    name: 'Self-Hosting React/Next.js Personal Website', 
    description: 'My personal website is being self-hosted and served locally. This website is utilizing React/Next.js as a framework and uses Nginx to expose it to the internet.',
    tech: ['React', 'Next.js', 'Typescript', 'APIs', 'Self-Hosting','Nginx'],
    link: '#',
    featured: true // Add this flag
  },
  { 
    id: 2, 
    name: 'Matcha Purchasing Bot', 
    description: 'This is an orchestration of bots that monitor and execute purchases for specific brands matchas. The bot will automatically terminate when one of the slave bots successfully executes a purchase.',
    tech: ['Python', 'Selenium', 'Orchestration'],
    link: '#',
    featured: true
  },
  { 
    id: 3, 
    name: 'Spotfiy Dashboard/API', 
    description: 'Utilizing the Spotify API to capture listening data to a database. Then, this is reserved with analytics by a Python flask API that I utilizing in my applications.',
    tech: ['Python', 'SQL', 'APIs', 'Flask'],
    link: 'https://github.com/GarrettMeldrum/spotify_dashboard',
    featured: true
  },
  { 
    id: 4, 
    name: 'The Game of Go', 
    description: 'Creating the ancient game of Go using Python',
    tech: ['Python'],
    link: 'https://github.com/GarrettMeldrum/Go-Baduk',
    featured: false
  },
  { 
    id: 5, 
    name: '2048 The Game', 
    description: 'Recreating the classic game 2048 using Python.',
    tech: ['Python'],
    link: 'https://github.com/GarrettMeldrum/twenty-forty-eight',
    featured: false
  },
  // ... more projects
];

export function getFeaturedProjects() {
  return projects.filter(p => p.featured).slice(0, 3);
}