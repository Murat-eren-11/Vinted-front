import "./Signup.css";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Signup = ({ visible, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  if (!visible) return null;

  const userSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        {
          username,
          email,
          password,
          newsletter,
        }
      );
      const { token } = response.data;
      Cookies.set("token", token, { expires: 7 });

      onClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={userSignUp}>
        <input
          type="text"
          value={username}
          placeholder="nom d'utilisateur"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="moi@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
        />
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
        />
        <button type="submit">Inscrivez-vous</button>
      </form>
    </div>
  );
};

export default Signup;
