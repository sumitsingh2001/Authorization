import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BookContext } from '../../context/BookContext';
import './style.scss';

const saveData = async (data: any) => {
  try {
    await axios.post('http://assignment.cyberboxer.com/books/save', data);
    // const updatedBooks = JSON.parse(localStorage.getItem('books') || '[]');
    // updatedBooks.push(data);
    // localStorage.setItem('books', JSON.stringify(updatedBooks));
  } catch (error) {
    console.log(error);
  }
};

const Form = () => {
  const { setBookId } = useContext(BookContext);
  const { token } = useContext(AuthContext);
  const [bookName, setBookName] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [image, setImage] = useState<File>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    const formData = new FormData();
    formData.append('name', bookName);
    formData.append('author', bookAuthor);
    image && formData.append('image', image);

    try {
      const response = await axios.post(
        'http://assignment.cyberboxer.com/books/save',
        formData,
        {
          headers: headers,
        }
      );
      console.log(response.data.message);
      console.log(response.data.data);
      saveData(response.data.data);
      setBookId(response.data.data.id);

      localStorage.setItem('bookID', response.data.data.id);

      // setBooks((updatedBooks: any) => [...updatedBooks, response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='form_cont'>
        <h3>Add Your Books here</h3>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className='file_sec'>
            <label htmlFor='file'>select Your files</label>
            <input
              type='file'
              onChange={(e) => {
                e.target.files && setImage(e.target.files[0]);
              }}
              accept='image/*'
            />
          </div>
          <input
            type='text'
            placeholder='Book Name'
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Book Author'
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
          />
          <input type='submit' value='submit' />
        </form>
      </div>
    </>
  );
};

export default Form;
