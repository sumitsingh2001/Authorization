import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './style.scss';
import { AuthContext } from '../../context/AuthContext';
// import { BookContext } from '../../context/BookContext';
import { FaPlus } from 'react-icons/fa';

interface Book {
  name: string;
  author: string;
  image?: string;
}

const NewBook = () => {
  const [book, setBook] = useState<Book | null>(null);
  const { token } = useContext(AuthContext);
  // const { bookId } = useContext(BookContext);

  const BOOKID = localStorage.getItem('bookID');
  console.log(BOOKID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://assignment.cyberboxer.com/books/book/${BOOKID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBook(response.data.data);
        console.log(response.data.data, '-- My response');
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [BOOKID, token]);

  return (
    <>
      <div className='listss'>
        <h6>Get Your last created book here</h6>
        {book && (
          <>
            <div className='lit'>
              <div className='align'>
                {book.image ? (
                  <img src={book.image} alt='' />
                ) : (
                  <span className='icon'>
                    <FaPlus />
                  </span>
                )}
              </div>
              <div className='data'>
                <div>Book-name:- {book.name}</div>
                <div>Author-name:-{book.author}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NewBook;
