// import { useEffect, useState } from "react";
// import API from "./api";
// import "../Css/OrderItem.css"


// function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const [page, setPage] = useState(0); // zero-based index
//   const [totalPages, setTotalPages] = useState(0);

//   const fetchOrders = async (pageNumber = 0) => {
//     try {
//       const res = await API.get("/api/admin/orders", {
//         params: { page: pageNumber, size: 2 },
//       });
//       setOrders(res.data.content);
//       setPage(res.data.number);
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders(page);
//   }, []);

//   const handlePageChange = (newPage) => {
//     fetchOrders(newPage);
//   };

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await API.put(`/api/admin/orders/${orderId}/status`, null, {
//         params: { status: newStatus },
//       });

//     fetchOrders(page);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDeleteOrder = async (orderId) => {
//     if (!window.confirm("Are you sure you want to delete this order?")) return;

//     try {
//       await API.delete(`/api/admin/orders/${orderId}`);
//       // Re-fetch the orders for the current page
//       fetchOrders(page);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }} className="adminOrdersContainer">
//       <h2>All Orders</h2>
//       <div className="ordersWrapper">
//       {orders.map((order) => (
//         <div key={order.id} style={{ border: "2px solid black", marginTop:"3%", padding: "10px",width:"25%",display:"flex",flexDirection:"column",alignItems:"start",gap:"10px", paddingLeft:"7%",borderRadius:"10px",backgroundColor:"white" }}>

//           <p><strong>Order ID:</strong> {order.id}</p>
//           <p><strong>User:</strong> {order.username}</p>

//           {/* ✅ Status Select */}
//           <p><strong>Status:</strong> 
//             <select
//               value={order.status}
//               onChange={(e) => handleStatusChange(order.id, e.target.value)}
//               style={{ marginLeft: "10px" }}
//             >
//               <option value="Placed">Placed</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </p>


//          <h4>Items:</h4>
//           {order.items.map((item) => (
//             <>
            
//             <p key={item.id}>{item.product.name} x {item.quantity}</p>
//             <img src={item.product.imageUrl} alt="book" width={100} />
            
//             </>
//           ))}

//           {/* ✅ Delete button */}
//           <button onClick={() => handleDeleteOrder(order.id)} style={{ background: "red", color: "white" }}>
//             Delete Order
//           </button>
//         </div>
//       ))}
//       </div>

//       {/* ✅ Pagination */}
//       <div style={{ marginTop: "20px" }} className="paginationBtns">
//         <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
//           Prev
//         </button>

//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             style={{ margin: "0 5px", fontWeight: page === index ? "bold" : "normal" }}
//             onClick={() => handlePageChange(index)}
//           >
//             {index + 1}
//           </button>
//         ))}

//         <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AdminOrders;

























import { useEffect, useState } from "react";
import API from "./api";
import "../Css/OrderItem.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(0);

  const fetchOrders = async (pageNumber = 0) => {
    try {
      const res = await API.get("/api/admin/orders", {
        params: { page: pageNumber, size: 2 },
      });
      setOrders(res.data.content);
      setPage(res.data.number);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, []);

  const handlePageChange = (newPage) => {
    fetchOrders(newPage);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/api/admin/orders/${orderId}/status`, null, {
        params: { status: newStatus },
      });
      fetchOrders(page);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await API.delete(`/api/admin/orders/${orderId}`);
      fetchOrders(page);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-orders-container">
      <h2>All Orders</h2>

      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>User:</strong> {order.username}</p>

            <p><strong>Status:</strong> 
               <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                <option value="Placed">Placed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </p>

            <h4>Items:</h4>
            {order.items.map((item) => (
              <div key={item.id}>
                <p>{item.product.name} x {item.quantity}</p>
                <img src={item.product.imageUrl} alt="book" className="order-image" />
              </div>
            ))}

            <button onClick={() => handleDeleteOrder(order.id)} className="delete-btn">
              Delete Order
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={page === index ? "active-page" : ""}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminOrders;
