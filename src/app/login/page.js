'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  // Function to get CSRF token before login
  const getCSRFToken = async () => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true, // Important to send and receive cookies (session)
      });
    } catch (error) {
      console.error("Error getting CSRF token", error);
      setError("Unable to retrieve CSRF token");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get CSRF token first to initiate session (only need to do this once per session)
    await getCSRFToken();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        { email, password },
        { withCredentials: true } // Ensures cookies are sent with the request
      );

      if (response.status === 200) {
        // Assuming Laravel returns a token, store it in localStorage or context
        localStorage.setItem('auth_token', response.data.token); // Save token in localStorage (or use Context API)
        
        router.push("/"); // Redirect to the dashboard or desired page
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
