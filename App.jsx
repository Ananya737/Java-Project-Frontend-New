// App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
  }


  // ✅ Logout function
  const handleLogout = () => {
    localStorage.clear();
    setUsername(null);
    setCartCount(0);
    window.location.href = "/login"; // Or use navigate
  };

  // ✅ Navbar component inside App
  function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/" id='logo'>Bookoholic</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">

              {/* ✅ Show Register/Login if NOT logged in */}
              {!username && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                </>
              )}

              <li className="nav-item"><Link className="nav-link" to="/products">Show Products</Link></li>

              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <i className="fas fa-shopping-cart"></i> Cart
                  {cartCount > 0 && (
                    <span className="badge bg-danger ms-1">{cartCount}</span>
                  )}
                </Link>
              </li>

              <li className="nav-item"><Link className="nav-link" to="/orders">Track Orders</Link></li>

              {/* ✅ Show dropdown if logged in */}
              {username && (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    {username}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                    
                  </ul>
                </li>
                
              )}

            </ul>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* <Navbar /> */}

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
          {/* <li className="nav-item dropdown" style={{ listStyle: 'none' }}>
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"

            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer',
            }}
          >
            <i
              className="fas fa-user"
            ></i>
            {username}
          </a>

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </li>
           
          </ul>
        </li> */}

        <div style={{display:"flex",gap:"5px"}} id='userIcon'> <i className="fas fa-user"></i> 
        {username}  
         <div id='sideBar'>
          <p onClick={handleLogout} id='logoutBtn'>Logout</p>

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
    <a href="#" >All Products </a>
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
          <Route path="/" element={<HomePage products={products} msg={msg} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={
          <Login setCartCount={setCartCount} setUsername={setUsername} />
          } />
          <Route path="/dashboard" element={<Dashboard />} />
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


      
      {/* {products.length === 0 && <p>No products found.</p>}

      <div className="productContainer">
        {products.map((p) => (
          <div className="products" key={p.id}>
            
            <img src={p.imageUrl} alt={p.name} width="200" />
            <h3>{p.name}</h3>
            <p>Price: ₹{p.price}</p>
            <p>Category: {p.category}</p>
            <button >Add to Cart</button>
          </div>
        ))}
      </div> */}

    
        
      <Footer />
    </>
  );
}

export default App;
