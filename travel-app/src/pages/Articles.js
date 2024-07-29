import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './pagination';

function Articles() {
  const [journals, setJournals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const getJournals = async (url) => {
      try {
        const response = await axios.get(url);
        setJournals(response.data);
      } catch (error) {
        console.log("Error Fetching Data ", error);
      }
    };

    getJournals("https://travel-journal-e56a9-default-rtdb.europe-west1.firebasedatabase.app/trips.json");
  }, []);

  // Calculate the current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJournals = journals.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="articles-container">
        {currentJournals.map((journal, index) => (
          <div key={index} className="journal-card">
            <h2>{journal.title}</h2>
            <h3>{journal.location}</h3>
            <p>{journal.description.slice(0, 150) + "..."}</p>
            <img src={journal.photo} alt="places" />
            <Link to={`/journal/${journal.id}`}>
              <button className="read-more">Read More</button>
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(journals.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Articles;
