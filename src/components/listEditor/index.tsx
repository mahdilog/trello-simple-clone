import React, { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ListEditor = ({
  title,
  handleChangeTitle,
  deleteList,
  saveList,
  onClickOutside,
}: any) => {
  const ref = useRef<any>();

  const onEnter = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      saveList();
    }
  };

  const handleClick = (e: any) => {
    const node: any = ref.current;

    if (node?.contains(e.target)) {
      return;
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, false);
    return () => {
      document.removeEventListener("click", handleClick, false);
    };
  }, []);

  return (
    <div className="List-Title-Edit" ref={ref}>
      <TextareaAutosize
        autoFocus
        className="List-Title-Textarea"
        placeholder="Enter list title..."
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
        style={{ width: deleteList ? 220 : 245 }}
        onBlur={(e) => {
          if (!e.target.value) {
            onClickOutside();
          } else {
            saveList();
          }
        }}
      />
      {deleteList && <div onClick={deleteList}>delete</div>}
    </div>
  );
};

export default ListEditor;
