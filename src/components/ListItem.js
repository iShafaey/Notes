import React from "react";
import { Link } from "react-router-dom";

let getTitle = (note) => {
  const title = note.body.split("\n")[0];
  if (title.length > 45) {
    return title.slice(0, 45);
  }
  return title;
};

let getTime = (note) => {
  return new Date(note.updated).toLocaleDateString();
};

const ListItem = ({ note }) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>{getTime(note)}</span>
        </p>
      </div>
    </Link>
  );
};

export default ListItem;
