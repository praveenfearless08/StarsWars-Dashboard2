import React from "react";
import alert from "../../Assets/alert.png";

const DeleteDropdown = ({ index, movie, closeDeleteToggle, handleDelete }) => {
  return (
    <div className="delete-box">
      <div className="delete-top-box">
        <img src={alert} alt="" />
        <div>
          {" "}
          <h2>Caution!</h2>
          <p>
            Are you sure you want to Delete <span>{movie}</span>{" "}
          </p>
        </div>
      </div>
      <div className="delete-bottom-box">
        <button className="cancel-button" onClick={closeDeleteToggle}>
          Cancel
        </button>
        <button className="confirm-button" onClick={() => handleDelete(index)}>
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteDropdown;
