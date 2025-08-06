import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import oip2 from '../assets/banner10.png'
import oip3 from '../assets/image.png'
import vision from '../assets/banner8.jpg'
import '../HomePage.css';
import API from './api';

export default function HomePage() {

  const [products, setProducts] = useState([]);

  const [msg,setMsg]=useState("");

  useEffect(() => {
    fetchProducts();
    
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const addToCart = async (productId) => {
  try {
    const username = localStorage.getItem("username");

    // Add product to cart
    await API.post(`/api/cart/add`, null, {
      params: {
        productId: productId,
        quantity: 1,
        username: username
      }
    });

    setMsg("✅ Product added to cart!");
    alert(msg)

    // ✅ Fetch latest cart count after adding
    const res = await API.get("/api/cart/count", {
      params: { username }
    });

    // ✅ Update the cart count in App state
    if (typeof setCartCount === 'function') {
      setCartCount(res.data);
    }

  } catch (err) {
    console.error(err);
    setMsg("❌ Error adding to cart");
  }
};



    const handleAddToCart = (productId) => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Please login or register to add items to your cart.");
      navigate('/login');
      return;
    }

    addToCart(productId);
  };

  return (
    <div className="container mt-4">
      {/* Carousel */}
      {/* <div id="carouselExample" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={oip2} className='bannerImg1'
               alt="Slide 1"/>
          </div>
          <div className="carousel-item">
            <img src={oip3} className='bannerImg2'
               alt="Slide 2"/>
          </div>
          <div className="carousel-item">
            <img src={vision} className='bannerImg3'
               alt="Slide 3"/>
          </div>
        </div>
        
        <button className="carousel-control-prev" type="button"
                data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button"
                data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div> */}











      

      
   {/* Products */}
      

       <div className='wholeProductsContainer'>
          
          {products.map((product)=>{
           
           return(
            <>
            
            <div className='eachProductContainer'>
            <Link to={`/product/${product.id}`} id='card'>
            <div className='imgContainer'> <img src={product.imageUrl} alt={product.name} />  </div>
            
            <p className='cardProductName'> {product.name} </p>

            <div className='productDetails'>
              <div id='price'>
              <p id='productPrice'>₹{product.price}</p>
              <p id='ProductMrp'>M.R.P: ₹ {product.mrp}</p>
              </div>
              <p id='rating'> <i className="fas fa-star text-warning"></i> {product.rating || 4.5} / 5 </p>
            </div>
            <p id='freeDelivery'>Free delivery by YogEase</p>
            </Link>
            {/* <Link className="nav-link" to="/cart"> */}
            <p id='addToCart' onClick={()=>{handleAddToCart(product.id)}}>ADD TO CART</p>
            {/* </Link> */}
            </div>
            
            

            </>
           )

          })}

       </div>


    </div>
  );
}
