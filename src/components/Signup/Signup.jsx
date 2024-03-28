import "./Signup.css";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

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
          username,
          email,
          password,
          newsletter,
        }
      );
      const { token } = response.data;
      Cookies.set("token", token, { expires: 7 });

      setVisible(false);
    } catch (error) {
      console.log(error.message);
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
