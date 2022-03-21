import React, { useEffect } from "react";
import { useState } from "react";
import "./pageFooter.css";

function FooterItem({ label, isSelected = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`pf-item-style ${isSelected ? "pf-item-active-style" : ""}`}
    >
      {label}
    </div>
  );
}

export function PageFooter(props) {
  const [lastVisiblePageNum, setLastVisiblePageNum] = useState(
    props.maxPageNumsVisible
  );

  useEffect(() => {
    const _last = lastVisiblePageNum;
    const _first = lastVisiblePageNum - props.maxPageNumsVisible + 1;
    const _maxNumOfPages = Math.ceil(props.dataSize / props.pageSize);
    if (props.currentPage == _last && props.currentPage != _maxNumOfPages) {
      setLastVisiblePageNum(lastVisiblePageNum + 1);
    } else if (props.currentPage == _first && props.currentPage != 1) {
      setLastVisiblePageNum(lastVisiblePageNum - 1);
    }
  }, [props.currentPage]);

  function footerItemsList() {
    let _list = [];
    const _startNum = lastVisiblePageNum - props.maxPageNumsVisible + 1;

    _list.push(
      <FooterItem
        label={"<"}
        onClick={() => props.setPageNumberCallback(props.currentPage - 1)}
        isSelected={false}
      />
    );

    for (let i = 0; i < props.maxPageNumsVisible; i++) {
      _list.push(
        <FooterItem
          label={_startNum + i}
          onClick={() => props.setPageNumberCallback(_startNum + i)}
          isSelected={props.currentPage == _startNum + i}
        />
      );
    }

    _list.push(
      <FooterItem
        label={">"}
        onClick={() => props.setPageNumberCallback(props.currentPage + 1)}
        isSelected={false}
      />
    );
    return _list;
  }

  return <div className="pf-style">{footerItemsList()}</div>;
}
