'use client'

import React from 'react'
import { projects } from '@/data/projects';
import { Code } from 'lucide-react';

type Project = {
  title: string
  description: string[]
  github?: string,
  tags?: string[]
}

export default function ProjectsPage() {
  const mappedProjects: Project[] = projects.map(p => ({
    title: p.name,
    description: [p.description],
    github: p.link !== '#' ? p.link : undefined,
    tags: p.tech
  }));

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Projects
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A collection of projects I've built, ranging from web applications to data tools.
        </p>
      </div>

      <div className="space-y-6">
        {mappedProjects.map((project, index) => {
          const content = (
            <>
              <div className="flex items-center gap-3 mb-3">
                <Code className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h2>
              </div>

              {project.description.length > 0 && (
                <ul className="list-disc list-outside pl-6 text-gray-300 space-y-2 mb-4">
                  {project.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-400/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          );

          return project.github ? (
            <a
              key={index}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 hover:scale-[1.02] transition-all cursor-pointer group"
            >
              {content}
            </a>
          ) : (
            <div
              key={index}
              className="block bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl"
            >
              {content}
            </div>
          );
        })}
      </div>
    </main>
  )
}