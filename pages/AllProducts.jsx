import { Link } from "react-router-dom"
import "../Css/AllProducts.css"
import { useState } from "react";
import API from "./api";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const AllProducts=({products,msg})=>{
    const [message,setMessage]=useState("");
    // const [products, setProducts] = useState([]);
    const navigate=useNavigate();
    



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



     const navigateToSort=(order)=>{
        navigate(`/sort/${order}`);
     }
  
      
    return(
        <>
        <div id="allProductsContainer">
        <p id="msg">{msg}</p>

        <div id="sortFeature">
            <p>Sort by</p>
            <FaChevronDown id="dropdown" />
        <div id="sortFeatureOptions">
         <p onClick={()=>{navigateToSort("asc")}}>Ascending</p>
         <p onClick={()=>{navigateToSort("desc")}}>Descending</p>
        </div>
        </div>
        

       
        <div id='wholeProductsContainer'>
        
          
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
        
        </>
    )
}
export default AllProducts;