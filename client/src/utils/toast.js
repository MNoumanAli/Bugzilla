import { toast } from "react-toastify";

export const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000, // Automatically close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const notifyError = (error) => {
  toast.error(error, {
    position: "top-center",
    autoClose: 2000, // Automatically close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
