import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "../editButtons";

const CardEditor = (props: any) => {
  const { onSave, onCancel, onDelete, adding } = props;
  const [text, setText] = useState(props.text || "");
  const [description, setDescription] = useState(props.description || "");

  const handleChangeText = (event: any) => {
    setText(event.target.value);
  };
  const handleChangeDescription = (event: any) => {
    setDescription(event.target.value);
  };

  const onEnter = (e: any) => {
    if (e.keyCode === 13) {
      if (text.trim() && description.treim()) {
        e.preventDefault();
        onSave(text, description);
      }
    }
  };

  return (
    <div className="Edit-Card">
      <div className="">
        <TextareaAutosize
          autoFocus
          className="resize-none w-full overflow-y-auto max-h-24"
          placeholder={text || "title"}
          value={text}
          onChange={handleChangeText}
          onKeyDown={onEnter}
          maxLength={200}
        />
        <TextareaAutosize
          className="resize-none w-full overflow-y-auto max-h-32"
          placeholder={description || "description"}
          value={description}
          onChange={handleChangeDescription}
          onKeyDown={onEnter}
          maxLength={600}
        />
      </div>
      <EditButtons
        handleSave={() => onSave(text, description)}
        saveLabel={adding ? "Add card" : "Save"}
        handleDelete={onDelete}
        handleCancel={onCancel}
      />
    </div>
  );
};

export default CardEditor;
