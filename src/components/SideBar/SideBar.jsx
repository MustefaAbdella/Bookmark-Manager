import React from 'react'
import { Icon } from '@iconify/react';
import './SideBar.css'
import { useContextAPI } from '../ContextAPI';

const SideBar = () => {

  const { bookmarks } = useContextAPI();

  return (
    <div className='sidebar'>
      <div className="sidebar-wrapper">
        <div className='title'>
          <span className='title-icon'><Icon icon='mdi:bookmark' /></span>
          <h1>Bookmark Manager</h1>
        </div>
        <div className="home-archive">
          <div className='home'><Icon icon='mdi:home' className='home-icon' />Home</div>
          <div className='archive'><Icon icon='mdi:archive' className='archive-icon' />Archive</div>
        </div>

        <div className="tags-category">
          <h2>TAGS</h2>
          <div className="tags-list">
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>AI</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes('AI')).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>Community</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes('Community')).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>Compatibility</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("Compatibility")).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>CSS</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("CSS")).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>Design</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("Design")).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>Framework</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("Framework")).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>Git</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("Git")).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>JavaScript</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("JavaScript")).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>Layout</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("Layout")).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>Learning</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("Learning")).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>Performance</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("Performance")).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>Practice</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("Practice")).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>Preference</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("Preference")).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>Tips</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("Tips")).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>Tools</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("Tools")).length}
              </span>
            </div>
            <div className="individual-tags">
              <span className='tag-name'>
                <input type="checkbox" />
                <p>Tutorial</p>
              </span>
              <span className='tags-count'>
                {bookmarks.filter((bookmark) => bookmark.tags.includes("Tutorial")).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar