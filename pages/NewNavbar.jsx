import { useState } from "react";





const NewNavbar=()=>{
    return(
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
    </div>

    {/* 🔹 Cart & Profile Icons */}
    <div className='cartIcon'>
      
      <Link className="nav-link" id="cartLink" to="/cart">
        <i className="fas fa-shopping-cart"></i>
        Cart
      </Link>

      {username ? (
          <>
            <li className="nav-item dropdown" style={{ listStyle: 'none' }}>
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
        </li>
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
        
        </>
    )
}
export default NewNavbar;