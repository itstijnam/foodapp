import React, { useState } from "react";
import { Home, Star, User, Utensils, ClipboardList, ShoppingBag, ShoppingBasket, ShoppingCart } from "lucide-react";
import "./BottomNav.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAppOwner, setAuthUser } from "../../redux/authSlice";

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("home");

  const [profileDrop, setProfileDrop] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAppOwner } = useSelector(store => store.auth);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/logout",
        {},
        { withCredentials: true } // ✅ important for cookies
      );

      if (res.data.success) {
        localStorage.removeItem("token");
        dispatch(setAuthUser(null));
        dispatch(setAppOwner(false));
        navigate("/login");

      }
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    }
  };



  return (
    <nav className="bottom-nav">
      <div
        className={`nav-item ${activeTab === "home" ? "active" : ""}`}
        onClick={() => setActiveTab("home")}
      >
        <Home size={24} onClick={() => navigate('/')} />
        <span onClick={() => navigate('/')} >Home</span>
      </div>

      {/* <div 
        className={`nav-item ${activeTab === "favorites" ? "active" : ""}`}
        onClick={() => setActiveTab("favorites")}
      >
        <Star size={24} />
        <span>Favorites</span>
      </div> */}

      {/* <div
        className={`nav-item ${activeTab === "favorites" ? "active" : ""}`}
        onClick={() => setActiveTab("favorites")}
      >
        <ShoppingCart size={24} onClick={() => navigate('checkout')} />
        <span onClick={() => navigate('checkout')} >Cart</span>
      </div>

      <div
        className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
        onClick={() => setActiveTab("orders")}
      >
        {isAppOwner ? (
          <>
            <ClipboardList size={24}  onClick={() => navigate('orders')}/>
            <span onClick={() => navigate('orders')} >Orders</span>
          </>
        ) : (
          < >
            <Utensils size={24} onClick={() => navigate('my-order')} />
            <span onClick={() => navigate('my-order')} >My Orders</span>
          </>
        )}
      </div> */}

      <div
        className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
        onClick={() => setActiveTab("profile")}
      >
        {profileDrop &&
          <div className="profileDropdown">
            <ul>
              {user ?
                <li onClick={logoutHandler}>Logout</li>
                :
                <li onClick={()=>navigate('/login')} >Login</li>
              }
            </ul>
          </div>
        }
        <User size={24} onClick={() => setProfileDrop(!profileDrop)} />
        <span onClick={() => setProfileDrop(!profileDrop)}>Profile</span>
      </div>
    </nav>
  );
};

export default BottomNav;