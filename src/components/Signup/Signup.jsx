import "./Signup.css";
import axios from "axios";
import { useState } from "react";

const Signup = ({ visible, setVisible }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const userSignUp = async (e) => {
    e.preventDefault();
    console.log(`${import.meta.env.VITE_API_URL}user/signup`);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}user/signup`,
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      setUsername("");
      setEmail("");
      setPassword("");
      setNewsletter(false);
      console.log("Inscription faite");
      setVisible(false);
    } catch (error) {
      console.log("Erreur lors de l'inscription :", error);
      if (error.response) {
        console.log("Erreur de réponse de l'API :", error.response.data);
      } else if (error.request) {
        console.log("Erreur de requête :", error.request);
      } else {
        console.log("Erreur inattendue :", error.message);
      }
    }
  };

  return (
    <div
      className="modal"
      onClick={() => {
        setVisible(false);
      }}
    >
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <div>
          <h2>S'inscrire</h2>
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
            <div className="newsletter">
              <input
                className="newscheck"
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
              />{" "}
              <p>S'inscrire à notre newsletter</p>
            </div>
            <small>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </small>

            <button className="inscrire" type="submit">
              Inscrivez-vous
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
