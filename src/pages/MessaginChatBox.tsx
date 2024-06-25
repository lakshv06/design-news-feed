import { ReactElement } from "react";
import { MessagingChatBoxDataProps } from "../interface/global.interfaces";
import { toast } from "react-toastify";

interface MessagingChatBoxProps extends MessagingChatBoxDataProps {
  isFocused: boolean;
  onClick: () => void;
}

function MessagingChatBox(props: MessagingChatBoxProps): ReactElement {
  const showSuccessToast = (): void => {
    toast.success("Chat will be cleared once we add APIs", {
      containerId: "toast-container-message",
    });
  };

  const { MessagingChatBoxData, isFocused, onClick } = props;
  return (
    <div
      className={`d-flex flex-column p-1 border ${
        isFocused ? "border-primary" : "border-secondary"
      } rounded-2`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex flex-row justify-content-between p-2">
        <div className="">
          <p>{MessagingChatBoxData.title}</p>
        </div>
        <div>
          <button
            className="btn btn-outline-danger"
            onClick={(e) => {
              e.stopPropagation();
              showSuccessToast();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessagingChatBox;
