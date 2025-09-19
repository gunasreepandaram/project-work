
import axios from "axios"
import { useEffect, useState } from "react"
import { addressAddApi, addressViewApi } from "../services/addressService"
import { getLoggedInUserId } from "../Utils/utils"

function AddAddress({addnewAddress}){

    let [addressData, setAddressData] = useState({
        name: '', mobile: '', address1: '', city: '', state: '', country: '', pincode:'', latLong: ''
    })

    

    // 

    const getLocationData = async (lat, long) =>{
        let apiKey = 'AIzaSyAY1cLZkQ8z18FMknelsZKAUMoLhMBUXEA'
        let apiResponse = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=" + apiKey)
        console.log(apiResponse)
        let addressComponents = apiResponse.data.results[0].address_components
        let city = '';
        let state = '';
        let country = ''; let pincode ='';
        city = addressComponents.find( component => component.types.includes("locality") ).long_name
        console.log(city, city.long_name)

        state = addressComponents.find( component => component.types.includes("administrative_area_level_1")).long_name
        console.log(state)
        country = addressComponents.find( component => component.types.includes("country")).long_name
        console.log(country)
        pincode = addressComponents.find( component => component.types.includes("postal_code")).long_name
        console.log(pincode)
        setAddressData({...addressData, city:city, state:state, country: country, pincode: pincode })

    }
    /*
    1. get user coordinates -> lat, long
    2. Use google geocoding API 
    // address/add view delete
    */
    const getUserLatLong = () =>{
        if( navigator.geolocation ){

            navigator.geolocation.getCurrentPosition(
                (position) =>{
                    alert(position.coords.latitude, position.coords.longitude)
                    setAddressData({...addressData, latLong:  position.coords.latitude + ',' + position.coords.longitude})
                    getLocationData(position.coords.latitude, position.coords.longitude)
                },
                () =>{
                    alert("Permission denined")
                }
            )

        }else{
            alert("Geolocation not supported")
        }
    }

    const addAddressHandler = async () =>{
        let apiResponse = await addressAddApi(addressData)
        console.log(apiResponse.data.data)
        addnewAddress(apiResponse.data.data)
    }

    return(
        <div className="card shadow-sm mt-3">
            <div className="card-body">
                <div className="">
                    <button className="btn btn-primary" onClick={ e => getUserLatLong() }><i className="bi bi-crosshair"></i> Use my location</button>
                </div>
                <div className="mt-2">
                    <label className="small">NAME</label>
                    <input type="text" className="form-control" value={addressData.name} onChange={ e => setAddressData({...addressData, name: e.target.value})} />
                </div>
                <div className="mt-2">
                    <label className="small">MOBILE</label>
                    <input type="text" className="form-control" value={addressData.mobile} onChange={ e => setAddressData({...addressData, mobile: e.target.value})} />
                </div>
                <div className="mt-2">
                    <label className="small">FLAT/BUILDING, DOOR NO</label>
                    <input type="text" className="form-control" value={addressData.address1} onChange={ e => setAddressData({...addressData, address1: e.target.value})} />
                </div>
                <div className="mt-2">
                    <label className="small">CITY</label>
                    <input type="text" className="form-control" value={addressData.city} onChange={ e => setAddressData({...addressData, city: e.target.value})} />
                </div>
                <div className="mt-2">
                    <label className="small">STATE</label>
                    <input type="text" className="form-control" value={addressData.state} onChange={ e => setAddressData({...addressData, state: e.target.value})} />
                </div>
                <div className="mt-2">
                    <label className="small">COUNTRY</label>
                    <input type="text" className="form-control" value={addressData.country} onChange={ e => setAddressData({...addressData, country: e.target.value})} />
                </div>
                <div className="mt-2">
                    <label className="small">PINCODE</label>
                    <input type="text" className="form-control" value={addressData.pincode} onChange={ e => setAddressData({...addressData, pincode: e.target.value})} />
                </div>
                <div className="mt-4">
                    <button className="btn btn-primary" onClick={e => addAddressHandler() }>Add Address</button>
                </div>
            </div>
        </div>
    )
}
export default AddAddress