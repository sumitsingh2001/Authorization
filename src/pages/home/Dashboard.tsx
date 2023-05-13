import React, { useEffect, useState } from 'react';
import '../../App.scss';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
  const { token, setToken } = React.useContext(AuthContext);
  const [books, setBooks] = useState<any>([]);

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
                  <div className='edit'>Edit</div>
                  <div className='delete' onClick={() => handleDelete(el.id)}>
                    Delete
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Dashboard;
