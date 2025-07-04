'use client'

import React from 'react'

type Project = {
  title: string
  description: string[]
  date: string  // ISO format is best: "2025-07-01"
}

const projects: Project[] = [
  {
    title: 'Self hosting my personal website using Next.js',
    description: ['Setup my domains dns to go through Cloudflare for tunneling.',
                  'On my raspberry pi, I setup a Docker environment that will host the website and run the Cloudflare tunnel.',
                  'I will utilize Next.js for the design and infrastructure.'
                ],
    date: '2025-07-01',
  },
  {
    title: 'Matcha bots run with a controller script using Python',
    description: ['Examined a few of the popular matcha websites to uncover purchase flows and how they update their website when stock becomes available.',
                  'Using Python and primarily the Selenium library, I designed some functions to monitor the "Add to Cart" button.',
                  'When it did activate, I had scripted out the process of making executing the purchase and used a .ENV to share this on my Github.',
                  'I did this for 3 different websites and designed a controller script that terminates all bots when a purchase has been made on one.'                
    ],
    date: '2025-06-15',
  },
  {
    title: 'The game of Go using Python',
    description: [],
    date: '2025-03-05'
  },
  {
    title: 'Spotify dashboard using Python and Spotify API',
    description: [],
    date: '2025-02-05'
  }
]

export default function ProjectsPage() {
  // Sort newest to oldest
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <main className="px-6 py-10 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>

      {sortedProjects.map((project, index) => (
        <div
          key={index}
          className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-xl font-semibold">{project.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            {new Date(project.date).toLocaleDateString()}
          </p>
          <div className="text-gray-800 dark:text-gray-300 space-y-1 pl-1">
          <ul className="list-disc list-outside pl-6">
  {project.description.map((item, i) => (
    <li key={i}>{item}</li>
  ))}
</ul>
        </div>
        </div>
      ))}
    </main>
  )
}
