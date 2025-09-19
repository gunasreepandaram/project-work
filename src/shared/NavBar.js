

import { Link } from 'react-router-dom';
import { checkUserLoginStatus } from '../Utils/utils'
import { useState } from 'react';
import { searchSuggestionsApi } from '../services/searchService';
function NavBar(){

    let [showSearchDropdown, setSHowSearchDropdown] = useState(false)
    
    let isUserLoggedIn = checkUserLoginStatus()

    let [searchWord, setSearchWord] = useState("")

    let [ searchSuggestionsList,  setSearchSuggestionsList] = useState([])


    const logoutUser = () =>{
        let trackingId = localStorage.getItem('tracking_id')
        localStorage.clear();
        localStorage.setItem('tracking_id', trackingId)
        window.location = '/'
    }

    const searchHandler = async (e) =>{
        let keyWord = e.target.value;
        if( keyWord.length >0 ){
            console.log("make api call")
            // api path, input data, method, output data
            // path ->api/std/search , POST, { searchWord: "dshshsh"}, 
            try{
                let apiResponse = await searchSuggestionsApi({ searchWord:  keyWord});
                // map, foreach, for, while
                let suggestionsList = apiResponse.data.data;
                console.log( suggestionsList)
                let suggestionValues = suggestionsList.map( (suggestion) => {
                    return suggestion.value
                })
                console.log( suggestionValues )
                setSearchSuggestionsList([...suggestionValues])
                setSHowSearchDropdown(true)

                let jsonData = {
                    
                }

            }catch(err){
                alert("Unable to process your request")
            }
        }
    }

    const handleSuggestionClick = (suggestion) =>{
        console.log(suggestion)
        window.location = "/product-search?keyword=" + suggestion
    }
    


    return(
        <nav className="navbar bg-body-tertiary navbar-expand-lg">
            <div className="container-fluid">
                <h3 className="navbar-brand">Amazon</h3>
                <div className="input-group">
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">All</button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action before</a></li>
                        <li><a className="dropdown-item" href="#">Another action before</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                    <input type="text" className="form-control" onChange={ e => searchHandler(e) } />
                    <button className="btn btn-outline-secondary " type="button" ><i className="bi bi-search"></i></button>
                    {
                        showSearchDropdown == true &&
                        <div className='search-dropdown shadow'>
                            {
                                searchSuggestionsList.map( (suggesion, i) => (
                                    <div key={i} className='suggestion-item' onClick={ e => handleSuggestionClick(suggesion) } >
                                        {suggesion}
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
                <div className="d-flex">
                    
                
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/pricing' className="nav-link">Price</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Home/contactcare" className="nav-link">Care</Link>
                        </li>
                        <li className="nav-item">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Menu
                                    </button>
                                    {
                                        isUserLoggedIn == false  && 
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                            <li><Link className="dropdown-item" to="/create-account">Signup <span className="text-primary">Start here</span> </Link></li>
                                        </ul>
                                    }
                                    {
                                        isUserLoggedIn == true && 
                                        <ul className="dropdown-menu">
                                            <li><Link to="/cart" className="dropdown-item">Cart</Link></li>
                                            <li><Link to="/addresses" className="dropdown-item">Chanage Addresses</Link></li>
                                            <li><a className="dropdown-item" onClick={ e => logoutUser() } >Logout</a></li>
                                        </ul>
                                    }
                                </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )

}

export default NavBar