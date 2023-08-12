import React, { ChangeEvent, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ListEditor = ({
  title,
  handleChangeTitle,
  deleteList,
  saveList,
  onClickOutside,
}: {
  title: string;
  handleChangeTitle: any;
  deleteList?: any;
  onClickOutside: any;
  saveList: any;
}) => {
  const ref = useRef<any>();

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
    <div className="w-70" ref={ref}>
      <TextareaAutosize
        autoFocus
        className="overflow-y-auto max-h-24 overflow-x-hidden w-full resize-none"
        placeholder="Enter list title..."
        value={title}
        onChange={handleChangeTitle}
        onBlur={(e) => {
          if (!e.target.value) {
            onClickOutside();
          } else {
            saveList();
          }
        }}
      />
      {deleteList && (
        <div onClick={deleteList} className="w-fit">
          delete
        </div>
      )}
    </div>
  );
};

export default ListEditor;
