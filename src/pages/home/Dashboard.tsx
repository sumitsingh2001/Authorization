import React, { useEffect, useState } from 'react';
import '../../App.scss';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
  const { token, setToken } = React.useContext(AuthContext);
  const [books, setBooks] = useState<any>([]);
  const [editingBook, setEditingBook] = useState<any>(null);

  // AFTER ONE TIME RELOADING THE DATA, BOOKS WERE NOT ACCESSING THE TOKEN.
  useEffect(() => {
    const storedToken = localStorage.getItem('login');
    if (storedToken !== null) {
      setToken(JSON.parse(storedToken).token);
    }
  }, [setToken]);

  // GETTING THE API AND ADDING THE ACCESSED TOKEN IN THAT
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          'http://assignment.cyberboxer.com/books/list',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setBooks(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, [token]);
  console.log(books, 'books');
  console.log(token, 'accessed token');

  //DELETING THE SELECTED ID
  const handleDelete = async (id: number) => {
    console.log('id to delete:', id);
    // console.log('index:', index);

    try {
      const response = await axios.post(
        `http://assignment.cyberboxer.com/books/delete/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);

      // GIVEN ID AND BOOK ID IF MATCHED, IT'LL BE SELECTED TO FILTER OUT.//! ie BOOK ID 85 !== 85 IT'S FALSE !!
      const updatedBooks = books.filter((book: any) => book.id !== id);
      setBooks(updatedBooks);

      // setBooks(updatedBooks);
    } catch (error) {
      console.log(error);
    }
  };

  //
  const handleUpdate = async (book: any) => {
    try {
      const response = await axios.post(
        `http://assignment.cyberboxer.com/books/update/${book.id}`,
        {
          name: book.name,
          author: book.author,
          image: book.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);

      // Update the book data in the state
      const updatedBooks = books.map((b: any) => {
        if (b.id === book.id) {
          return {
            ...b,
            name: book.name,
            author: book.author,
            image: book.image,
          };
        }
        return b;
      });
      setBooks(updatedBooks);

      // Clear the editing book state
      setEditingBook(null);
    } catch (error) {
      console.log(error);
    }
  };

  // LOADING THE CONTENT
  if (!books) {
    return <p>Trying to fetch the data...</p>;
  }

  return (
    <>
      <div className='dashboard'>
        {books &&
          books.map((el: any, id: number) => {
            const { name, image, author } = el;
            return (
              <div className='list' key={id}>
                <div className='title'>
                  <div className='bookImg'>
                    <img src={image} alt='' />
                  </div>
                  <div className='bookTitle'>
                    <span>{name}</span>
                    <span>{author} </span>
                  </div>
                </div>
                <div className='crud_btn'>
                  <div className='edit' onClick={() => setEditingBook(el)}>
                    Edit
                  </div>
                  <div className='delete' onClick={() => handleDelete(el.id)}>
                    Delete
                  </div>
                </div>
              </div>
            );
          })}
        {editingBook && (
          <div className='edit-form'>
            <h3>Edit Book</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editingBook);
              }}
            >
              <div>
                <label>Name</label>
                <input
                  type='text'
                  value={editingBook.name}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Author</label>
                <input
                  type='text'
                  value={editingBook.author}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, author: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Image</label>
                <input
                  type='text'
                  value={editingBook.image}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, image: e.target.value })
                  }
                />
              </div>
              <button type='submit'>Save</button>
              <button onClick={() => setEditingBook(null)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
