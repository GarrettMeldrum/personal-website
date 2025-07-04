'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/life-updates', label: 'Life Updates' },
  { href: '/mountaineering', label: 'Mountaineering' },  
  { href: '/homebrewing', label: 'Homebrewing' },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      <Link href="/" className="text-xl font-bold">
        Garrett Meldrum
      </Link>
      <ul className="flex space-x-6 text-sm font-medium">
        {links.map(({ href, label }) => (
			<li key={href}>
			<Link href={href} className={clsx('hover:text-blue-600 transition-colors', pathname === href ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-300')
			}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
