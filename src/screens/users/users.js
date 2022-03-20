import React, { useEffect, useState } from "react";
import { Api } from "../../api/api";
import { UserDataRow } from "../../models/userModel";

export default function Users() {
  const [userRows, setUserRows] = useState([]);

  useEffect(async () => {
    try {
      const _usersList = await Api.getUsers();
      const _userRows = _usersList.map((_json) => new UserDataRow(_json));
      setUserRows(_userRows);
    } catch (e) {
      console.log("somethings up: ", e);
    }
  }, []);

  return <>{userRows.map((val) => <div>{val.first_name}</div>)}</>;
}
