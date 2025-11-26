import { createPortal } from "react-dom"
import { useContextAPI } from "../ContextAPI"
import '../AddBookmark/AddBookmark.css'
import { useEffect, useState } from "react";

const EditBookmark = () => {

  const { handleSaveEdit, showEditBookmark, setShowEditBookmark, editingBookmark } = useContextAPI();

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    tags: '',
  });

  useEffect(() => {
    if (editingBookmark) {
      setFormData({
        title: editingBookmark.title || '',
        url: editingBookmark.url || '',
        description: editingBookmark.description || '',
        tags: Array.isArray(editingBookmark.tags) ? editingBookmark.tags.join(', ') : (editingBookmark.tags || ''),
      })
    }
  }, [editingBookmark])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.url.trim()) {
      alert("Title and URL are required");
      return;
    }

    // convert comma-separated string to array
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const editedBookmark = {
      ...editingBookmark,
      title: formData.title.trim(),
      url: formData.url.trim(),
      description: formData.description.trim(),
      tags: tagsArray,
    }

    handleSaveEdit(editedBookmark);
    setShowEditBookmark(false);
  }

  if (!showEditBookmark || !editingBookmark) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className='add-bookmark'>
        <h2>Edit bookmark</h2>
        <form className='bookmark-form' onSubmit={handleSubmit}>
          <input
            type="text"
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Title'
          />
          <input
            type="text"
            name='url'
            value={formData.url}
            onChange={handleChange}
            placeholder='URL'
          />
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Description'>
          </textarea>
          <input
            type="text"
            name='tags'
            value={formData.tags}
            onChange={handleChange}
            placeholder='Tags'
          />

          <div className="form-controls">
            <span onClick={() => setShowEditBookmark(false)} className='cancel-btn'>Cancel</span>
            <button type="submit" className='save-btn'>Save bookmark</button>
          </div>

        </form>
      </div>
    </div>,
    document.body
  )
}

export default EditBookmark