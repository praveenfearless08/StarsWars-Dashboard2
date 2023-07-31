import React from "react";
import close from "../../Assets/close.png";
import viewImg from "../../Assets/view-img.png";

const ViewDropdown = ({
  movie,
  closeViewToggle,
  main_title,
  title_first,
  title_first_value,
  title_second,
  title_second_value,
  title_third,
  title_third_value,
}) => {
  return (
    <div className="view-container">
      <div className="top-view-container">
        <div className="detail-container">
          <h2>{main_title}</h2>
          <img src={close} alt="" onClick={closeViewToggle} />
        </div>
      </div>
      <div className="mid-view-container">
        <div className="mid-detail-container">
          <div className="img-div">
            <p>Image</p>
            <img src={viewImg} alt="" />
          </div>
          <div className="title-div">
            <p>{title_first}</p>
            <div className="title-container">{title_first_value}</div>
          </div>
          <div className="crawl-div">
            <p>{title_second}</p>
            <div className="crawl-container">{title_second_value}</div>
          </div>
          <div className="genre-div">
            <p>{title_third}</p>
            <div className="genre-container">{title_third_value}</div>
          </div>
        </div>
      </div>
      <div className="bottom-view-container">
        <button className="close-button" onClick={closeViewToggle}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewDropdown;
