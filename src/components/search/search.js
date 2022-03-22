import React, { useState } from "react";
import "./search.css";
import { BiSearch } from "react-icons/bi";
import Dropdown from "../dropdown/dropdown";
import NumberOfRecords from "../numberOfRecords/numberOfRecords";

export const Search = (props) => {
  const [query, setQuery] = useState("");

  function handleOnKeyDown(e) {
    if (e.key === "Enter") {
      props.filterCallback(query);
    }
  }

  return (
    <>
      <div className="search-bar-user">
        <div className="search-bar-container">
          <input
            className="search-input-style"
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            onKeyDown={handleOnKeyDown}
            placeholder="Search by first or last name"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <button
            onClick={(_) => props.filterCallback(query)}
            type="button"
            className="search-button-style"
          >
            <BiSearch color="black" />
          </button>
        </div>
        <Dropdown changePageSizeCallback={props.changePageSizeCallback} />
      </div>
      <NumberOfRecords size={props.size} />
    </>
  );
};
