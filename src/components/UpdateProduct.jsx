import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const productId = params.id;
        getProductDetails(productId);
    },[])

    const getProductDetails = async (productId) => {
        let result = await fetch(`http://localhost:8000/product/${productId}`,{
            headers : {
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
               }
        });
        result = await result.json();
        if(result){
           console.log(result);
           setName(result.name);
           setPrice(result.price);
           setCategory(result.category);
           setCompany(result.company);
        }else {
            console.log("Product not found");
        }
    }

    const updateProduct = async () => {
        console.log(name, price, category, company);
        let result = await fetch(`http://localhost:8000/product/${params.id}`, {
            method : 'put',
            body: JSON.stringify({name, price, category, company}),
            headers:{
                'Content-Type':'application/json',
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }

    return (
        <div className="product">
            <h1>
            Update Product
            </h1>
            <input type="text" placeholder="Enter Product Name"
                className="inputelement" value={name} onChange={(e) => setName(e.target.value)}
            />
            

            <input type="number" placeholder="Enter Product Price"
                className="inputelement" value={price} onChange={(e) => setPrice(e.target.value)}
            />
            

            <input type="text" placeholder="Enter Product Category"
                className="inputelement" value={category} onChange={(e) => setCategory(e.target.value)}
            />
        

            <input type="text" placeholder="Enter Product Company"
                className="inputelement" value={company} onChange={(e) => setCompany(e.target.value)}
            />
            

            <button className="button" onClick={updateProduct}> Update Product</button>
        </div>
    )
}

export default UpdateProduct;