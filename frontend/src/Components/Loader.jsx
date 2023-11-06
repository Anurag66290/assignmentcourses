import React from "react";
import { SyncLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        height: "90vh",
      }}
    >
      <SyncLoader color="#36d7b7" style={{ display: "inline-block" }} />
    </div>
  );
};

export default Loader;
