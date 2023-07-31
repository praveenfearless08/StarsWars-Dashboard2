import React, { useEffect, useState } from "react";
import Viewlist from "../../Assets/Viewlist.png";
import Viewgrid from "../../Assets/Viewgrid.png";
import FilmReel from "../../Assets/FilmReel.png";
import more from "../../Assets/more.png";
import loadingIcon from "../../Assets/loading.png";
import ViewDropdown from "../../Components/Dropdowns/ViewDropdown";
import DropdownMenu from "../../Components/Dropdowns/DropdownMenu";

const Films = () => {
  const [expandedGrid, setExpandedGrid] = useState(false);
  const [expandedList, setExpandedList] = useState(true);
  const [movies, setMovies] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [loading, setLoading] = useState(false);
  // State to handle dropdown visibility for each movie
  const [dropdownVisible, setDropdownVisible] = useState([]);

  const [deleteToggleVisible, setDeleteToggleVisible] = useState(false);
  const [deleteToggleIndex, setDeleteToggleIndex] = useState(null);

  const [viewToggleVisible, setViewToggleVisible] = useState(false);
  const [viewToggleIndex, setViewToggleIndex] = useState(null);

  // Function to open the view toggle for a specific movie
  const openViewToggle = (index) => {
    setViewToggleVisible(true);
    setViewToggleIndex(index);
  };

  // Function to close the view toggle
  const closeViewToggle = () => {
    setViewToggleVisible(false);
    setViewToggleIndex(null);
  };

  // Function to open the delete toggle for a specific movie
  const openDeleteToggle = (index) => {
    setDeleteToggleVisible(true);
    setDeleteToggleIndex(index);
  };

  // Function to close the delete toggle
  const closeDeleteToggle = () => {
    setDeleteToggleVisible(false);
    setDeleteToggleIndex(null);
  };

  // Function to handle the actual deletion of the movie
  const handleDelete = (index) => {
    // Perform the deletion here (e.g., remove the movie from the movies array)
    const updatedMovies = [...movies];
    updatedMovies.splice(index, 1);
    setMovies(updatedMovies);

    // Close the delete toggle after deletion
    closeDeleteToggle();
  };

  // Function to toggle dropdown visibility for a specific movie
  const toggleDropdown = (index) => {
    setDropdownVisible((prevVisible) => {
      const updatedVisible = [...prevVisible];
      updatedVisible[index] = !updatedVisible[index];
      return updatedVisible;
    });
  };

  useEffect(() => {
    // Fetch all movies from SWAPI only if movies state is empty
    if (movies.length === 0) {
      setLoading(true);
      fetch("https://swapi.dev/api/films/")
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
          setLoading(false);
          console.log(data.results);

          // Calculate the filmLength after movies are fetched
          const filmLength = data.results.length;

          // Fetch random images from Picsum (You can adjust width and height as needed)
          const fetchRandomImages = async () => {
            const imagePromises = Array.from(
              { length: filmLength },
              (_, index) =>
                fetch(`https://picsum.photos/400/300?random=${index}`)
                  .then((response) => response.url)
                  .catch((error) =>
                    console.error("Error fetching random image:", error)
                  )
            );
            const images = await Promise.all(imagePromises);
            setRandomImages(images);
          };
          fetchRandomImages();
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, [movies]);

  const handleGridClick = () => {
    setExpandedGrid(true);
    setExpandedList(false);
  };

  const handleListClick = () => {
    setExpandedList(true);
    setExpandedGrid(false);
  };

  return (
    <div className="main-container">
      <div className="top-container">
        <h2>Films</h2>
        <div className="toggle-container">
          <button
            className={`toggle-button ${expandedGrid ? "active" : ""} btn1`}
            onClick={handleGridClick}
          >
            <span className={`icon ${expandedGrid ? "show-text" : ""}`}>
              <img src={Viewgrid} alt="" />
            </span>
            {expandedGrid && "Grid"}
          </button>
          <button
            className={`toggle-button ${expandedList ? "active" : ""} btn2`}
            onClick={handleListClick}
          >
            <span className={`icon ${expandedList ? "show-text" : ""}`}>
              <img src={Viewlist} alt="" />
            </span>
            {expandedList && "List"}
          </button>
        </div>
      </div>
      {loading ? (
        <div className="loading-container">
          <img
            src={loadingIcon}
            alt="Loading..."
            className={`rotate ${loading ? "loading" : ""}`}
          />
        </div>
      ) : expandedGrid ? (
        <div className="card-content">
          <div className="flex-container">
            {movies.map((movie, index) => (
              <div className="main-card" key={index}>
                <div className="card-img">
                  {randomImages[index] && (
                    <img src={randomImages[index]} alt={`Random ${index}`} />
                  )}
                </div>
                <div className="card-info">
                  <div className="left-info">
                    <img src={FilmReel} alt="" />
                    <p>{movie.title}</p>
                  </div>
                  <div className="right-info">
                    <img
                      src={more}
                      alt=""
                      onClick={() => toggleDropdown(index)}
                    />
                    {dropdownVisible[index] && (
                      <DropdownMenu
                        movie={movie.title}
                        index={index}
                        openViewToggle={openViewToggle}
                        openDeleteToggle={openDeleteToggle}
                        handleDelete={handleDelete}
                        closeDeleteToggle={closeDeleteToggle}
                        deleteToggleIndex={deleteToggleIndex}
                        deleteToggleVisible={deleteToggleVisible}
                      />
                    )}
                    {viewToggleIndex === index && viewToggleVisible && (
                      <ViewDropdown
                        main_title={"Films Details"}
                        title_first={"Title"}
                        title_first_value={movie.title}
                        title_second={"Director"}
                        title_second_value={movie.director}
                        title_third={"Release Date"}
                        title_third_value={movie.release_date}
                        closeViewToggle={closeViewToggle}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="list-container">
          <div className="header-list">
            <p>Name</p>
            <p>Director</p>
            <p>Release Date</p>
            <p></p>
          </div>
          <div className="single-list-container">
            {movies.map((movie, index) => (
              <div className="main-list" key={index}>
                <div className="left-list">
                  <img src={FilmReel} alt="" />
                  {movie.title.slice(0, 8)}
                </div>
                <p>{movie.director.slice(0, 8)}</p>
                <p>{movie.release_date}</p>
                <img src={more} alt="" onClick={() => toggleDropdown(index)} />
                {dropdownVisible[index] && (
                  <DropdownMenu
                    movie={movie.title}
                    index={index}
                    openViewToggle={openViewToggle}
                    openDeleteToggle={openDeleteToggle}
                    handleDelete={handleDelete}
                  />
                )}
                {viewToggleIndex === index && viewToggleVisible && (
                  <ViewDropdown
                    main_title={"Films Details"}
                    title_first={"Title"}
                    title_first_value={movie.title}
                    title_second={"Director"}
                    title_second_value={movie.director}
                    title_third={"Release Date"}
                    title_third_value={movie.release_date}
                    closeViewToggle={closeViewToggle}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Films;
