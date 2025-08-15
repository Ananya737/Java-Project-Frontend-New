import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import one from '../Carousel Img/one.png'
import two from '../Carousel Img/two.png'
import three from '../Carousel Img/three.png'
import Carousel from 'react-bootstrap/Carousel';
import '../HomePage.css';
import API from './api';

export default function HomePage({products,msg}) {

  // const [products, setProducts] = useState([]);

  const [message,setMessage]=useState("");

  // useEffect(() => {
  //   fetchProducts();
    
  // }, []);

  // const fetchProducts = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8080/user/products");
  //     setProducts(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


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

    setMessage("✅ Product added to cart!");
    alert(message)

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
    setMessage("❌ Error adding to cart");
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


    <div className="container mt-4" >

     <section >

     <Carousel style={{width:"100%",marginTop:"80px"}}>
      <Carousel.Item style={{width:"100%",height:"550px"}}>
       <img src={one} alt="First Slide" style={{width:"100%",height:"100%",
        display: "block"}}/>
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item style={{width:"100%",height:"550px"}}>
       <img src={two} alt="First Slide" style={{width:"100%", height:"100%",
        display: "block"}}/>
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item style={{width:"100%",height:"550px"}}>
        <img src={three} alt="First Slide" style={{width:"100%",height:"100%",
        display: "block"}}/>
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>

</section >



    {/* <section id='sec2'>
      <h2>Shop By Category</h2>

       <div className='category-card'>
        <img src="" alt="" />
        <p>Category name</p>
        <button>Shop now</button>
       </div>
    </section> */}










      
<p  id='searchMsg'>{msg}</p>
      
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
