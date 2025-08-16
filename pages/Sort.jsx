import { useState,useEffect } from "react";
import API from "./api";
import "../Css/Sort.css"
import { Link, useParams } from "react-router-dom";

const Sort=()=>{
    const {order}=useParams();
    const [products, setProducts]=useState([]);
    const [message,setMessage]=useState("");

    useEffect(()=>{
        sortProductsByName(order);
    },[order])

    const sortProductsByName = async (order = "asc") => {
    try {
      const res = await API.get("/user/products/sort", {
        params: { order },
      });
      setProducts(res.data);
      setMessage(`Sorted by name (${order.toUpperCase()})`);
    } catch (err) {
      console.error(err);
      setMessage("Error sorting products");
      alert(message);
    }
  };

    return(
        <>
        
        <div id='wholeSortProductsContainer'>
        
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
            <p id='addToCart' >ADD TO CART</p>
            {/* </Link> */}
            </div>
            
            

            </>
           )

          })}

       </div>

        </>
    )
}
export default Sort;