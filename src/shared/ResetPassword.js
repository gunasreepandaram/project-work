import { useState } from 'react';
import amazonLogo from '../images/amazon-logo.png'
import { isEmailValid } from '../Utils/utils';
import { ERROR_MESSAGES } from '../constants/errors';
import { resetPasswordApi } from '../services/authService';

function ResetPassword(){

    let [email, setEmail] = useState("")
    let [errors, setErrors] = useState({email: false, apiError: false})
    let [apiMsg, setApiMsg] = useState("")


    const handleResetPassword = async () =>{
        let tempErrors = {...errors}
        let hasErrors = false

        if( isEmailValid(email) == false){
            hasErrors = true
            tempErrors = {...tempErrors, email: true}
        }else{
            tempErrors = {...tempErrors, email: false}
        }
        setErrors({...tempErrors})

        if( hasErrors == false ){
            try{
                let apiResponse = await resetPasswordApi({ email: email })
                setErrors({...errors, apiError: false})
                if(apiResponse.data.result == "success"){
                    setApiMsg(apiResponse.data.message)
                }
            }catch(error){
                setApiMsg("")
                setErrors({...errors, apiError: true})
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
                            <h3>Forgot Password</h3>
                            <div className='mt-3'>
                                <strong>Email</strong>
                                <input type="text" className='form-control' placeholder='Email'  onChange={ e => setEmail(e.target.value)}  />
                                <div className='text-danger'> { errors.email == true && ERROR_MESSAGES.RESET_PASSWORD.EMAIL }  </div>
                            </div>
                            <div className='mt-4 d-grid'>
                                <button className='btn-warning btn' onClick={ e => handleResetPassword() } >Reset My Password</button>
                                <div className="text-danger">
                                    { errors.apiError == true && "Email is not registered with us" }
                                </div>
                                <div className="text-success">
                                    {apiMsg}
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

export default ResetPassword;

