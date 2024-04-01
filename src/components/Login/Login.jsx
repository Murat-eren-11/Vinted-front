import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setLogVisible, handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorBorder, setShowErrorBorder] = useState(false);
  const navigate = useNavigate();
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
      handleToken(response.data.token);
      setLogVisible(false);
      navigate("/publish");
    } catch (error) {
      if (error.response && error.response.status === 400) {
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
          <h2>Se connecter</h2>
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
            <input type="submit" value="Se connecter" className="connecter" />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
