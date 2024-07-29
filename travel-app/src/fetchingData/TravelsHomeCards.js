import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TravelsList = () => {
  const [travels, setTravels] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-e56a9-default-rtdb.europe-west1.firebasedatabase.app/trips.json"
        );
        const data = response.data;
        const limitedData = Object.keys(data)
          .slice(0, 5)
          .map((key) => data[key]);
        setTravels(limitedData);
      } catch (error) {
        console.error("Error while fetching data", error);
      }
    };

    fetchTravels();
  }, []);

  const cardStyle = {
    border: "5px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    textAlign: "center",
    backgroundColor: "#F1DDC5",
    transition: "all 0.3s ease-in-out",
  };

  const hoverCardStyle = {
    ...cardStyle,
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.05)",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const h1 = {
    textAlign: "center",
    margin: "0",
    padding: "50px",
  };

  const button = {
    backgroundColor: "#c60d30",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
  };

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  return (
    <div>
      <h1 style={h1}>Most Popular Articles</h1>
      <div style={containerStyle}>
        {travels.map((travel, index) => (
          <div
            key={index}
            style={hoveredIndex === index ? hoverCardStyle : cardStyle}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <h3>{travel.location}</h3>
            <p>{travel.description.slice(0, 160) + "..."}</p>
            <button onClick={() => navigate("/articles")} style={button}>
              View More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelsList;
