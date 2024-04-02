import "./Signup.css";
import axios from "axios";
import { useState } from "react";

const Signup = ({ visible, setVisible, handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const userSignUp = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}user/signup`,
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //on appelle le token
      handleToken(response.data.token);
      //on ferme la modale
      setVisible(false);
    } catch (error) {
      console.log("Erreur lors de l'inscription :", error);
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
        <div className="form-card">
          <h2>S'inscrire</h2>
          <form onSubmit={userSignUp} className="formplease">
            <input
              className="usernamesignup"
              type="text"
              value={username}
              placeholder="nom d'utilisateur"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="avatarsignup"
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
            <small className="cgusignup">
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
