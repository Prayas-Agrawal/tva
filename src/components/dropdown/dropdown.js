import React, { useState } from "react";
import "./dropdown.css";

export default function Dropdown({ changePageSizeCallback }) {
  const [text, setText] = useState(10);

  return (
    <>
      <label className="dropdown">
        <div className="dd-button">{text} records</div>

        <input type="checkbox" className="dd-input" id="test" />

        <ul className="dd-menu">
          {[10, 25, 50, 100].map((val) => {
            return (
              <li
                key={Math.random()}
                onClick={(e) => {
                  setText(e.target.innerText);
                  changePageSizeCallback(parseInt(e.target.innerText));
                }}
              >
                {val}
              </li>
            );
          })}
        </ul>
      </label>
    </>
  );
}
