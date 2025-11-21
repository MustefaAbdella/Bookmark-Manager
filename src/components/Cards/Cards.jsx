import React, { useRef, useState } from 'react'
import './Cards.css'
import { Icon } from '@iconify/react'
import { useContextAPI } from '../ContextAPI'
const Cards = ({ ...bookmark }) => {

  const { trackVisitCount, pinnedBookmark } = useContextAPI();
  const [menuOpenId, setMenuOpenId] = useState(null);
  const menuRef = useRef();

  const toggleMenu = (bookmarkId, e) => {
    e.stopPropagation();
    setMenuOpenId(menuOpenId === bookmarkId ? null : bookmarkId);
  }
  return (
    <div className='card-container'>
      <div className="card-detail">
        <div className="card-header">
          <div className="card-title">
            <div className='bookmark-icon'>
              <img src={bookmark.favicon} alt="" />
            </div>
            <div className='title-and-link'>
              <h2>{bookmark.title}</h2>
              <a onClick={() => trackVisitCount(bookmark.id)} href={bookmark.url} target='_blank' rel="noopener">{bookmark.url}</a>
            </div>
          </div>
          <div className='toggle-menu'>
            <Icon icon='charm:menu-kebab'
              onClick={(e) => toggleMenu(bookmark.id, e)} />
            <div className="toggle" ref={menuRef}>
              {menuOpenId === bookmark.id && (
                <div className="toggle-list" onClick={(e) => e.stopPropagation()}>
                  <button className='archive-btn'><Icon icon='material-symbols:archive' />Archive</button>
                  <button className='edit-btn'><Icon icon='mdi:edit-outline' />Edit</button>
                  <button className='delete-btn'><Icon icon='material-symbols:delete-outline' />Delete</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className='bookmark-description'>
            <p>{bookmark.description}</p>
          </div>
          <div className="bookmark-tags">
            {bookmark.tags.map((tag) =>
              <span className='tags-list' key={crypto.randomUUID()}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="time-stamp">
          <span className='watches'><Icon icon='mdi:eye-outline' className='watch-icon' /> {bookmark.visitCount}</span>
          <span className='last-watched'><Icon icon='ic:outline-watch-later' />{bookmark.createdAt}</span>
          <span className='created-date'><Icon icon='majesticons:calendar-line' />{bookmark.lastVisited}</span>
        </div>
        <span onClick={() => pinnedBookmark(bookmark.id)} className={bookmark.pinned ? 'unpin' : 'pin'}>
          <Icon icon='tabler:pinned-filled' />
        </span>
      </div>
    </div>
  )
}

export default Cards