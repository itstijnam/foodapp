import React, { useState } from "react";
import "./Address.scss";

const AddressForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        landmark: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(formData);
        alert("Address Submitted Successfully 🚚");
    };

    return (
        <div className="address-form-container">
            <h2>Delivery Address</h2>
            <form onSubmit={handleSubmit} className="address-form">

                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Street Address</label>
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Street / House No."
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Zip Code</label>
                        <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            placeholder="Zip / Postal Code"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Landmark</label>
                        <input
                            type="text"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            placeholder="Nearby landmark (optional)"
                        />
                    </div>
                </div>

                <button type="submit" className="submit-btn">
                    Save Address
                </button>
            </form>
        </div>
    );
};

export default AddressForm;
