import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [FileCases, setFileCases] = useState([]);

  useEffect(() => {
    const fetchFileCases = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/FileCase/getall",
          { withCredentials: true }
        );
        setFileCases(data.FileCases);
      } catch (error) {
        setFileCases([]);
      }
    };
    fetchFileCases();
  }, []);

  const handleUpdateStatus = async (FileCaseId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/FileCase/update/${FileCaseId}`,
        { status },
        { withCredentials: true }
      );
      setFileCases((prevFileCases) =>
        prevFileCases.map((FileCase) =>
          FileCase._id === FileCaseId
            ? { ...FileCase, status }
            : FileCase
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {admin &&
                    `${admin.firstName} ${admin.lastName}`}{" "}
                </h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total FileCases</p>
            <h3>1500</h3>
          </div>
          <div className="thirdBox">
            <p>eCourtRegistered judges</p>
            <h3>10</h3>
          </div>
        </div>
        <div className="banner">
          <h5>FileCases</h5>
          <table>
            <thead>
              <tr>
                <th>litigant</th>
                <th>Date</th>
                <th>judge</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {FileCases && FileCases.length > 0
                ? FileCases.map((FileCase) => (
                    <tr key={FileCase._id}>
                      <td>{`${FileCase.firstName} ${FileCase.lastName}`}</td>
                      <td>{FileCase.FileCase_date.substring(0, 16)}</td>
                      <td>{`${FileCase.judge.firstName} ${FileCase.judge.lastName}`}</td>
                      <td>{FileCase.department}</td>
                      <td>
                        <select
                          className={
                            FileCase.status === "Pending"
                              ? "value-pending"
                              : FileCase.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={FileCase.status}
                          onChange={(e) =>
                            handleUpdateStatus(FileCase._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>{FileCase.hasVisited === true ? <GoCheckCircleFill className="green"/> : <AiFillCloseCircle className="red"/>}</td>
                    </tr>
                  ))
                : "No FileCases Found!"}
            </tbody>
          </table>

          {}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
