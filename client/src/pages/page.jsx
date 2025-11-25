import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ItemCard from "../components/itemcard";
import "bootstrap/dist/css/bootstrap.min.css";

import { useLocation } from "react-router-dom";
import { ProtectedRoutes } from "../protectes";
import { Button } from "../components/button";

export const ItemContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemdata, setItemdata] = useState([]);

  useEffect(() => {
    try {
      const fatching = async () => {
        const res = await axios.get(` https://blogpost-mzlh.onrender.com/post`);
        setItemdata(res.data.data);
        console.log(res.data.data);
      };
      fatching();
    } catch (err) {
      console.log(`error occured ${err}`);
    }
  }, []);

  const newpost = location.state?.newitem;
  const update = location.state?.update || null;
  // console.log(newitem);

  useEffect(() => {
    if (!newpost) return;
    console.log(newpost);
    try {
      const adddata = async () => {
        const res = await axios.post(
          " https://blogpost-mzlh.onrender.com/post/add",
          newpost
        );
        setItemdata((prev) => [...prev, res.data.data]);
      };
      // navigate(".", { replace: true, state: null });
      adddata();
    } catch (err) {
      console.log(err.message);
    }
  }, [newpost]);
  useEffect(() => {
    if (!update || !update._id) return;
    try {
      const fetching = async () => {
        const res = await axios.patch(
          ` https://blogpost-mzlh.onrender.com/post/update/${update._id}`,
          update
        );
        setItemdata((prev) =>
          prev.map((item) => (item._id === update._id ? res.data.data : item))
        );
      };
      fetching();
    } catch (err) {
      console.log(err.message);
      console.log(err.response);
    }
  }, [update]);

  const handledelete = async (id) => {
    console.log(`delete id ${id}`);
    console.log(` https://blogpost-mzlh.onrender.com/post/delete/${id}`);
    try {
      const res = await axios.delete(
        ` https://blogpost-mzlh.onrender.com/post/delete/${id}`
      );
      // console.log("Delete Response:", res.data?.data?.user);
      setItemdata(itemdata.filter((item) => item._id !== id));
      alert(`item delete successfully ✅`, res);
    } catch (err) {
      console.log("❌ ERROR OCCURRED");
      console.log("❌ err.message:", err.message);
      console.log("❌ err.response:", err.response);
      console.log("❌ err.response.data:", err.response?.data);
      console.log("❌ err.response.status:", err.response?.status);
      console.log("❌ err.config:", err.config);
      alert(err.response?.data?.message || err.message || "delete failed");
    }
  };

  const handleadd = () => {
    navigate("/addpost");
  };
  const handleupdate = (item) => {
    navigate("/addpost", { state: { update: item } });
  };
  const handlelogin = () => {
    navigate("/login");
  };
  const handlesignup = () => {
    navigate("/signup");
  };

  return (
    <div className="container">
      <Button
        buttonname="login"
        button="btn btn-primary"
        handleclick={handlelogin}
      />

      <Button
        buttonname="signup"
        button="btn btn-primary"
        handleclick={handlesignup}
      />

      <br></br>
      <Button
        buttonname="Add"
        button="btn btn-primary"
        handleclick={handleadd}
      />

      <ul>
        {itemdata.length == 0 ? (
          <p>item list is empty</p>
        ) : (
          itemdata.map((item) => (
            <li key={item._id}>
              <ItemCard items={item} />
              <ProtectedRoutes>
                <Button
                  buttonname="Delete"
                  button="btn btn-danger"
                  handleclick={() => handledelete(item._id)}
                />
              </ProtectedRoutes>

              <Button
                buttonname="update"
                button="btn btn-warning"
                handleclick={() => handleupdate(item)}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
