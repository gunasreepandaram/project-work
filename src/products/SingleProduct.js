import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NavBar from "../shared/NavBar"
import Footer from "../shared/Footer"
import axios from "axios"
import { SideBySideMagnifier } from "react-image-magnifiers"
import { toast, ToastContainer } from "react-toastify"
import { getLoggedInUserId } from "../Utils/utils"

function SingleProduct(){

    const { productId } = useParams()

    const [productData, setProductData] = useState(null)

    const [ quantity, setQuantity] = useState(1)

    const [mainImage, setMainImage] = useState("")

    useEffect(() =>{

        const getProductData = async()=>{
            let apiResponse = await axios.get("https://dummyjson.com/products/" + productId)
            setProductData({...apiResponse.data})
            setMainImage(apiResponse.data.images[0])
        }

        getProductData()

    },[])

    const addToCart = async () =>{
        console.log( productId, quantity)
        if( quantity <= productData.stock){
            let userId = getLoggedInUserId()
            let product = {
                id: productId, quantity: quantity
            }
            let products = []
            products.push(product)
            try{
                let apiResponse = await axios.post("https://dummyjson.com/carts/add", { userId: 1 , products: products})
                toast.success("Added to cart")
            }catch(ex){
                toast.error(ex.message, {position: "top-center"})
            }
            
        }else{
            toast.error("We don't have enough stock to process your order", {position: "top-center"})
            console.log("Not in stock")
        }
    }

    return(
        <div>
            <NavBar />
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                            {
                                productData != null && 
                                <div className="row">
                                    {
                                        productData.images.map( (image ,i) =>(
                                            <div className="col-2" key={i}>
                                                <img src={image} className="img-thumbnail" onMouseOver={ e => setMainImage(image) } />
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                            {
                                productData !=null && 
                                // <img src={mainImage} className="img-fluid"/>
                                <SideBySideMagnifier 
                                    imageSrc={mainImage}
                                    alwaysInPlace={false}
                                    fillAvailableSpace={false}
                                    zoomPosition="right"
                                    zoomContainerBorder="1px solid #ccc"
                                    zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,0.3)"
                                    style={{width: '300px', height: '300px'}}

                                />
                            }
                    </div>
                    <div className="col-4">
                        { productData !=null && <h1>{ productData.title  }</h1> }
                        <div>
                            <i className="bi bi-star-fill"></i> {productData?.rating}
                            <h2><i className="bi bi-currency-rupee"></i> {productData?.price}</h2>
                        </div>
                        
                    </div>
                    <div className="col-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 >Add to cart</h5>
                                <select className="form-control mt-3" onChange={ e => setQuantity(e.target.value) }>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <div class="d-grid gap-2 mt-3">
                                    <button class="btn btn-warning" type="button" onClick={e => addToCart()}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </div>
    )

}

export default SingleProduct


