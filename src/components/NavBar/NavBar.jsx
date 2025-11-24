import React from 'react'
import { Icon } from '@iconify/react'
import './NavBar.css'
import { useContextAPI } from '../ContextAPI'

const NavBar = () => {

  const { setQuery, setShowAddBookmark, isDark, toggleTheme } = useContextAPI();

  return (
    <div className='navbar'>
      <div className="navbar-wrapper">
        <div className="navbar-search">
          <Icon icon='mdi:search' className='search-icon' />
          <input onChange={(e) => setQuery(e.target.value.toLowerCase())}
            type="text" placeholder='Search by title...' />
        </div>
        <div className="navbar-left">

          <div className='theme' onClick={toggleTheme}>
            <Icon icon={isDark ? 'emojione-v1:sun' : 'akar-icons:moon-fill'} />
          </div>

          <button onClick={() => setShowAddBookmark(true)}><Icon icon='mdi:plus' /> Add Bookmark</button>
          <div className="profile">
            <img src="../my-channel.jpeg" alt="" />
          </div>
        </div>
      </div>

    </div>
  )
}

export default NavBar
