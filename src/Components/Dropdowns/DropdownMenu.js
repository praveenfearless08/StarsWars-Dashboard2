import React from "react";
import view from "../../Assets/view.png";
import download from "../../Assets/download.png";
import rename from "../../Assets/rename.png";
import share from "../../Assets/share.png";
import copy from "../../Assets/copy.png";
import del from "../../Assets/delete.png";
import DeleteDropdown from "./DeleteDropdown";

const DropdownMenu = ({
  movie,
  index,
  openViewToggle,
  openDeleteToggle,
  handleDelete,
  deleteToggleIndex,
  deleteToggleVisible,
  closeDeleteToggle,
}) => {
  return (
    <>
      <div className="dropdown-menu">
        <div className="single-dropdown" onClick={() => openViewToggle(index)}>
          <img src={view} alt="" /> <p>View</p>
        </div>
        <div className="single-dropdown">
          <img src={download} alt="" /> <p>Download</p>
        </div>
        <div className="single-dropdown">
          <img src={rename} alt="" /> <p>Rename</p>
        </div>
        <div className="single-dropdown">
          <img src={share} alt="" /> <p>Share</p>
        </div>
        <div className="single-dropdown">
          <img src={copy} alt="" /> <p>Move</p>
        </div>
        <div
          className="single-dropdown"
          onClick={() => openDeleteToggle(index)}
        >
          <img src={del} alt="" /> <p className="last-p">Delete</p>
        </div>
      </div>
      {deleteToggleIndex === index && deleteToggleVisible && (
        <DeleteDropdown
          handleDelete={handleDelete}
          movie={movie}
          closeDeleteToggle={closeDeleteToggle}
          index={index}
        />
      )}
    </>
  );
};

export default DropdownMenu;
