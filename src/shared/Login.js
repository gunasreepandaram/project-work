import { useState } from "react"
import amazonLogo from '../images/amazon-logo.png'
import { isEmailValid } from "../Utils/utils"
import { ERROR_MESSAGES } from "../constants/errors"
import { signinApi } from "../services/authService"
import { Link } from "react-router-dom"
import axios from "axios"

function Signin(){

    let [loginData, setLoginData] = useState({ email: '', password: ''  })
    let [loginErrors, setLoginErrors] = useState({ email: false, password: false, apiError: false })


    const handleLogin = async () =>{

        let tempErrors = { ...loginErrors }

        let hasErrors = false;

        if( isEmailValid(loginData.email) == false ){
            hasErrors = true
            tempErrors = {...tempErrors, email: true}
        }else{
            tempErrors = {...tempErrors, email: false}
        }

        if( loginData.password.length < 6 ){
            hasErrors = true
            tempErrors = {...tempErrors, password: true}
        }else{
            tempErrors = {...tempErrors, password: false}
        }

        setLoginErrors({...tempErrors})

        if( hasErrors == false ){
            try {
                let apiResponse =  await signinApi({...loginData})
                console.log( apiResponse )
                setLoginErrors({...loginErrors, apiError: false})
                let apiResponse2 = await signinApi({...loginData})
                if( apiResponse.data.result == "success"){
                    localStorage.setItem("userData", JSON.stringify(apiResponse.data.data))
                    window.location = "/"
                }
            } catch (error) {
                setLoginErrors({...loginErrors, apiError: true})
            }


            axios.post("https://api.softwareschool.co/api/std/login",loginData, (apiResponse) =>{
                // data
                console.log(2)
                setLoginErrors({...loginErrors, apiError: false})
                if( apiResponse.data.result == "success"){
                    localStorage.setItem("userData", JSON.stringify(apiResponse.data.data))
                    // window.location = "/"
                }
                axios.post("https://api.softwareschool.co/api/std/login",loginData, (apiResponse) =>{

                })

            }).catch(err =>{
                console.log(3)
            })

            console.log(1)

            let ffasf = "AGag"


        }


    }

    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-4">
                    <div className='text-center'>
                        <img src={amazonLogo} className='logo-img' />
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h3>Login</h3>
                            <div className='mt-3'>
                                <strong>Email</strong>
                                <input type="text" className='form-control' placeholder='Email' onChange={ e => setLoginData({ ...loginData, email: e.target.value,}) }  />
                                <div className='text-danger'> { loginErrors.email == true && ERROR_MESSAGES.LOGIN.EMAIL } </div>
                            </div>
                            <div className='mt-3'>
                                <strong>Password</strong>
                                <input type="password" className='form-control' placeholder='Password' onChange={ e => setLoginData({...loginData, password: e.target.value })} />
                                <div><i className="bi bi-info-lg text-primary"></i> <span className='fs-6'>Passwords must be at least 6 characters.</span></div>
                                <div className='text-danger'> { loginErrors.password == true && ERROR_MESSAGES.LOGIN.PASSWORD }  </div>
                                <div>
                                    <Link to="/reset-password" >Forgot Password?</Link>
                                </div>
                            </div>
                            <div className='mt-4 d-grid'>
                                <button className='btn-warning btn' onClick={ e => handleLogin() } >Login</button>
                                <div className="text-danger">
                                    { loginErrors.apiError == true && "Invalid login credentials" }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center mt-5'>
                <div className='col-4 text-center'>
                    <div className='row'>
                        <div className='col-4'> <a href='#'>Conditions of Use </a> </div>
                        <div className='col-4'> <a href='#'>Privacy Policy </a> </div>
                        <div className='col-4'> <a href='#'>Help </a> </div>
                    </div>
                    <div className='mt-3'>
                        &copy; 1996-2024, Amazon.com, Inc. or its affiliates
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signin

