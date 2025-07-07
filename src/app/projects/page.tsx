'use client'

import React from 'react'

type Project = {
  title: string
  description: string[]
  github?: string,
  tags?: string[]
}

const projects: Project[] = [
  {
    title: 'Self hosting my personal website using Next.js',
    description: ['Setup my domains dns to go through Cloudflare for tunneling.',
                  'On my raspberry pi, I setup a Docker environment that will host the website and run the Cloudflare tunnel.',
                  'I will utilize Next.js for the design and infrastructure.'
                ],
    github: 'https://github.com/GarrettMeldrum/personal-website',
    tags: ['Next.js','Typescript','HTML/CSS']
  },
  {
    title: 'Matcha bots run with a controller script using Python',
    description: ['Examined a few of the popular matcha websites to uncover purchase flows and how they update their website when stock becomes available.',
                  'Using Python and primarily the Selenium library, I designed some functions to monitor the "Add to Cart" button.',
                  'When it did activate, I had scripted out the process of making executing the purchase and used a .ENV to share this on my Github.',
                  'I did this for 3 different websites and designed a controller script that terminates all bots when a purchase has been made on one.'                
    ],
    github: 'https://github.com/GarrettMeldrum/matcha-bot',
    tags: ['Python','Selenium']
  },
  {
    title: 'The game of Go using Python',
    description: [  
      'Designed the game logic to support move validation, capturing stones, and enforcing rules like ko and suicide.',
      'Developed a GUI to visualize the board and allow two-player interaction.',
      'Building modularlly to build Go engines later on'],
    github: 'https://github.com/GarrettMeldrum/Go-Baduk',
    tags: ['Python']
  },
  {
    title: 'Spotify dashboard using Python and Spotify API',
    description: [
      'Using the Spotify API, created a listener script to watch my recent listens.',
      'This is ran in a docker environment on my homelab.',
      'This is streamed on a Websocket connected to my Next.js website.'
    ],
    github: 'https://github.com/GarrettMeldrum/spotify_dashboard',
    tags: ['Python','Spotify API']
  },
  {
    title: 'The game of 2048',
    description: [
      'Built the game mechanics including grid merging, movement logic, and win/loss detection.',
      'Implemented a basic terminal GUI to interact with the game using arrow keys.'
    ],
    github: 'https://github.com/GarrettMeldrum/twenty-forty-eight',
    tags: ['Python']
  }
]

export default function ProjectsPage() {
  return (
    <main className="px-6 py-10 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>

      {projects.map((project, index) => (
        <div
          key={index}
          className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
        >
          {project.github ? (
            <h2 className="text-xl font-semibold">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {project.title}
              </a>
            </h2>
          ) : (
            <h2 className="text-xl font-semibold">{project.title}</h2>
          )}

          {project.description.length > 0 && (
            <ul className="list-disc list-outside pl-6 text-gray-800 dark:text-gray-300 mt-2 space-y-1">
              {project.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {project.tags && (
          <div className="flex flex-wrap mt-4 gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
          )}
        </div>
      ))}
    </main>
  )
}