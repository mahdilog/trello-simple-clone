import React, { useState } from "react";
import { connect } from "react-redux";
import ListEditor from "../listEditor";
import { v4 } from "uuid";

const AddList = ({ toggleAddingList, dispatch }: any) => {
  const [title, setTitle] = useState("");

  const handleChangeTitle = (e: any) => setTitle(e.target.value);

  const createList = async () => {
    toggleAddingList();

    dispatch({
      type: "ADD_LIST",
      payload: { listId: v4(), listTitle: title },
    });
  };

  return (
    <div className="Add-List-Editor">
      <ListEditor
        title={title}
        handleChangeTitle={handleChangeTitle}
        onClickOutside={toggleAddingList}
        saveList={createList}
      />
    </div>
  );
};

export default connect()(AddList);
