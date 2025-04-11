import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./HomePage.css";
const HomePage = () => {
    const [allProducts, setAllProducts] = useState([]); // Original product list
    const [products, setProducts] = useState([]); // Filtered product list
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setAllProducts(res.data); // Store the original product list
                setProducts(res.data); // Display the full list initially
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        fetchProducts();
    }, []);
    const handleSearch = () => {
        const filteredProducts = allProducts.filter(
            (product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.price.toString().includes(searchQuery)
        );
        setProducts(filteredProducts);
    };
    const handleBuy = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            setProducts(products.filter((product) => product._id !== id));
            setAllProducts(allProducts.filter((product) => product._id !== id)); // Update both states
        } catch (err) {
            console.error("Error buying product:", err);
            alert("Failed to buy product");
        }
    };
    return (
        <div className="container">
            <h1>Used Product Store</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by title, description, or price"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product._id}>
                        <img
                            src={`http://localhost:5000/${product.image}`}
                            alt={product.title}
                        />
                        <div className="details">
                            <span>{product.title}</span>
                            <span>{product.description}</span>
                            <span>Rs.{product.price}</span>
                        </div>
                        <p>Posted by: {product.user?.name || "Unknown"}</p>
                        <button onClick={() => handleBuy(product._id)}>Buy</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default HomePage;