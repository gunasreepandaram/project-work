import NavBar from "../shared/NavBar";
import Footer from "../shared/Footer";
import { useEffect, useState } from "react";
import AddAddress from "./AddAddress";
import { addressDeleteApi, addressViewApi } from "../services/addressService";
import { getLoggedInUserId } from "../Utils/utils";
import SingleAddress from "./SingleAddress";

function Addresses() {
  
  let [showAddAddress, setSHowAddAddress] = useState(false);

  let [addressData, setAddressData] = useState([]);

  let [deleteingid, setdeletingid] = useState(0);

  useEffect(() => {
    const getAddresses = async () => {
      try {
        let apiResponse = await addressViewApi({ userId: getLoggedInUserId() });
        console.log(apiResponse.data.data);
        setAddressData([...apiResponse.data.data]);
      } catch (ex) {
        console.log(ex);
      }
    };

    getAddresses();
  }, []);

  const addnewAddress = (data) => {
    let tmpData = addressData;
    tmpData.push(data);
    setAddressData([...tmpData]);
  };

  const addressDelete = async (id) => {
    console.log(id);
    let tmpData = addressData;
    tmpData = tmpData.filter((address) => address.id != id);
    setAddressData([...tmpData]);
    await addressDeleteApi({ addressId: id });
    setdeletingid(id);
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-8">
            <button
              className="btn btn-secondary"
              onClick={(e) => setSHowAddAddress(true)}
            >
              Add new address
            </button>
            <h2>Deleting id {deleteingid}</h2>
            {showAddAddress == true && (
              <AddAddress addnewAddress={addnewAddress} />
            )}
          </div>
          <div className="col-3"></div>
        </div>
        <div className="row">

          {
            addressData.map((address, i) => (
              <SingleAddress
                addressData={address}
                key={i}
                addressDeleteFun={addressDelete}
              />
            ))
          }

          </div>
      </div>
      <Footer />
    </div>
  );
}

export default Addresses;
