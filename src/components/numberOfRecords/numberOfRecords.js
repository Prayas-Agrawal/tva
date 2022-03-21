import React from "react";
import "./numberOfRecords.css";

export default function NumberOfRecords(props) {
  let _recordText = props.size + " records";
  if (props.size == 0) {
    _recordText = "No Records";
  } else if (props.size == 1) {
    _recordText = "1 record";
  }
  return (
    <div className="num-records-style">
      <div>{_recordText}</div>
    </div>
  );
}
