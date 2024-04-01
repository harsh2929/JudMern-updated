import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const FileCaseForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [FileCaseDate, setFileCaseDate] = useState("");
  const [department, setDepartment] = useState("litigation");
  const [judgeFirstName, setjudgeFirstName] = useState("");
  const [judgeLastName, setjudgeLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "litigation",
    "arbitration",
    "justice",
    "mediation",
    "sample",
    "sample2",
    "sample23",
    "sample3",
    "ENT",
  ];

  const [judges, setjudges] = useState([]);
  useEffect(() => {
    const fetchjudges = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/judges",
        { withCredentials: true }
      );
      setjudges(data.judges);
      console.log(data.judges);
    };
    fetchjudges();
  }, []);
  const handleFileCase = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/FileCase/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          FileCase_date: FileCaseDate,
          department,
          judge_firstName: judgeFirstName,
          judge_lastName: judgeLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setNic(""),
        setDob(""),
        setGender(""),
        setFileCaseDate(""),
        setDepartment(""),
        setjudgeFirstName(""),
        setjudgeLastName(""),
        setHasVisited(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component FileCase-form">
        <h2>FileCase</h2>
        <form onSubmit={handleFileCase}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              placeholder="FileCase Date"
              value={FileCaseDate}
              onChange={(e) => setFileCaseDate(e.target.value)}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setjudgeFirstName("");
                setjudgeLastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select
              value={`${judgeFirstName} ${judgeLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setjudgeFirstName(firstName);
                setjudgeLastName(lastName);
              }}
              disabled={!department}
            >
              <option value="">Select judge</option>
              {judges
                .filter((judge) => judge.judgeDepartment === department)
                .map((judge, index) => (
                  <option
                    value={`${judge.firstName} ${judge.lastName}`}
                    key={index}
                  >
                    {judge.firstName} {judge.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button style={{ margin: "0 auto" }}>GET FileCase</button>
        </form>
      </div>
    </>
  );
};

export default FileCaseForm;
