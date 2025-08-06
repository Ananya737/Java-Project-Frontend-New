import { useEffect, useState } from "react";
import API from "./api";
import "../Css/OrderItem.css"

function OrderTracking() {
  const [orders, setOrders] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/api/orders", {
        params: { username }
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadInvoice = async (orderId) => {
    try {
      const res = await API.get(`/api/invoice/${orderId}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('❌ Error downloading invoice:', err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="orderHeading">{username}'s Orders</h2>

      {orders.length === 0 && <p>No orders found.</p>}
<div className="itemCon">
      {orders.map(order => (
        <div
          key={order.id}
          className="items"
        >
          {/* <h3>Order #{order.id}</h3> */}
           <div>
          <h4>Items:</h4>
          {order.items.map(item => (
            <div key={item.id} id="products">
              <p>{item.product.name} - Qty: {item.quantity}</p>
              <img src={item.product.imageUrl} alt={item.product.name} width="50" />
            </div>
          ))}

          
          </div>
          <div className="orderDetails">
          {order.status==="Delivered" && <div className="status"> <p>Status:</p> <p style={{color:"green"}}> {order.status}</p></div>}
          {order.status==="PLACED" && <div className="status"> <p>Status:</p> <p style={{color:"black"}}> {order.status}</p></div>}
          <p>Total: ₹{order.totalAmount}</p>
          <p>Payment ID: {order.paymentId}</p>
          {/* ✅ Download Invoice Button INSIDE the order box */}
          <button
            style={{ marginTop: "10px" }}
            onClick={() => downloadInvoice(order.id)}
            className="downloadBtn"
          >
            Download Invoice
          </button>

          </div>
         
        </div>
      ))}
      </div>
    </div>
  );
}

export default OrderTracking;
