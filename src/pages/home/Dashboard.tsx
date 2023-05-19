import React, { useEffect, useState } from 'react';
import '../../App.scss';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Modal } from '../../components';

const Dashboard = () => {
  const { token, setToken } = React.useContext(AuthContext);
  const [books, setBooks] = useState<any>([]);
  const [editingBook, setEditingBook] = useState<any | File>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);

  const [showModal, setShowModal] = useState(false);

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  // AFTER ONE TIME RELOADING THE DATA, BOOKS WERE NOT ACCESSING THE TOKEN CUZ OF CONTEXT.
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
          `http://assignment.cyberboxer.com/books/list/${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.total, 'search length');
        setBooks(response.data.data);
        setTotalPages(parseInt(response.data.total));
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, [token, books, page]);
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

      // ie BOOK ID 85 !== 85 IT'S FALSE , so except this every ture values will be there
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
      // setBooks(response.data);
      const imageUrl = response.data.data.image;
      console.log(imageUrl);

      // Update the book data in the state
      const updatedBooks = books.map((b: any) => {
        if (b.id === book.id) {
          console.log(b, 'b');
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  // TO CONVERT THE LENGTH INTO AN ARRAY FOR PAGINATION WORK
  const paginationArray = [];
  for (let i = 1; i <= totalPages - 430; i++) {
    paginationArray.push(i);
  }

  // LOADING THE CONTENT
  if (!books) {
    return <p>Trying to fetch the data...</p>;
  }

  return (
    <>
      <div className='dashboard'>
        <div className='items-here'>
          <div className='pagination'>
            <div className='page-buttons'>
              {paginationArray.map((el: any, id: number) => {
                return (
                  <button className='p-btn' key={id}>
                    <div
                      className='all-btns'
                      onClick={(e) => handlePageChange(el)}
                    >
                      {el}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className='current-page'> page-no: {page}</div>
          </div>
          {books &&
            books.map((el: any, id: number) => {
              const { name, image, author } = el;
              return (
                <div className='list' key={id}>
                  <div className='title'>
                    <div className='bookImg'>
                      <img src={image} alt='Book cover' />
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
        </div>
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
                      type='file'
                      value={``}
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
