import React from "react";
import Board from "./components/board";

const App = () => {
  return (
    <div className="bg-blue-500 h-screen">
      <div className="bg-blue-300 h-14 flex justify-center items-center">
        <p className="font-medium text-lg">React Trello Clone</p>
      </div>
      <Board />
    </div>
  );
};

export default App;
