import { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import axios from "axios";
import Product from "./Product";

function Search() {
  let searchKeyword = "";
  let queryParams = new URLSearchParams(window.location.search);
  searchKeyword = queryParams.get("keyword");

  let [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductsData = async () => {
      let brands = ["iphone", "samsung", "oppo", "realme", "redmi", "poco"];
      let apiRequests = brands.map(brand => axios.get(`https://dummyjson.com/products/search?q=${brand}`));

      let responses = await Promise.all(apiRequests);
      let allProducts = responses.flatMap(response => response.data.products);

      setProducts(allProducts);
    };

    getProductsData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-3"></div>
          <div className="col-6">
            {
              products.map((product, i) => (
                <Product data={product} key={i} />
              ))
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
