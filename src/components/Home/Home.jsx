import React, { useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import './Home.css'
import Cards from '../Cards/Cards'
import { useContextAPI } from '../ContextAPI'
import AddBookmark from '../AddBookmark/AddBookmark'
import EditBookmark from '../EditBookmark/EditBookmark'

const Home = () => {

  const { showAddBookmark, showEditBookmark, filteredBookmarks, sortBy, setSortBy } = useContextAPI();

  return (
    <>
      <div className="grid-container">
        <div className="header-container">
          <div className="header">
            <h2>All bookmarks</h2>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='sort-btn'>
              <option value="">Sort by</option>
              <option value="recently-added">Recently added</option>
              <option value="recently-visited">Recently visited</option>
              <option value="most-visited">Most visited</option>
            </select>
          </div>

        </div>
        <div className="bookmark-cards">
          {filteredBookmarks
            .filter(bookmark => !bookmark.isArchived)
            .map((bookmark) => (
              <Cards key={bookmark.id} {...bookmark} />
            ))}
        </div>
      </div>
      {(showAddBookmark && <AddBookmark />) || (showEditBookmark && <EditBookmark />)}
    </>
  )
}

export default Home
