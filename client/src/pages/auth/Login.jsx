import React, { useState } from "react";
import "./Auth.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAppOwner, setAuthUser } from "../../redux/authSlice";
import { baseUrl } from "../../utils/baseUrl";


function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!phoneNumber || !password) {
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(
                `${baseUrl}/user/login`,
                {
                    phnumber: phoneNumber,
                    password,
                },
                { withCredentials: true } // ✅ Important
            );

            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                console.log(res.data.user)
                dispatch(setAuthUser(res.data.user));
                dispatch(setAppOwner(res.data.user.isAppOwner));

                navigate('/')
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin} className="auth-form">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                <p>
                    No account? <a href="/signup">Create Account</a>
                </p>
            </form>
        </div>
    );
}

export default Login;
