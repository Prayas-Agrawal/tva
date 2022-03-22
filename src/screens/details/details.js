import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Api } from "../../api/api";
import { UserDetail } from "../../models/userModel";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./details.css";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";

function DataRow({ heading, value }) {
  return (
    <p>
      <span style={{ fontWeight: "300", color: "#262626" }}> {heading}</span> :
      <span style={{ fontWeight: "420" }}> {value}</span>
    </p>
  );
}

function Divider() {
  return (
    <div className="details-divider">
      <div
        style={{ height: "1px", width: "100%", backgroundColor: "#efefef" }}
      />
    </div>
  );
}

export const Details = (props) => {
  const [userData, setUserData] = useState({});
  const { userID } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    let _user = await Api.getUserByID(userID);
    setUserData(new UserDetail(_user));
    setLoading(false);
  }, []);

  const columns = [
    ["First Name", "first_name"],
    ["Last Name", "last_name"],
    ["Company Name", "company_name"],
    ["City", "city"],
    ["State", "state"],
    ["Zip", "zip"],
    ["Email", "email"],
    ["Web", "web"],
    ["Age", "age"],
  ];

  return (
    <div className="user-details-container">
      {loading == true ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="left">
            <Link to="/users">
              <AiOutlineArrowLeft size={40} color={"black"} />
            </Link>
          </div>
          <div className="user-details-style">
            <div
              style={{
                fontSize: "32px",
                fontWeight: "300",
                padding: "0px",
                margin: "0px",
              }}
            >
              Details: {userData.first_name} {userData.last_name}
            </div>
            <div style={{ height: "32px", width: "100%" }}></div>
            {columns.map((val, i) => {
              return (
                <>
                  <DataRow heading={val[0]} value={userData[val[1]]} />
                  {i == columns.length - 1 ? "" : <Divider />}
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
