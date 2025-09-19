import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import TestProduct from "./TestProduct";

function TestProducts(){

    const [products, setProducts] = useState([])

    useEffect( () =>{

        const getAllProducts = async () =>{
            let apiResponse = await axios.get('https://dummyjson.com/products')
            console.log(apiResponse.data.products)
            setProducts([...apiResponse.data.products])
            
        }
        getAllProducts()

    },[])

    return(
        <div className="container">
            All Products
            {
                products.map( productData => (
                    <TestProduct data={productData} />
                ))
            }
            <TestProduct  />
        </div>
    )

}

export default TestProducts;
