'use client'

import React from 'react'
import { projects } from '@/data/projects';
import { Code } from 'lucide-react';
import Link from 'next/link';

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
          A collection of projects I&apos;ve built, ranging from web applications to data tools.
        </p>
      </div>

      <div className="space-y-6">
        {mappedProjects.map((project, index) => {
          const content = (
            <>
              <div className="flex items-center gap-3 mb-3">
                <Code className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white">
                  {project.title}
                </h2>
              </div>

              {project.description.length > 0 && (
                <div className="text-gray-300 space-y-2 mb-4">
                  {project.description.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
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
            <Link
              key={index}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-[1.02] border border-white/10 cursor-pointer group"
            >
              {content}
            </Link>
          ) : (
            <div
              key={index}
              className="block p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-[1.02] border border-white/10"
            >
              {content}
            </div>
          );
        })}
      </div>
    </main>
  )
}