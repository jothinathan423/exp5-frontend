import React, { useState } from "react";
import axios from "axios";
// import "./FormPages.css";
const ProductPage = () => {
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        image: null,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", product.title);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("image", product.image);
        // Debug log
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: token,
                },
            });
            alert("Product added successfully");
            setProduct({ title: "", description: "", price: "", image: null });
        } catch (err) {
            console.error("Error adding product:", err.response?.data || err.message);
            alert(`Failed to add product: ${err.response?.data?.msg || err.message}`);
        }
    };

    return (<form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
        <input
            type="text"
            placeholder="Description"
            value={product.description}
            onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
            }
        />
        <input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
            type="file"
            onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
        />
        <button type="submit">Add Product</button>
    </form>);
};
export default ProductPage;