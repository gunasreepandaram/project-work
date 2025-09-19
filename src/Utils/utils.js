export const isEmailValid = (email) =>{
    let emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test( email )
}


export const checkUserLoginStatus = () =>{
    let userData = localStorage.getItem('userData')
    if(userData == undefined){
        return false
    }else{
        return true
    }
}

export const getLoggedInUserId = () =>{
    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)
    return userData.id;
}

export const getLoggedInUserName = () =>{
    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)
    return userData.name;
}

export const getLoggedInUserEmail = () =>{
    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)
    return userData.email;
}

export const getJwtToken = () =>{
   return localStorage.getItem('token')
}