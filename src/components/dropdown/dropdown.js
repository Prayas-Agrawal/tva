import React, { useState } from "react";
import "./dropdown.css";

export default function Dropdown({ changePageSizeCallback }) {
  const [text, setText] = useState(10);

  return (
    <>
      <label class="dropdown">
        <div class="dd-button">{text} records</div>

        <input type="checkbox" class="dd-input" id="test" />

        <ul class="dd-menu">
          {[10, 25, 50, 100].map((val) => {
            return (
              <li
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
