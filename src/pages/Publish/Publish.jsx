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
    console.log("formData après l'ajout des images:", formData); // Vérifiez que les images sont correctement ajoutées au FormData

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
    <div>
      <h2>Publier une annonce</h2>
      <form onSubmit={handleSubmit}>
        <label className="file-upload">
          <div className="file-drop-zone">
            <input type="file" multiple onChange={handleFileChange} />
            <span>Déposer vos images</span>
            <img src="drop-icon.png" alt="Drop Icon" />
          </div>
          {selectedFile &&
            Array.from(selectedFile).map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
              />
            ))}
        </label>
        {console.log(selectedFile)}
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nom du produit"
        />
        <textarea
          rows={6}
          cols={30}
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Description du produit"
        ></textarea>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Prix"
        />
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Marque"
        />
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="État"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Emplacement"
        />
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Taille"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Couleur"
        />
        <button type="submit">Publier</button>
      </form>
    </div>
  ) : null;
};
export default Publish;
