
import { useState } from 'react'
import amazonLogo from '../images/amazon-logo.png'
import { signupApi } from '../services/authService'
import { checkUserLoginStatus, isEmailValid } from '../Utils/utils'
import { ERROR_MESSAGES } from '../constants/errors'

function Signup(){

    let isUserLoggedIn = checkUserLoginStatus()
    if( isUserLoggedIn == true ){
        window.location = '/'
    }

    const [signupData, setSignupData] = useState( { name: "", email: "", password: "" } )
    const [signupErrors, setSignupErrors] = useState({ name: false, password: false, email: false })

    const updateName = (e) =>{
        console.log(e, e.target.value, {...signupData})
        setSignupData( { ...signupData, name: e.target.value } )
    }

    const updateEmail = (e) =>{
        setSignupData({ ...signupData, email: e.target.value })
    }

    const updatePassword = (e) =>{
        setSignupData({ ...signupData , password: e.target.value })
    }

    const handleSignup = async () => {
        console.log( signupData )

        let tempErrors = { signupErrors }

        let hasErrors = false

        if( signupData.name.length < 3 ){
            hasErrors = true
            tempErrors = { ...tempErrors, name:true }
        }else{
            tempErrors = { ...tempErrors, name:false }
        }

        if( isEmailValid(signupData.email) == false){
            hasErrors = true
            tempErrors = { ...tempErrors, email:true }
        }else{
            tempErrors = { ...tempErrors, email:false }
        }

        if( signupData.password.length < 6){
            hasErrors = true
            tempErrors = { ...tempErrors, password:true }
        }else{
            tempErrors = { ...tempErrors, password:false }
        }

        setSignupErrors({...tempErrors})
        
        if(hasErrors == false){
            /*
            PATH: https://api.softwareschool.co/api/std/create-acount
            method: post
            data: name, email, password -> json object
            */
           

            let apiResponse = await signupApi({ ...signupData })
            console.log( apiResponse )
            if( apiResponse.data.result == "success" ){
                localStorage.setItem("userData", JSON.stringify(apiResponse.data.data) )
                localStorage.setItem('tracking_id', 1)
                //window.location = "/"
            }

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
                            <h3>Create Account</h3>
                            <div className='mt-3'>
                                <strong>Your name</strong>
                                <input type="text" className='form-control' placeholder='Your full name' onChange={  e => updateName(e) } />
                                <div className='text-danger'> { signupErrors.name == true && ERROR_MESSAGES.SIGNUP.NAME } </div>
                            </div>
                            <div className='mt-3'>
                                <strong>Email</strong>
                                <input type="text" className='form-control' placeholder='Email' onChange={ e => updateEmail(e) } />
                                <div className='text-danger'> { signupErrors.email == true && ERROR_MESSAGES.SIGNUP.EMAIL } </div>
                            </div>
                            <div className='mt-3'>
                                <strong>Password</strong>
                                <input type="password" className='form-control' placeholder='Password' onChange={ e => updatePassword(e) } />
                                <div><i className="bi bi-info-lg text-primary"></i> <span className='fs-6'>Passwords must be at least 6 characters.</span></div>
                                <div className='text-danger'> { signupErrors.password == true && ERROR_MESSAGES.SIGNUP.PASSWORD } </div>
                            </div>
                            <div className='mt-4'>
                                <p>
                                    To verify your number, we will send you a text message with a temporary code. Message and data rates may apply.
                                </p>
                            </div>
                            <div className='mt-4 d-grid'>
                                <button className='btn-warning btn' onClick={ e => handleSignup() } >Create Account</button>
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
export default Signup