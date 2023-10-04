import React from "react";
import Board from "./components/board";

const App = () => {
  return (
    <div
      className="overflow-x-auto min-w-full h-screen w-max"
      style={{
        background: "url(/assets/images/car.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-blue-300 h-14 flex justify-center items-center ">
        <p className="font-medium text-lg">React Trello Clone</p>
      </div>
      <div className="w-max">
        <Board />
      </div>
    </div>
  );
};

export default App;
