import React, { useEffect, useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const fetchUserInformation = async (userId) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NDdiNzNjOC01ZGMzLTQ2ZWUtOGU0Yy1iZDlmYmFmN2RlN2YiLCJpYXQiOjE2NTU4OTU4MzQsImV4cCI6MTY1NTg5NzYzNCwidHlwZSI6ImFjY2VzcyJ9.M1OhiIHkoGjPUhWiWO0pQMOjzxRTxxPNRE4OGnlP_Og";
    try {
      let data = await fetch(`http://192.168.1.116:3000/v1/user/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      data = await data.json();
      setUserData(data);
      console.log("data", data);
    } catch (error) {
      console.error("error---", error);
    }
  };
  useEffect(() => {
    fetchUserInformation("747b73c8-5dc3-46ee-8e4c-bd9fbaf7de7f");
  }, []);
  return (
    <UserContext.Provider
      value={{
        userData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
