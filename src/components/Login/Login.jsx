import "./Login.css";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = ({ logVisible, setLogVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorBorder, setShowErrorBorder] = useState(false);

  const userSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}user/login`,
        {
          email: email,
          password: password,
        }
      );
      const { token } = response.data;
      Cookies.set("token", token, { expires: 7 });
      setLogVisible(false);
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Email ou mot de passe incorrect.");
        setShowErrorBorder(true);
      } else {
        setErrorMessage("Une erreur s'est produite lors de la connexion.");
      }
    }
  };

  return (
    <div
      className="modal"
      onClick={() => {
        setLogVisible(false);
      }}
    >
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <div>
          <h2>S'inscrire</h2>
          <form onSubmit={userSignUp}>
            <input
              type="email"
              value={email}
              placeholder="moi@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              style={{ border: showErrorBorder ? "2px solid red" : "none" }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              style={{ border: showErrorBorder ? "2px solid red" : "none" }}
            />
            <button className="connecter" type="submit">
              Connectez-vous{" "}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
