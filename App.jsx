// App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import API from './pages/api';
import logoImg from '../src/assets/logoImg.png'
import "../src/App.css"
import "../src/Css/NewNavbar.css"
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductForm from './pages/Product';
import VProducts from './pages/viewproduct';
import Cart from './pages/cart';
import OrderTracking from './pages/OrderTracking';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import AdminOrders from './pages/AdminOrders';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { IoMdSearch } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";
import AllProducts from './pages/AllProducts';
import Sort from './pages/Sort';



function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <div className="container">
        <p className='footer'>&copy; 2025 MyShop. All rights reserved.</p>
      </div>
    </footer>
  );
}

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate=useNavigate();


 useEffect(() => {
    fetchProducts();
    
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/user/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  // ✅ Load cart count on page load
  useEffect(() => {
    const fetchCartCount = async () => {
      if (username) {
        try {
          const res = await API.get("/api/cart/count", {
            params: { username }
          });
          setCartCount(res.data);
        } catch (err) {
          console.error("Error fetching cart count:", err);
        }
      }
    };
    fetchCartCount();
  }, [username]); // ✅ Re-run when username changes!


  //Search products

  const searchProducts = async () => {
    try {
      const res = await API.get("/user/products/search", {
        params: {
          name: searchTerm,
        },
      });
      setProducts(res.data);
      navigate("/allProducts");
      if(res.data.length===0){
        setMsg(`No product found for "${searchTerm}"`)
      }else{
      setMsg(`Showing results for "${searchTerm}"`);
      
      }
    } catch (err) {
      console.error(err);
      setMsg("Error searching products");
    }
  };


  const clearSearch=()=>{
    setSearchTerm("");
    setMsg("");
    fetchProducts();
    // navigate("/");
  }


  // ✅ Logout function
  const handleLogout = () => {
    localStorage.clear();
    setUsername(null);
    setCartCount(0);
    window.location.href = "/login"; // Or use navigate
  };

  

  return (
    <>
      

<div className='header-container'>

   

  {/* 🔷 Top Bar */}

  <div className='topBar'>

    {/* 🔹 Logo */}
    <div id='yogEaseLogo'>

      <Link to="/" >
  <img
    src={logoImg}
    alt="YogEase Logo"/>
</Link>
      
    </div>

    {/* 🔹 Search Box */}
    <div className='headerSearchBox'>
      
      <IoMdSearch  id='searchIcon'/>
      <input id='headerSearchInput'
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        placeholder="Search products..."/>
        <button onClick={searchProducts}><IoMdSearch  id='searchIconForButton'/> Search</button>
        <button onClick={clearSearch} id='clearBtn'>Clear</button>
    </div>

    {/* 🔹 Cart & Profile Icons */}
    <div className='cartIcon'>
      
      <Link className="nav-link" id="cartLink" to="/cart">
        <i className="fas fa-shopping-cart"></i>
        Cart
      </Link>

      {username ? (
          <>
         

        <div style={{display:"flex",gap:"5px"}} id='userIcon'> <i className="fas fa-user" ></i> 
        {username}  
         <div id='sideBar'>
          <div id='sideBarMenu'>
          <p id='myProfile'>< i className="fas fa-user" ></i> Profile</p>
          <p id='myOrders'><i className="fas fa-shopping-cart"></i> <Link to="/orders" id='myOrdersLink'>Orders</Link></p>
          <p id='wishlist'><FaRegHeart id='wishlistIcon' /> Wishlist</p>
          <p id='help'> <IoIosHelpCircleOutline id='helpIcon' /> Help</p>
          {/* <p>FAQs</p> */}
          <p onClick={handleLogout} id='logoutBtn'><MdLogout style={{color:"rgb(0, 174, 239)",fontSize:"17px"}}/> Logout</p>
          </div>
        </div>
        </div>

       

          </>

      ):(
        <>
        <div className='regAndLoginBtn'>
        <Link to="/register" className='headerRegister'>Register</Link>
        <Link to="/login" className='headerLogin'>Login</Link>
        </div>
        </>
      ) 
        
      }
    </div>
  </div>

  {/* 🔷 Bottom Category Bar */}
  <div className='categoryBar'>
    <Link to="/allProducts">All Products</Link>
    <a href="#" >Yoga Essentials </a>
    <a href="#" >Wellness Products </a>
    <a href="#" >Skin Care and Beauty </a>
    <a href="#" >Yogic Home Decor </a>
    <a href="#" >Blog </a>
    <a href="#" >About Us </a>
    <a href="#" >Contact </a>
  </div>
</div>



      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage  />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={
          <Login setCartCount={setCartCount} setUsername={setUsername} />
          } />
          <Route path='/allProducts' element={<AllProducts products={products} msg={msg} />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sort/:order" element={<Sort />} />
          <Route path="/product" element={<ProductForm />} />
          <Route path="/products" element={<VProducts />} />
          <Route path="/cart" element={<Cart setCartCount={setCartCount} />} />
          <Route path="/orders" element={<OrderTracking />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/product/:id" element={
          <ProductDetails setCartCount={setCartCount} />
          } />
        </Routes>
      </div>


      
      

    
        
      <Footer />
    </>
  );
}

export default App;
