import "./Publish.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Publish = () => {
  const token = Cookies.get("vinted-token");
  const [selectedFile, setSelectedFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append("picture", selectedFile);
      formData.append("title", productName);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      formData.append("brand", brand);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("size", size);
      formData.append("color", color);
      console.log("formData après l'ajout des images:", formData); // Vérifiez que les images sont correctement ajoutées au FormData

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}publish`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("l'annonce:", response.data);
    } catch (error) {
      console.log("Erreur de l'annonce: ", error.message);
    }
  };

  return (
    <div>
      <h2>Publier une annonce</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        {selectedFile && (
          <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
        )}
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nom du produit"
        />
        <textarea
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
  );
};
export default Publish;
