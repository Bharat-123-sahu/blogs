import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ItemCard = ({ items }) => {
  return (
    
    <div className="card shadow-sm" style={{ width: "20rem" }}>
      <div className="card-body">
        <h5 className="card-title text-primary">{items.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{items.age}</h6>

        <p className="card-text mt-2">
          <strong>Material:</strong> {items.detail} <br />
          <strong>Price:</strong> ₹{items.number} <br />
          <strong>Details:</strong> {items.professional}
        </p>
      </div>
    </div>
);
};

export default ItemCard;
