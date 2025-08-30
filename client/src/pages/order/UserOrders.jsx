import React, { useState, useEffect } from "react";
import "./UserOrders.scss";

const UserOrders = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
            name: "Honest Burger",
            description: "Two strips of crispy applewood-smoked bacon and melted American cheese.",
            extras: "Extra: Bacon, Cheddar Cheese",
            qty: 1,
            price: 18,
            delivered: false,
            orderDate: "2023-06-15T14:30:00Z",
            estimatedDelivery: "2023-06-15T15:15:00Z"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
            name: "French Fries",
            description: "Hot, fresh boardwalk-style fries. Cooked twice and salted.",
            extras: "Without cutlery",
            qty: 1,
            price: 6,
            delivered: false,
            orderDate: "2023-06-15T14:30:00Z",
            estimatedDelivery: "2023-06-15T15:10:00Z"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
            name: "Margherita Pizza",
            description: "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
            extras: "Extra: Olives, Extra Cheese",
            qty: 2,
            price: 24,
            delivered: true,
            orderDate: "2023-06-14T19:45:00Z",
            estimatedDelivery: "2023-06-14T20:30:00Z"
        }
    ]);

    const [activeTab, setActiveTab] = useState("current");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("recent");

    useEffect(() => {
        // Simulate real-time order updates
        const interval = setInterval(() => {
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    !order.delivered && Math.random() > 0.9 
                        ? { ...order, delivered: true } 
                        : order
                )
            );
        }, 30000); // Check every 30 seconds

        return () => clearInterval(interval);
    }, []);

    const markDelivered = (id) => {
        setOrders(
            orders.map((order) =>
                order.id === id ? { ...order, delivered: true } : order
            )
        );
    };

    const filteredOrders = orders
        .filter(order => {
            const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                order.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            if (activeTab === "current") return !order.delivered && matchesSearch;
            if (activeTab === "past") return order.delivered && matchesSearch;
            return matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === "recent") return new Date(b.orderDate) - new Date(a.orderDate);
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "price-low") return a.price - b.price;
            return 0;
        });

    const totalSpent = orders
        .filter(order => order.delivered)
        .reduce((total, order) => total + (order.price * order.qty), 0);

    return (
        <div className="user-orders">
            <div className="orders-header">
                <h2>Your Orders</h2>
                <div className="stats-card">
                    <div className="stat">
                        <span className="stat-value">{orders.filter(o => o.delivered).length}</span>
                        <span className="stat-label">Orders Completed</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">${totalSpent}</span>
                        <span className="stat-label">Total Spent</span>
                    </div>
                </div>
            </div>

            <div className="orders-controls">
                <div className="tabs">
                    <button 
                        className={activeTab === "current" ? "active" : ""}
                        onClick={() => setActiveTab("current")}
                    >
                        Current Orders
                    </button>
                    <button 
                        className={activeTab === "past" ? "active" : ""}
                        onClick={() => setActiveTab("past")}
                    >
                        Past Orders
                    </button>
                    <button 
                        className={activeTab === "all" ? "active" : ""}
                        onClick={() => setActiveTab("all")}
                    >
                        All Orders
                    </button>
                </div>

                <div className="filters">
                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder="Search orders..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                    
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="recent">Most Recent</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="price-low">Price: Low to High</option>
                    </select>
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🍕</div>
                    <h3>No orders found</h3>
                    <p>Try changing your search or filter criteria</p>
                </div>
            ) : (
                <div className="orders-list">
                    {filteredOrders.map((order) => (
                        <OrderCard 
                            key={order.id} 
                            order={order} 
                            markDelivered={markDelivered} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const OrderCard = ({ order, markDelivered }) => {
    const [showDetails, setShowDetails] = useState(false);
    
    const formatDate = (dateString) => {
        const options = { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getStatusInfo = (order) => {
        if (order.delivered) {
            return { text: "Delivered", class: "delivered", icon: "✅" };
        }
        
        const now = new Date();
        const deliveryTime = new Date(order.estimatedDelivery);
        const minutesRemaining = Math.floor((deliveryTime - now) / 60000);
        
        if (minutesRemaining <= 0) {
            return { text: "Arriving anytime", class: "arriving", icon: "🚗" };
        } else if (minutesRemaining <= 5) {
            return { text: `Arriving in ${minutesRemaining} min`, class: "arriving-soon", icon: "🚗" };
        } else {
            return { text: `Expected in ${minutesRemaining} min`, class: "preparing", icon: "👨‍🍳" };
        }
    };

    const status = getStatusInfo(order);

    return (
        <div className={`order-card ${order.delivered ? "delivered" : "active"}`}>
            <div className="order-header">
                <span className="order-date">{formatDate(order.orderDate)}</span>
                <span className={`status ${status.class}`}>
                    {status.icon} {status.text}
                </span>
            </div>

            <div className="order-content">
                <img src={order.image} alt={order.name} className="order-img" />
                
                <div className="order-details">
                    <h3>{order.name}</h3>
                    <p className="desc">{order.description}</p>
                    <p className="extras">{order.extras}</p>
                    
                    {showDetails && (
                        <div className="order-details-expanded">
                            <div className="detail-row">
                                <span>Order ID:</span>
                                <span>#{order.id.toString().padStart(4, '0')}</span>
                            </div>
                            <div className="detail-row">
                                <span>Ordered at:</span>
                                <span>{formatDate(order.orderDate)}</span>
                            </div>
                            <div className="detail-row">
                                <span>Estimated delivery:</span>
                                <span>{formatDate(order.estimatedDelivery)}</span>
                            </div>
                        </div>
                    )}
                    
                    <button 
                        className="details-toggle"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? "Hide details" : "View details"}
                    </button>
                </div>
                
                <div className="order-meta">
                    <p className="quantity">{order.qty}x</p>
                    <p className="price">${order.price * order.qty}</p>
                    
                    {!order.delivered ? (
                        <button 
                            className="deliver-btn"
                            onClick={() => markDelivered(order.id)}
                        >
                            Mark Delivered
                        </button>
                    ) : (
                        <button className="reorder-btn">Reorder</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserOrders;