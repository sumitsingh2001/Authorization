import React, { useEffect, useState } from 'react';
import '../../App.scss';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Modal } from '../../components';

const Dashboard = () => {
  const { token, setToken } = React.useContext(AuthContext);
  const [books, setBooks] = useState<any>([]);
  const [editingBook, setEditingBook] = useState<any | File>(null);

  const [showModal, setShowModal] = useState(false);

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

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
        // console.log(response.data.data);
        setBooks(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, [token]);
  // console.log(books, 'books');
  // console.log(token, 'accessed token');

  //DELETING THE SELECTED ID
  const handleDelete = async (id: number) => {
    console.log('id to delete:', id);
    // console.log('index:', index);
    const deleteData = new FormData();
    deleteData.append('id', `${id}`);
    try {
      const response = await axios.post(
        `http://assignment.cyberboxer.com/books/delete/${id}`,
        deleteData,
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
      console.log(updatedBooks, 'ondelete');

      // setBooks(updatedBooks);
    } catch (error) {
      console.log(error);
    }
  };

  //
  const handleUpdate = async (book: any) => {
    console.log(book.id);

    const formData = new FormData();
    formData.append('name', book.name);
    formData.append('author', book.author);
    formData.append('id', book.id);
    book.image && formData.append('image', book.image);

    try {
      const response = await axios.post(
        `http://assignment.cyberboxer.com/books/update/${book.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      console.log(response.data);

      // Update the book data in the state
      const updatedBooks = books.map((b: any) => {
        if (b.id === book.id) {
          return {
            ...b,
            name: book.name,
            id: book.id,
            author: book.author,
            image: book.image,
          };
        }
        return b;
      });
      setBooks(updatedBooks);
      // updateDataSave(updatedBooks);
      console.log(updatedBooks, 'onupdate');

      // Clear the editing book state
      setEditingBook(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (editingBook && showModal) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'scroll';
  }

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
                  <div
                    className='edit'
                    onClick={() => {
                      setEditingBook(el);
                      handleShowModal();
                    }}
                  >
                    Edit
                  </div>
                  <div className='delete' onClick={() => handleDelete(el.id)}>
                    Delete
                  </div>
                </div>
              </div>
            );
          })}
        {editingBook && showModal && (
          <Modal onClose={handleCloseModal}>
            <div className='getInput'>
              <div className='edit-form'>
                <h3>Edit Book</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(editingBook);
                  }}
                >
                  <div>
                    <label>Book Name</label>
                    <input
                      type='text'
                      value={editingBook.name}
                      onChange={(e) =>
                        setEditingBook({ ...editingBook, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label>Book Author</label>
                    <input
                      type='text'
                      value={editingBook.author}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          author: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>Image</label>
                    <input
                      type='text'
                      value={editingBook.image}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          image: e.target.files && e.target.files[0],
                        })
                      }
                    />
                  </div>
                  <div className='buttons_save'>
                    <button type='submit'>Save</button>
                    <button onClick={() => setEditingBook(null)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Dashboard;
