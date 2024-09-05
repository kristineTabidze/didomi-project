import React from 'react'
import { navItems } from '../../fixtures'
import { NavItem } from './NavItem'

export const Sidebar: React.FC = () => {
  return (
    <aside className="h-screen bg-gray-200 border-r border-gray-300">
      <nav>
        <ul>
          {navItems.map((item, index) => (
            <NavItem key={index} title={item.title} link={item.link} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}
