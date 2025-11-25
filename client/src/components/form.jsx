import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";

export const Formcontroller = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const update = location.state?.update || {};
  const [data, setData] = useState({
    name: update.name || "",
    age: update.age || "",
    detail: update.detail || "",
    number: update.number || "",
    professional: update.professional || "",
    id: update._id || null,
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleclick = (e) => {
    e.preventDefault();
    if (data._id) {
      navigate("/", { state: { update: data } });
    } else {
      navigate("/", { state: { newitem: data } });
    }
  };

  return (
    <div className="container container-fluid h-75 w-25">
      <div className="card h-50 w-100">
        <div className="card-body">
          <h2 className="card-header">Add data</h2>
          <form onSubmit={handleclick}>
            <label htmlFor="name">name</label>
            <input
              type="text"
              placeholder="input item name "
              name="name"
              id="name"
              value={data.name}
              onChange={handlechange}
            />
            <label htmlFor="age">age</label>
            <input
              type="text"
              placeholder="input item name "
              name="age"
              id="age"
              value={data.age}
              onChange={handlechange}
            />
            <label htmlFor="detail">detail</label>
            <input
              type="text"
              placeholder="input item name "
              name="detail"
              id="detail"
              value={data.detail}
              onChange={handlechange}
            />
            <label htmlFor="number">number</label>
            <input
              type="number"
              placeholder="input item name "
              name="number"
              id="number"
              value={data.number}
              onChange={handlechange}
            />
            <label htmlFor="professional">professional</label>
            <input
              type="text"
              placeholder="input item name "
              name="professional"
              id="professional"
              value={data.professional}
              onChange={handlechange}
            />
            <button type="submit">{data.id ? "update" : "Add"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};
