import React, { useEffect, useState } from "react";
import { Api } from "../../api/api";
import { UserDataRow } from "../../models/userModel";
import DataGrid from "../../components/dataGrid/dataGrid";
import Search from "../../components/search";
import { Utils } from "../../utils/utils";
import "./users.css";

export default function Users() {
  const [userRows, setUserRows] = useState([]);

  useEffect(async () => {
    try {
      const _usersList = await Api.getUsers();
      const _userRows = _usersList.map((_json) => new UserDataRow(_json));
      setUserRows(_userRows);
      console.log("got data: ", _userRows);
    } catch (e) {
      console.log("somethings up: ", e);
    }
  }, []);

  function handleSort(key, order) {
    const sortedData = Utils.sort(userRows, key, order);
    setUserRows((val) => {
      return sortedData;
    });
  }

  return (
    <div className="users-container-style">
      {/* <Search /> */}
      <div className="users-header">Users</div>
      <DataGrid
        data={userRows}
        pageSize={10}
        sortCallback={handleSort}
        noDataText="Sorry! No Data present in table"
        noSearchResultsText="Search returned 0 rows. Please try searching something different"
      />
    </div>
  );
}
