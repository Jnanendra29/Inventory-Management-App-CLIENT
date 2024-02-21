import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:8000/products', {
           headers : {
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
           }
        });
        result = await result.json();
        setProducts(result);
    }

    const handleDelete = async (id) => {
        let result = await fetch(`http://localhost:8000/product/${id}`, {
            method: 'Delete',
            headers : {
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
               }
        })
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        console.log(event.target.value);
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8000/search/${key}`,  {
                headers : {
                 authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
             });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }

    }

    return (
        <div className="product-list">
            <h1>Products List</h1>
            <input type="text" placeholder="Search Product" className="searchbox"
                onChange={searchHandle}
            />
            <ul>
                <li>Sl. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? 
                products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => handleDelete(item._id)}>Delete</button>
                            <Link to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                ) 
                :
                <h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductsList;