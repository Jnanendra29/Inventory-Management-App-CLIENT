import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {
        if(!name || !price || !category || !company){
            setError(true); 
            return false;
        }
        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.log(userId._id);
        let result = await fetch('http://localhost:8000/addProducts', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company , userId}),
            headers: {
                "Content-Type": "application/json",
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
        navigate('/');
    }

    return (
        <div className="product">
            <h1>
                Add Product
            </h1>
            <input type="text" placeholder="Enter Product Name"
                className="inputelement" value={name} onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span className="errormsg">Enter Valid Name</span>}

            <input type="number" placeholder="Enter Product Price"
                className="inputelement" value={price} onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className="errormsg">Enter Valid Price</span>}

            <input type="text" placeholder="Enter Product Category"
                className="inputelement" value={category} onChange={(e) => setCategory(e.target.value)}
            />
            {error && !category && <span className="errormsg">Enter Valid Category</span>}

            <input type="text" placeholder="Enter Product Company"
                className="inputelement" value={company} onChange={(e) => setCompany(e.target.value)}
            />
            {error && !company && <span className="errormsg">Enter Valid Company</span>}

            <button className="button" onClick={addProduct}> Add Product</button>
        </div>
    )
}

export default AddProduct;