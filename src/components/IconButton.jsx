import { FaRegTrashCan } from "react-icons/fa6";

const IconButton = ({ handleClick }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      <FaRegTrashCan />
    </button>
  );
};

export default IconButton;
