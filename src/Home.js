import React, { useState } from "react";
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [email, setEmail] = useState("contact@ Easy Shopy.co.in");
  const [newEmail, setNewEmail] = useState("Contact@Care_Easy Shopy.co.in");

  const handleUpdate = () => {
    setEmail("student@ss.co");
    setNewEmail("student@ss.co");
  };

  return (
    <div className="home-container" >
      <NavBar />
      <div className="container mt-5 text-center" >
        <h1 className="fw-bold text-primary">Welcome to Easy Shopy</h1>
        <p className="text-muted">Your One-Stop Shop for All Your Needs</p>

        {/* Why Shop with Us */}
        <div className="mt-4 p-4 border rounded bg-light">
          <h2>Why Shop with Us?</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">✅ Wide Selection of Products</li>
            <li className="list-group-item">✅ Competitive Prices</li>
            <li className="list-group-item">✅ Fast Shipping</li>
            <li className="list-group-item">✅ Secure Checkout</li>
            <li className="list-group-item">✅ 24/7 Customer Support</li>
          </ul>
        </div>

        {/* Samsung Mobile Phones Section */}
        <div className="mt-5">
          <h2>Samsung Mobile Phones</h2>
          <div className="row mt-3">
            {[
              { name: "Samsung Galaxy S23 Ultra", storage: "512GB, Green", price: "$1,199", img: "https://m.media-amazon.com/images/I/71-d7XDbhIL._SL1500_.jpg"},
              { name: "Samsung Galaxy S23+", storage: "256GB, Phantom Black", price: "$999", img: "https://m.media-amazon.com/images/I/41fCDR6pjpL._SX300_SY300_QL70_FMwebp_.jpg" },
              { name: "Samsung Galaxy S23", storage: "128GB, Lavender", price: "$799", img: "https://m.media-amazon.com/images/I/81JHcYDLcHL._AC_UY327_FMwebp_QL65_.jpg" },
              { name: "Samsung Galaxy A54", storage: "128GB, Awesome Lime", price: "$499", img: "https://m.media-amazon.com/images/I/41asSSq2q5L._AC_UY327_FMwebp_QL65_.jpg" },
              { name: "Samsung Galaxy A34", storage: "128GB, Awesome Silver", price: "$399", img: "https://m.media-amazon.com/images/I/712f4xV-Z3L._AC_UY327_FMwebp_QL65_.jpg" },
              { name: "Samsung Galaxy Z Fold 5", storage: "512GB, Phantom Black", price: "$1,799", img: "https://m.media-amazon.com/images/I/71RLYJvBidL._AC_UY327_FMwebp_QL65_.jpg" },
              { name: "Samsung Galaxy Z Flip 5", storage: "256GB, Cream", price: "$999", img: "https://m.media-amazon.com/images/I/3114411coLL._AC_UY327_FMwebp_QL65_.jpg" },
              { name: "Samsung Galaxy M14", storage: "128GB, Midnight Blue", price: "$249", img: "https://m.media-amazon.com/images/I/61VpKrDeFkL._AC_UY327_FMwebp_QL65_.jpg" }
            ].map((phone, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <div className="card shadow-sm">
                  <img src={phone.img} className="card-img-top" alt={phone.name} />
                  <div className="card-body">
                    <h5 className="card-title">{phone.name}</h5>
                    <p className="card-text">{phone.storage}</p>
                    <p className="text-success fw-bold">{phone.price}</p>
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Our Community */}
        <div className="mt-5">
          <h2>Join Our Community</h2>
          <p>Follow us for updates & special offers:</p>
          <div className="d-flex justify-content-center gap-3">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">Facebook</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger">Instagram</a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-info">Twitter</a>

          </div>
                <div id="contactcare" Name="care">  
                <h5>Customer Care :- 1800221155</h5>
                <h5>Email:- Customercare_easyshopy@co.in</h5>
                </div>
        </div>

        {/* Update Email */}
        <div className="mt-5">
          <p>Email: {email}</p>
          <p>New Email: {newEmail}</p>
          <button className="btn btn-secondary" onClick={handleUpdate}>Update Email</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; {new Date().getFullYear()} Easy Shopy. All Rights Reserved.</p>
        <p>
          Unauthorized reproduction or distribution of any content is strictly prohibited.
          <a href="/terms" className="text-white text-decoration-none"> Read More</a>
        </p>
      </footer>

      <Footer />
    </div>
  );
}

export default Home;
