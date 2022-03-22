import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageFooter } from "../pageFooter/pageFooter";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import "./dataGrid.css";

const DataRow = ({ user }) => {
  return (
    <tr>
      <td data-label="First name">
        <>
          <Link
            to={`/users/${user.id}`}
            style={{ textDecoration: "none", color: "black" }}
            state={{ user: user, from: "users" }}
          >
            {user.first_name}
          </Link>
        </>
      </td>
      <td data-label="Last name">
        <>{user.last_name}</>
      </td>
      <td data-label="Age">
        <>{user.age}</>
      </td>
      <td data-label="Email">
        <>{user.email}</>
      </td>
      <td data-label="Website">
        <>
          <a
            style={{ textDecoration: "none", color: "#0d6efd" }}
            href={user.web}
          >
            {user.web}
          </a>
        </>
      </td>
    </tr>
  );
};

const Heading = ({ name, keyName, sortCallback }) => {
  return (
    <th className="data-grid-header">
      <div className="thead">
        <div>{name}</div>
        <div className="sort-icons">
          <div className="sort-icon">
            <FaSortUp
              color="#bfbfbf"
              onClick={() => sortCallback(keyName, "asc")}
            />
          </div>
          <div className="sort-icon">
            <FaSortDown
              color="#bfbfbf"
              onClick={() => sortCallback(keyName, "desc")}
            />
          </div>
        </div>
      </div>
    </th>
  );
};

function getPageData(data, pageNum, pageSize) {
  const _startIndex = (pageNum - 1) * pageSize;
  const _endIndex = _startIndex + pageSize;
  return data.slice(_startIndex, _endIndex);
}

export default function DataGrid({
  pageSize,
  data,
  sortCallback,
  filterIsEmpty,
  noSearchResultsText,
}) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageData, setPageData] = useState(data);

  useEffect(() => {
    setPageData(getPageData(data, 1, pageSize));
  }, [data, pageSize]);

  useEffect(() => {
    setPageData(getPageData(data, pageNumber, pageSize));
  }, [pageNumber]);

  const columns = [
    {
      heading: "First Name",
      field: "first_name",
    },
    {
      heading: "Last Name",
      field: "last_name",
    },
    {
      heading: "Age",
      field: "age",
    },
    {
      heading: "Email",
      field: "email",
    },
    {
      heading: "Website",
      field: "web",
    },
  ];

  function handlePageNumberChange(pageNum) {
    const _maxNumOfPages = Math.ceil(data.length / pageSize);
    if (pageNum != 0 && pageNum != _maxNumOfPages + 1) {
      setPageNumber(pageNum);
    }
  }

  return (
    <div className="data-grid-container-style">
      <table className="data-grid-style">
        <thead>
          <tr>
            {columns.map((_col) => (
              <Heading
                name={_col.heading}
                keyName={_col.field}
                sortCallback={sortCallback}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {filterIsEmpty == false ? (
            pageData.map((el) => <DataRow key={el} user={el} />)
          ) : (
            <tr>
              <td colspan="100%" style={{ textAlign: "center" }}>
                {noSearchResultsText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <PageFooter
        pageSize={pageSize}
        maxPageNumsVisible={5}
        dataSize={data.length}
        setPageNumberCallback={handlePageNumberChange}
        currentPage={pageNumber}
      />
    </div>
  );
}
