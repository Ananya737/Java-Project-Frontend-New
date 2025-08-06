import { useState, useEffect } from "react";
import API from "./api";  
import "../Css/AdminDashboard.css"


function ProductForm() {

  const [form, setForm] = useState({
    name: "",
    price: "",
    mrp: "",
    description: "",
    category: "",
    image: null,
  });

  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");


  // const handleDelete=async()=>{
  //   try {
  //     const api="http://localhost:8080/admin/products/delete";
  //     const res = await API.delete(api);
  //     fetchProducts();
  //     setMsg(res.data);
  //   } catch (err) {
  //     console.error(err);
  //     setMsg("Error fetching products.");
  //   }
  // }
  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm({
      ...form,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("mrp", form.mrp);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("image", form.image);

    try {
      await API.post("/admin/products", formData);

      setMsg("Product added!");
      setForm({
        name: "",
        price: "",
        mrp: "",
        description:"",
        category: "",
        image: null,
      });

      fetchProducts();
    } catch (err) {
      console.error(err);
      setMsg("Error adding product.");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get("/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setMsg("Error fetching products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h2  className="productPageHeading">Add Product</h2>
      <p style={{color:"red"}}>{msg}</p>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="productName"
        /><br />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="productPrice"
        /><br />
        <input
          name="mrp"
          placeholder="MRP"
          type="number"
          value={form.mrp}
          onChange={handleChange}
          className="mrp"
        /><br />
        <input
          name="description"
          placeholder="Description"
          type="text"
          value={form.description}
          onChange={handleChange}
          className="description"
        /><br />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="productCategory"
        /><br />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="productFile"
        /><br />
        <button type="submit" className="addProductBtn">Add Product</button>
      </form>

      {/* <button onClick={handleDelete}>Delete products</button> */}

      


      <h2 className="productPageHeading">Products</h2>
      <div className="adminProductCardContainer" >
      {products.map((p) => (
        <div key={p.id} style={{ margin: "20px 0" }} className="adminProductCard">
          <h3>{p.name}</h3>
           <img src={p.imageUrl} alt={p.name} width="70%" />
          
          <p>Price: ₹{p.price}</p>
          <p>Category: {p.category}</p>
         
        </div>
      ))}
      </div>
     
    </div>
  );
}

export default ProductForm;
