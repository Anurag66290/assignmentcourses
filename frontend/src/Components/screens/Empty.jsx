import React from "react";

const Empty = ({ msg }) => {
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        height: "90vh",
      }}
    >
      <div class="alert alert-info alert-has-icon w-100">
        <div class="alert-icon">
          <i class="far fa-lightbulb"></i>
        </div>
        <div class="alert-body">
          <div class="alert-title">Empty List</div>
          {msg}
        </div>
      </div>
    </div>
  );
};

export default Empty;
