import { createContext, useContext, useState } from "react";
import { bookmarks as initialBookmarks } from '../data.json'

const ContextAPI = createContext();

export const ContextProvider = ({ children }) => {

  const [query, setQuery] = useState('');
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [showAddBookmark, setShowAddBookmark] = useState(false);
  const [showEditBookmark, setShowEditBookmark] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDarkMode')));

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

  const handleDelete = (bookmarkId) => {
    setBookmarks(prevBookmarks =>
      prevBookmarks.filter(bookmark => bookmark.id !== bookmarkId)
    )
  }

  const handleEditBookmark = (bookmarkId) => {
    const bookmarkToEdit = bookmarks.filter(bookmark => bookmark.id === bookmarkId);
    setEditingBookmark(bookmarkToEdit);
    setShowEditBookmark(true);
  }

  const handleSaveEdit = (editedBookmark) => {
    setBookmarks(prevBookmarks =>
      prevBookmarks.map(bookmark =>
        bookmark.id === editedBookmark.id ? editedBookmark : bookmark
      ));
    setShowEditBookmark(false);
    setEditingBookmark(null);
  }


  const sortBookmarks = (bookmarksToSort) => {
    switch (sortBy) {
      case 'recently-added':
        // sort by Recently added
        return [...bookmarksToSort].sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt));

      // sort by Recently visited
      case 'recently-visited':
        return [...bookmarksToSort].sort((a, b) =>
          new Date(b.lastVisited) - new Date(a.lastVisited));

      // sort by Most visited
      case 'most-visited':
        return [...bookmarksToSort].sort((a, b) =>
          (b.visitCount || 0) - (a.visitCount || 0));

      default:
        return bookmarksToSort;
    }
  }

  const getSelectedBookmarks = () => {

    let result = bookmarks;

    // filter based on tag
    if (selectedTags && selectedTags.length > 0) {
      result = result.filter((bookmark) =>
        bookmark.tags &&
        bookmark.tags.some(tag => selectedTags.includes(tag))
      );
    }
    // search using title of the bookmark
    if (query) {
      result = result
        .filter((bookmark) => bookmark.title.toLowerCase().includes(query.toLowerCase()));
    };

    // apply sorting
    result = sortBookmarks(result);

    return result;
  }

  const filteredBookmarks = getSelectedBookmarks();

  // visit count
  const trackVisitCount = (bookmarkId) => {
    setBookmarks(prevBookmarks =>
      prevBookmarks.map(bookmark =>
        bookmark.id === bookmarkId
          ? { ...bookmark, visitCount: (bookmark.visitCount || 0) + 1 }
          : bookmark
      )
    );
  }

  // pinned bookmark 
  const pinnedBookmark = (bookmarkId) => {
    setBookmarks(prevBookmarks => {
      // update pinned status
      return prevBookmarks.map(bookmark =>
        bookmark.id === bookmarkId
          ? { ...bookmark, pinned: !bookmark.pinned }
          : bookmark
      ).sort((a, b) => {
        // pinned items first
        if (a.pinned !== b.pinned) {
          return a.pinned ? -1 : 1;
        }
        // sort by id for unpinned
        return a.id.localeCompare(b.id)
      })
    })
  }

  // archive bookmark
  const archiveBookmark = (bookmarkId) => {
    setBookmarks(prevBookmarks =>
      prevBookmarks
        .map(bookmark =>
          bookmark.id === bookmarkId
            ? { ...bookmark, isArchived: true }
            : bookmark
        )
    );
  }

  // unarchive bookmark
  const unarchiveBookmark = (bookmarkId) => {
    setBookmarks(prevBookmarks =>
      prevBookmarks
        .map(bookmark =>
          bookmark.id === bookmarkId
            ? { ...bookmark, isArchived: false }
            : bookmark
        )
    );
  }


  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      localStorage.setItem('isDarkMode', JSON.stringify(newValue));
      return newValue;
    })
  }

  const value = {
    query,
    bookmarks,
    showAddBookmark,
    showEditBookmark,
    selectedTags,
    filteredBookmarks,
    isDark,
    sortBy,
    editingBookmark,
    showEditBookmark,
    setQuery,
    setBookmarks,
    setShowAddBookmark,
    setShowEditBookmark,
    setEditingBookmark,
    handleSaveEdit,
    addBookmark,
    setSelectedTags,
    handleChechboxChange,
    handleDelete,
    handleEditBookmark,
    trackVisitCount,
    pinnedBookmark,
    unarchiveBookmark,
    archiveBookmark,
    setIsDark,
    setSortBy,
    toggleTheme
  };

  return <ContextAPI.Provider value={value}>
    <div data-theme={isDark ? "dark" : "light"}>
      {children}
    </div>

  </ContextAPI.Provider>

}
export const useContextAPI = () => useContext(ContextAPI);