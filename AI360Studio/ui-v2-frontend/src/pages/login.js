import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import styles from "../styles/login.module.css";
import loaderStyles from "../styles/loader.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getMidnightExpirationInNepalTime from "@/lib/utils/nepali_midnight_date";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.signup === "success") {
      toast.success("Signup successful! Please log in.");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`,
        {
          username,
          password,
        }
      );

      const token = response.data.access;
      const decodedToken = jwtDecode(token);
      // Extract role and user_id from the token
      const { role } = decodedToken;
 
      // Store role and user_id in cookies
      const expiration = getMidnightExpirationInNepalTime();
      // Cookies.set("role", role, { expires: expiration }); // Cookie expires in expiration days
      // Cookies.set("user_id", user_id, { expires: expiration });
      Cookies.set("auth_jwt_token", token, { expires: expiration });
 
      // Redirect based on role
      if (token && role === "admin") {
        router.push("/executive-dashboard?login=success");
      } else if (token && role === "user") {
        router.push("/user-dashboard?login=success");
      }
    } catch (error) {
      // Handle error
      toast.error("Login failed. Please check your credentials.");

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.form}>
        <div className={styles.iconContainer}>
          <img src="logo.png" alt="Login Icon" className={styles.icon} />
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? <div className={loaderStyles.loader}></div> : "Login"}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.signupLink}>
          Not registered? <Link href="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
