import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function useAuth() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get("/api/auth")
      .then(() => {
        setAuthed(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (location.pathname === "/dashboard") {
          navigate(-1);
        }
      });
  }, [navigate, location.pathname]);

  return {
    authed,
    loading,
    login(email, password) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/login", { email, password })
          .then((res) => {
            setAuthed(true);
            resolve(res.data);
          })
          .catch((err) => {
            setAuthed(false);
            reject(err.response.data);
          });
      });
    },
    logout() {
      return new Promise((resolve) => {
        axios.delete("/api/logout").then(() => {
          setAuthed(false);
          navigate("/");
          resolve();
        });
      });
    },
  };
}
