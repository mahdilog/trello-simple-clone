import React, { ChangeEvent, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "../editButtons";

interface CardEditorProps {
  onSave: (text: string, description: string) => Promise<void>;
  onCancel: () => void;
  onDelete?: () => void;
  adding?: boolean;
  cardText?: string;
  cardDescription?: string;
}

const CardEditor: React.FC<CardEditorProps> = ({
  onSave,
  onCancel,
  onDelete,
  adding,
  cardText,
  cardDescription,
}) => {
  const [text, setText] = useState(cardText || "");
  const [description, setDescription] = useState(cardDescription || "");

  const handleChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      if (text.trim() && description.trim()) {
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
