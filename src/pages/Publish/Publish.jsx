import "./Publish.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setSelectedFile((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append("picture", selectedFile[i]);
    }
    formData.append("title", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("brand", brand);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("size", size);
    formData.append("color", color);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}offer/publish`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("l'annonce:", response.data);
      navigate(`/offre/${response.data._id}`);
    } catch (error) {
      console.log("Erreur de l'annonce: ", error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return token ? (
    <div className="publishpage">
      <div className="publishcontainer">
        <h2>Vends ton article</h2>
        <form className="publication" onSubmit={handleSubmit}>
          <label className="file-upload">
            <div className="file-drop-zone">
              <div className="inputfiledrop">
                <input
                  type="file"
                  className="inputpublish"
                  multiple
                  onChange={handleFileChange}
                />
                <span>Déposer vos images</span>
                {selectedFile &&
                  Array.from(selectedFile).map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                    />
                  ))}
              </div>
            </div>
          </label>
          <div className="textsection">
            <div className="textinput">
              <p>Titre</p>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="ex: Bracelet rouleau de Scotch Balenciaga"
              />
            </div>
            <div className="textinput">
              <p>Décris ton article</p>
              <textarea
                rows={6}
                cols={30}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="ex: Un bracelet moche mais comme c'est Balenciaga tout le monde le veut."
              />
            </div>
          </div>
          <div className="textsection">
            <div className="textinput">
              <p>Prix</p>
              <input
                type="text"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="0,00€"
              />
            </div>
          </div>
          <div className="textsection">
            <div className="textinput">
              <p>Marque :</p>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="ex: Balenciaga"
              />
            </div>
            <div className="textinput">
              <p>État :</p>
              <input
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="ex: Bon état"
              />
            </div>
            <div className="textinput">
              <p>Ville : </p>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="ex : Izmir, la meilleure ville du monde"
              />
            </div>
            <div className="textinput">
              <p>Taille :</p>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="ex : M"
              />
            </div>
            <div className="textinput">
              <p>Couleur : </p>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="ex : Violet"
              />
            </div>
          </div>
          <div className="bouton">
            <button type="submit" className="validation">
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};
export default Publish;
