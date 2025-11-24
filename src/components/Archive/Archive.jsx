import '../Cards/Cards.css'
import Cards from '../Cards/Cards'
import './Archive.css'
import { useContextAPI } from '../ContextAPI'

const Archive = () => {
  const { filteredBookmarks, isDark } = useContextAPI();

  console.log(filteredBookmarks.isArchived);

  return (
    <div className='archive-container' data-theme={isDark ? "dark" : "light"}>
      <h2>All archived bookmarks</h2>
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