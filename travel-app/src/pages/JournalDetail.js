import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentSection from './commentSection';


function JournalDetail() {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await axios.get(`https://travel-journal-e56a9-default-rtdb.europe-west1.firebasedatabase.app/trips/${id}.json`);
        setJournal(response.data);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };

    fetchJournal();
  }, [id]);

  if (!journal) return <div className="loading">Loading...</div>;

  return (
    <div className="journal-detail">
      <div className="journal-container">
        <h1 className="journal-title">{journal.title}</h1>
        <h2 className="journal-location">{journal.location}</h2>
        <img className="journal-image" src={journal.photo} alt={journal.title} />
        <p className="journal-description">{journal.description}</p>
      </div>
      <div>
        <CommentSection/>
      </div>
    </div>
  );
}

export default JournalDetail;
