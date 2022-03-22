import React, { useEffect, useState } from "react";
import { Api } from "../../api/api";
import { UserDataRow } from "../../models/userModel";
import DataGrid from "../../components/dataGrid/dataGrid";
import { Search } from "../../components/search/search";
import { Utils } from "../../utils/utils";
import "./users.css";
import NumberOfRecords from "../../components/numberOfRecords/numberOfRecords";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";

export default function Users() {
  const [response, setResponse] = useState([]);
  const [userRows, setUserRows] = useState([]);
  const [filterIsEmpty, setFilterIsEmpty] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const _usersList = await Api.getUsers();
      const _userRows = _usersList.map((_json) => new UserDataRow(_json));
      setResponse(_userRows);
      setUserRows(_userRows);
      setLoading(false);
    } catch (e) {
      console.log("somethings up: ", e);
      setLoading(false);
    }
  }, []);

  function handleSort(key, order) {
    const sortedData = Utils.sort(userRows, key, order);
    setUserRows((val) => {
      return sortedData;
    });
  }

  function handleFilter(query) {
    const filterData = Utils.filter(response, query);
    if (filterData == null || filterData.length == 0) {
      setFilterIsEmpty(true);
    } else {
      setFilterIsEmpty(false);
    }
    setUserRows((val) => {
      return filterData;
    });
  }

  function handleChangePageSize(pageSize) {
    setPageSize(pageSize);
  }

  return (
    <div className="users-container">
      {loading == true ? (
        <LoadingSpinner />
      ) : (
        <div className="users-container-style">
          <div className="users-header">Users</div>
          <Search
            filterCallback={handleFilter}
            size={userRows.length}
            changePageSizeCallback={handleChangePageSize}
          />
          <DataGrid
            data={userRows}
            filterIsEmpty={filterIsEmpty}
            pageSize={pageSize}
            sortCallback={handleSort}
            noDataText="Sorry! No Data present in table"
            noSearchResultsText="No Results"
          />
        </div>
      )}
    </div>
  );
}
