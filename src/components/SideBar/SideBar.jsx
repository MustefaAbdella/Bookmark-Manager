import React from 'react'
import { Icon } from '@iconify/react';
import './SideBar.css'
import { useContextAPI } from '../ContextAPI';

const SideBar = () => {

  const { bookmarks, selectedTags, handleChechboxChange } = useContextAPI();

  const tagCounts = bookmarks.reduce((acc, bookmark) => {
    bookmark.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  return (
    <div className='sidebar'>
      <div className="sidebar-wrapper">
        <div className='title'>
          <span className='title-icon'><Icon icon='mdi:bookmark' /></span>
          <h1>Bookmark Manager</h1>
        </div>
        <div className="home-archive">
          <div className='home'>
            <span className='home-icon'><Icon icon='mdi:home' className='home-icon' />Home</span>
            <span className='count'>{bookmarks.length}</span></div>
          <div className='archive'>
            <span className='archive-icon'><Icon icon='mdi:archive' className='archive-icon' />Archive</span>
            <span className='count'>0</span>
          </div>
        </div>

        <div className="tags-category">
          <h2>TAGS</h2>
          <div className="tags-list">
            {Object.entries(tagCounts).map(([tag, count]) => (
              <div className="individual-tags" key={crypto.randomUUID()}>
                <span className='tag-name'>
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={handleChechboxChange}
                  />
                  <p>{tag.charAt(0).toUpperCase() + tag.slice(1)}</p>
                </span>
                <span className='tags-count'>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar