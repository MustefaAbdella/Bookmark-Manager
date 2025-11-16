import { createContext, useContext, useState } from "react";
import { bookmarks as initialBookmarks } from '../data.json'

const ContextAPI = createContext();

export const ContextProvider = ({ children }) => {

  const [query, setQuery] = useState('');
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [showAddBookmark, setShowAddBookmark] = useState(false)

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


  const value = {
    query,
    bookmarks,
    showAddBookmark,
    setQuery,
    setBookmarks,
    setShowAddBookmark,
    addBookmark
  };

  return <ContextAPI.Provider value={value}>
    {children}
  </ContextAPI.Provider>
}

export const useContextAPI = () => useContext(ContextAPI);