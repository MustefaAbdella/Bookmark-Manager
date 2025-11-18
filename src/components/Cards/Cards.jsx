import React from 'react'
import './Cards.css'
import { Icon } from '@iconify/react'
import { useContextAPI } from '../ContextAPI'
const Cards = ({ ...bookmark }) => {

  const { trackVisitCount } = useContextAPI();
  const handleVisitCount = () => {
    trackVisitCount(bookmark.id);
  }
  return (
    <div className='card-container'>
      <div className="card-detail">
        <div className="card-header">
          <div className="card-title">
            <div className='bookmark-icon'><img src={bookmark.favicon} alt="" /></div>
            <div className='title-and-link'>
              <h2>{bookmark.title}</h2>
              <a onClick={handleVisitCount} href={bookmark.url} target='_blank' rel="noopener">{bookmark.url}</a>
            </div>
          </div>
          <div className='toggle-menu'>
            <Icon icon='charm:menu-kebab' />
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
        <span className='pin'><Icon icon='tabler:pinned' /></span>
      </div>
    </div>
  )
}

export default Cards