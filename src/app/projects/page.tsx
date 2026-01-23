'use client'

import React from 'react'
import { projects } from '@/data/projects';

type Project = {
  title: string
  description: string[]
  github?: string,
  tags?: string[]
}

export default function ProjectsPage() {
  // Map the data structure from projects.ts to match your page layout
  const mappedProjects: Project[] = projects.map(p => ({
    title: p.name,
    description: [p.description], // Convert single description to array
    github: p.link !== '#' ? p.link : undefined, // Only include if not placeholder
    tags: p.tech // Use tech stack as tags
  }));

  return (
    <main className="px-6 py-10 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>

      {mappedProjects.map((project, index) => (
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