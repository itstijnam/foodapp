import React, { useState } from "react";
import "./OrdersPage.scss";

const OrdersPage = () => {
    const [orders, setOrders] = useState([
        {
            id: 101,
            customer: "Rahul Sharma",
            address: "123, MG Road, Delhi",
            items: [
                { name: "Cheese Burger", qty: 2, price: 120 },
                { name: "French Fries", qty: 1, price: 60 },
            ],
            total: 300,
            status: "Pending",
        },
        {
            id: 102,
            customer: "Priya Gupta",
            address: "45, Park Street, Mumbai",
            items: [{ name: "Veg Pizza", qty: 1, price: 250 }],
            total: 250,
            status: "Preparing",
        },
        {
            id: 103,
            customer: "Amit Verma",
            address: "88, Sector 10, Noida",
            items: [{ name: "Pasta", qty: 2, price: 150 }],
            total: 300,
            status: "Delivered",
        },
    ]);

    const updateStatus = (id, newStatus) => {
        setOrders(
            orders.map((order) =>
                order.id === id ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <div className="orders-page">
            <h1>Customer Orders</h1>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Address</th>
                        <th>Items</th>
                        <th>Total (₹)</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.address}</td>
                            <td>
                                {order.items.map((item, idx) => (
                                    <div key={idx}>
                                        {item.name} × {item.qty} = ₹{item.qty * item.price}
                                    </div>
                                ))}
                            </td>
                            <td>₹{order.total}</td>
                            <td>
                                <span className={`status ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>
                                <select
                                    value={order.status}
                                    onChange={(e) => updateStatus(order.id, e.target.value)}
                                >
                                    <option>Pending</option>
                                    <option>Preparing</option>
                                    <option>Delivered</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;
