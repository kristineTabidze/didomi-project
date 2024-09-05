import React from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

interface INavItemProps {
  title: string
  link: string
}

export const NavItem: React.FC<INavItemProps> = ({ title, link }) => {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          clsx(
            'block mt-2.5 text-center p-2.5 border border-gray-500 rounded',
            { 'bg-blue-300': isActive }
          )
        }
        to={link}
      >
        {title}
      </NavLink>
    </li>
  )
}
