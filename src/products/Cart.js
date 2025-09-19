
import React, { useEffect, useState } from 'react';
import NavBar from '../shared/NavBar';
import Footer from '../shared/Footer';
import axios from 'axios';
import { getJwtToken, getLoggedInUserEmail, getLoggedInUserId, getLoggedInUserName } from '../Utils/utils';
import { toast, ToastContainer } from 'react-toastify';



function Cart(){

    const [cartData, setCartData] = useState([])

    useEffect( () =>{

        const getCartData = async () =>{
            try{
                let userId = 6; //getLoggedInUserId()
                let apiResponse = await axios.get('https://dummyjson.com/carts/user/' + userId)
                setCartData([...apiResponse.data.carts])
            }catch(ex){
                toast.error(ex.message)
            }
            

        }

        getCartData()

    },[])

    const updateProductdata = async(apidata) =>{
        try{
            let apiResponse = await axios.put('https://dummyjson.com/carts/1', apidata)
        }catch(ex){
            toast.error(ex.message)
        }
    }

    const increaseQuantity = async (product, j, cart, i)  =>{

        let newQuantity = product.quantity + 1
        let tmpCartData = [...cartData]

        tmpCartData[i]['products'][j]['quantity'] = newQuantity
        setCartData([...tmpCartData])

        let apidata = {
            merge: true,
            products:[
                {
                    id: product.id,
                    quantity: newQuantity
                }
            ]
        }

        updateProductdata(apidata)

    }

    const decreaseQuantity = async (product, j, cart, i)  =>{

        let newQuantity = product.quantity - 1
        if(newQuantity > 0){
            let tmpCartData = [...cartData]

            tmpCartData[i]['products'][j]['quantity'] = newQuantity
            setCartData([...tmpCartData])
        }
        let apidata = {
            merge: true,
            products:[
                {
                    id: product.id,
                    quantity: newQuantity
                }
            ]
        }

        updateProductdata(apidata)
    }

    const calculateQunatityAndPrice = (products) =>{
        let totalQuantity = 0;
        let totalPrice = 0;

        products.forEach( (product) =>{
            let tmpTotalPrice = product.quantity * product.price
            totalPrice = totalPrice + tmpTotalPrice
            totalQuantity = totalQuantity + product.quantity
        })

        console.log( totalQuantity, totalPrice )

        return "(" + totalQuantity + "):" + totalPrice

    }

    const deleteProduct = async (product)=>{

    }

    useEffect(() =>{

        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }

    },[])

    const handlePayments = async() =>{

        let order_id = "hddshseershsdh"
        let amount = 100


        let createOrderApiData = {
            userId: getLoggedInUserId(), token: getJwtToken().replace("Bearer ",""), amount: 100
        }
        let apiResponse = await axios.post("https://api.softwareschool.co/payments/create-order", createOrderApiData)
        order_id = apiResponse.data.data.order.id

        var options = {
            "key": "rzp_test_8gNHxGVGlM9lZR", // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Amazon test website", //your business name
            "description": "Test Transaction",
            "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response){
                let orderSuccessAPiData = {
                    userId: getLoggedInUserId(), token: getJwtToken().replace("Bearer ",""), 
                    paymentId: response.razorpay_payment_id, orderId: response.razorpay_order_id, signature: response.razorpay_signature
                }
                let apiResponse = await axios.post("https://api.softwareschool.co/payments/order-success", orderSuccessAPiData)
                alert("Payment success")
                
            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": getLoggedInUserName(), //your customer's name
                "email": getLoggedInUserEmail(), 
                "contact": ""  //Provide the customer's phone number for better conversion rates 
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', async function (response){
                let failedOrderApiData = {
                    userId: getLoggedInUserId(), token: getJwtToken().replace("Bearer ",""),
                    paymentId: response.error.metadata.payment_id, orderId: response.error.metadata.order_id,
                    error: response.error
                }
                let apiresponse = await axios.post("https://api.softwareschool.co/payments/order-failed", failedOrderApiData)
                alert("Failed")


                console.log(response.error.code);
                console.log(response.error.description);
                console.log(response.error.source);
                console.log(response.error.step);
                console.log(response.error.reason);
                console.log(response.error.metadata.order_id);
                console.log(response.error.metadata.payment_id);
        });
        rzp1.open()
    }
    
    return(
        <div>
            <NavBar />
            <div className='container'>
                <div className='row'>
                    <div className='col-8'>
                        {
                            cartData.map( (cart, i) =>(
                                <div className='card mb-3 shadow' key={i}>
                                    <div className='card-body'>
                                        {
                                            cart.products.map( (product,j) =>(
                                                <div className='card border-0 mb-3 border-bottom  pb-3' key={j}>
                                                    <div className='row'>
                                                        <div className='col-2'>
                                                            <img src={product.thumbnail}  className='img-fluid'/>
                                                        </div>
                                                        <div className='col-8'>
                                                            <div className='card-body'>
                                                                <h5>{product.title}</h5>
                                                                <div>
                                                                    <buttton className="btn btn-light" onClick={e => decreaseQuantity(product, j, cart, i)} ><strong>-</strong></buttton>
                                                                    <span> { product.quantity } </span>
                                                                    <buttton className="btn btn-light" onClick={ e => increaseQuantity(product, j, cart, i) } ><strong>+</strong></buttton>
                                                                    <a href='#' className='card-link' onClick={ e => deleteProduct(product)}>Delete</a>
                                                                    <a href='#' className='card-link'>Save for later</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-2 text-end'>
                                                            <span class="badge text-bg-danger">Limited time deal</span>
                                                            <strong><i className="bi bi-currency-rupee"></i>{product.price}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className='text-end'>
                                            <strong>
                                                Subtotal { calculateQunatityAndPrice(cart.products) }
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='col-4'>
                        <div className='card shadow'>
                            <div className='card-body'>
                                {
                                    cartData.length > 0 &&
                                    <div>
                                        <p>
                                            <strong>
                                                Subtotal { calculateQunatityAndPrice(cartData[0].products) }
                                            </strong>
                                        </p>
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-warning rounded-pill" onClick={e => handlePayments()} type="button">Buy Now</button>
                                        </div>
                                    </div>
                                }
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
export default Cart

