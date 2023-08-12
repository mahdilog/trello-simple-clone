import React from "react";

const EditButtons = ({
  handleSave,
  saveLabel,
  handleDelete,
  handleCancel,
}: {
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  saveLabel: string;
  handleDelete?: () => void;
}) => (
  <div className="Edit-Buttons">
    <div
      tabIndex={0}
      className="Edit-Button"
      style={{ backgroundColor: "#5aac44" }}
      onClick={handleSave}
    >
      {saveLabel}
    </div>
    {handleDelete && (
      <div
        tabIndex={0}
        className="Edit-Button"
        style={{ backgroundColor: "#EA2525", marginLeft: 0 }}
        onClick={handleDelete}
      >
        Delete
      </div>
    )}
    <div tabIndex={0} className="Edit-Button-Cancel" onClick={handleCancel}>
      X
    </div>
  </div>
);

export default EditButtons;
