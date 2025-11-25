import '../Cards/Cards.css'
import Cards from '../Cards/Cards'
import './Archive.css'
import { useContextAPI } from '../ContextAPI'
import { Icon } from '@iconify/react'

const Archive = () => {
  const { filteredBookmarks, isDark, sortBy, setSortBy } = useContextAPI();

  console.log(filteredBookmarks.isArchived);

  return (
    <div className='archive-container' data-theme={isDark ? "dark" : "light"}>
      <div className="header">
        <h2>All bookmarks</h2>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='sort-btn'>
          <option value=""><Icon icon='mdi:sort' />Sort by</option>
          <option value="recently-added">Recently added</option>
          <option value="recently-visited">Recently visited</option>
          <option value="most-visited">Most visited</option>
        </select>
      </div>
      <div className="archived-bookmark-cards">
        {filteredBookmarks
          .filter(bookmark => bookmark.isArchived)
          .map(bookmark => (
            <Cards key={bookmark.id} {...bookmark} />
          ))}
      </div>
    </div>
  )
}

export default Archive