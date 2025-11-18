import { createContext, useContext, useState } from "react";
import { bookmarks as initialBookmarks } from '../data.json'

const ContextAPI = createContext();

export const ContextProvider = ({ children }) => {

  const [query, setQuery] = useState('');
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [showAddBookmark, setShowAddBookmark] = useState(false)
  const [selectedTags, setSelectedTags] = useState([]);
  // const [filteredBookmark, setFilteredBookmark] = useState(initialBookmarks);

  const addBookmark = (newBookmark) => {
    const bookmark = {
      id: `bm-${String(bookmarks.length + 1).padStart(3, "0")}`,
      favicon: '/images/react-logo.svg',
      pinned: false,
      isArchived: false,
      visitCount: 0,
      createdAt: new Date().toISOString().slice(0, 7),
      lastVisited: new Date().toISOString().slice(0, 7),
      ...newBookmark
    }

    setBookmarks(prev => [...prev, bookmark]);
    setShowAddBookmark(false);
  }

  const handleChechboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedTags(prevTags => [...prevTags, value]);
    } else {
      setSelectedTags(prevTags => prevTags.filter(tag => tag !== value));
    }
  };

  const getSelectedBookmarks = () => {

    let result = bookmarks;

    // filter based on tag
    if (selectedTags && selectedTags.length > 0) {
      result = bookmarks.filter((bookmark) =>
        bookmark.tags &&
        bookmark.tags.some(tag => selectedTags.includes(tag))
      );

      // search using title of the bookmark
      if (query) {
        result = result
          .filter((bookmark) => bookmark.title.toLowerCase().includes(query));
      }
      return result;
    }

    const filteredBookmarks = getSelectedBookmarks();

    const value = {
      query,
      bookmarks,
      showAddBookmark,
      selectedTags,
      setQuery,
      setBookmarks,
      setShowAddBookmark,
      addBookmark,
      setSelectedTags,
      handleChechboxChange,
      filteredBookmarks
    };

    return <ContextAPI.Provider value={value}>
      {children}
    </ContextAPI.Provider>
  }
}
export const useContextAPI = () => useContext(ContextAPI);