import { useEffect, useState } from "react";

export default function useSnackbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
  }, [isOpen]);

  const openSnackbar = (msg = "Something went wrong...", severity) => {
    setMessage(msg);
    setIsOpen(true);
    if (severity) {
      setSeverity(severity);
    } else {
      setSeverity("");
    }
  };

  return { isOpen, message, severity, openSnackbar };
}
