import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const PasswordResetForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:8080/api/password-reset/reset-password-request";
      await axios.post(url, { email });
      setMessage("Password reset email sent successfully");
    } catch (error) {
      setMessage("Error sending password reset email");
    }
  };

  return (
    <div className={styles.password_reset_form}>
      <form onSubmit={handleSubmit}>
        <h2>Password Reset</h2>
        <p>Enter your email to receive a password reset link.</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <div className={styles.button_container}>
          <button type="submit" className={styles.green_btn}>
            Send Reset Email
          </button>
          <Link to="/">
          <button type="button" onClick={onClose} className={styles.white_btn}>
            Close
          </button>
          </Link>
        </div>
        {message && <div className={styles.message}>{message}</div>}
      </form>
    </div>
  );
};

export default PasswordResetForm;
