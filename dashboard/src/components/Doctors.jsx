import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const judges = () => {
  const [judges, setjudges] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchjudges = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/judges",
          { withCredentials: true }
        );
        setjudges(data.judges);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchjudges();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page judges">
      <h1>judgeS</h1>
      <div className="banner">
        {judges && judges.length > 0 ? (
          judges.map((element) => {
            return (
              <div className="card">
                <img
                  src={element.docAvatar && element.docAvatar.url}
                  alt="judge avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.judgeDepartment}</span>
                  </p>
                  <p>
                    NIC: <span>{element.nic}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No eCourtRegistered judges Found!</h1>
        )}
      </div>
    </section>
  );
};

export default judges;
