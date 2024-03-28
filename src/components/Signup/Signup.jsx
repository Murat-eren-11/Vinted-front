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

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      if (response.status === 200) {
        // Inscription réussie
        // Afficher un message de succès à l'utilisateur
        console.log("Inscription réussie !");

        // Réinitialiser les champs du formulaire
        setUsername("");
        setEmail("");
        setPassword("");
        setNewsletter(false);

        // Rediriger l'utilisateur vers une autre page (facultatif)
        // window.location.href = "/accueil";
      } else {
        // La requête a échoué, afficher un message d'erreur
        console.error("Erreur lors de l'inscription");
      }
      setVisible(false);
    } catch (error) {
      console.log("Erreur lors de l'inscription :", error);
      if (error.response) {
        console.log("Erreur de réponse de l'API :", error.response.data);
        // Afficher un message à l'utilisateur indiquant l'erreur
      } else if (error.request) {
        console.log("Erreur de requête :", error.request);
        // Afficher un message à l'utilisateur indiquant un problème de requête
      } else {
        console.log("Erreur inattendue :", error.message);
        // Afficher un message à l'utilisateur indiquant une erreur inattendue
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
