import React from 'react'
import { Icon } from '@iconify/react'
import './Home.css'
import NavBar from '../NavBar/NavBar'
import Cards from '../Cards/Cards'
import { useContextAPI } from '../ContextAPI'
import AddBookmark from '../AddBookmark/AddBookmark'

const Home = () => {

  const { showAddBookmark, filteredBookmarks } = useContextAPI();

  return (
    <div className='main-content'>
      <NavBar />
      <div className="grid-container">
        <div className="header-container">
          <div className="header">
            <h1>All bookmarks</h1>
            <button><Icon icon='mdi:sort' />Sort by</button>
          </div>
        </div>
        <div className="bookmark-cards">
          {filteredBookmarks.map((bookmark) => (
            <Cards key={bookmark.id} {...bookmark} />
          ))}
        </div>
      </div>
      {showAddBookmark && <AddBookmark />}
    </div>
  )
}

export default Home
