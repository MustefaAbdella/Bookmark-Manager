import React from 'react'
import { Icon } from '@iconify/react';
import './SideBar.css'
import { useContextAPI } from '../ContextAPI';
import { useLocation, useNavigate } from 'react-router-dom';

const SideBar = () => {

  const { bookmarks, selectedTags, handleChechboxChange } = useContextAPI();

  const navigate = useNavigate();
  const location = useLocation();

  const isArchivePage = location.pathname === '/archive';
  const isHome = location.pathname === '/';

  const activeBookmarks = bookmarks.filter(bookmark => !bookmark.isArchived);
  const archivedBookmarks = bookmarks.filter(bookmark => bookmark.isArchived);

  const sourceList = isArchivePage ? archivedBookmarks : activeBookmarks;

  const tagCounts = sourceList.reduce((acc, bookmark) => {
    (bookmark.tags ?? []).forEach(tag => {
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
          <div onClick={() => navigate('/')} className={`home ${isHome ? 'active-page' : ''}`}>
            <span className='home-icon'><Icon icon='mdi:home' className='home-icon' />Home</span>
            <span className='count'>{activeBookmarks?.length}</span></div>
          <div onClick={() => navigate('./archive')} className={`archive ${isArchivePage ? 'active-page' : ''}`}>
            <span className='archive-icon'><Icon icon='mdi:archive' className='archive-icon' />Archive</span>
            <span className='count'>{archivedBookmarks?.length}</span>
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