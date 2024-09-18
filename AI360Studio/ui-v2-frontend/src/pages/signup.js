import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/signup.module.css";
import loaderStyles from "../styles/loader.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!username || !password || !confirmPassword || !email) {
      toast.error("Please enter the following fields.");
      return;
    }

    if (password !== confirmPassword) {
      
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup/`,
        {
          username: username,
          email: email,
          password: password,
          confirm_password: confirmPassword,
          role: "user",
        }
      );

      // Handle successful signup
      console.log(response.data);
      router.push("/?signup=success");
      // Redirect to login page
      router.push("/");
    } catch (error) {
      // Handle error
     
      if (error.response && error.response.data) {
        const errorMessages = error.response.data;
        for (const key in errorMessages) {
          if (errorMessages.hasOwnProperty(key)) {
            errorMessages[key].forEach((message) => {
              toast.error(message);
            });
          }
        }
      } else {
        toast.error("Signup failed. Please check your input.");
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.form}>
        <div className={styles.iconContainer}>
          <img src="logo.png" alt="Signup Icon" className={styles.icon} />
        </div>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            className={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? <div className={loaderStyles.loader}></div> : "Signup"} 
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.loginLink}>
          <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
