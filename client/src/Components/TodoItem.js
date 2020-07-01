import React from "react";

const TodoItem = (props) => {
  return (
    <>
      <li className="d-flex justify-content-between list-group-item">
        {props.todo.name}
        <button className={props.only ? "btn btn-danger" : "btn btn-warning"}>
          Remove
        </button>
      </li>
    </>
  );
};

export default TodoItem;
