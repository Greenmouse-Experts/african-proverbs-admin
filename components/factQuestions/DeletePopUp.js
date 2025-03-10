import { Alert } from "@/components/UIElements";
import { useDispatch, useSelector } from "react-redux";

const DeletePopup = ({ onClose, onConfirm }) => {
  const { _, msg } = useSelector((state) => state.auth);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "10000",
      }}
    >
      <div
        className="card p-2 delete-popup"
        style={{
          width: "400px",
          backgroundColor: "#FFF",
          border: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {msg ? <Alert payload={msg} /> : null}
        <p>
          Are You Sure You Want To Delete This Question?, this action cannot be
          undone.
        </p>
        <button onClick={onConfirm} className="btn  btn-outline-danger btn-sm">
          Yes
        </button>
        <button
          onClick={() => onClose()}
          className=" btn mt-2 btn-outline-success btn-sm"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
