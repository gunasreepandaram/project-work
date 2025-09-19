const SingleAddress = ({ addressData, addressDeleteFun }) => {
  console.log(addressData);

  return (
    <div className="col-12 mt-3">
      <div className="card">
        <div className="card-body">
          <div>
            {addressData.flat}, {addressData.city}, {addressData.state}, {addressData.country} -{" "}
            {addressData.pincode}
          </div>
          <div>
            Name: {addressData.name}, Contact Number: {addressData.mobile}
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary">Edit</button>{" "}
          <button
            className="btn btn-danger"
            onClick={ (e) => addressDeleteFun(addressData.id) }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleAddress;
