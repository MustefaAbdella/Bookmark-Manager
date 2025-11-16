import React, { useState } from 'react'
import './AddBookmark.css'
import { createPortal } from 'react-dom'
import { useContextAPI } from '../ContextAPI'

const AddBookmark = () => {

  const { addBookmark, setShowAddBookmark } = useContextAPI();

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    tags: ''
  })

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

    addBookmark({ ...formData, tags: tagsArray });

    // reset form
    setFormData({
      title: '',
      url: '',
      description: '',
      tags: ''
    });
  }

  const handleCancel = () => {
    setShowAddBookmark(false);
    setFormData({
      title: '',
      url: '',
      description: '',
      tags: ''
    })
  }

  return createPortal(
    <div className="modal-overlay">
      <div className='add-bookmark'>
        <h2>Add a new bookmark</h2>
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
            <span onClick={handleCancel} className='cancel-btn'>Cancel</span>
            <button type="submit" className='save-btn'>Save bookmark</button>
          </div>

        </form>
      </div>
    </div>,
    document.body
  )
}

export default AddBookmark