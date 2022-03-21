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
  const getMaxPageNumsVisible = () => {
    const _maxNumOfPages = Math.ceil(props.dataSize / props.pageSize);
    let _ret =
      _maxNumOfPages >= props.maxPageNumsVisible
        ? props.maxPageNumsVisible
        : _maxNumOfPages;
    return _ret;
  };

  const getMaxNumPages = () => Math.ceil(props.dataSize / props.pageSize);

  const [lastVisiblePageNum, setLastVisiblePageNum] = useState(
    getMaxPageNumsVisible()
  );

  function getLastPageNum() {
    const _last = lastVisiblePageNum;
    const _maxNumOfPages = getMaxNumPages();
    const _first = _last - getMaxPageNumsVisible() + 1;
    console.log("current first last", props.currentPage, _first, _last);
    if (props.currentPage == _last && props.currentPage != _maxNumOfPages) {
      return _last + 1;
    } else if (props.currentPage == _first && props.currentPage != 1) {
      return _last - 1;
    }
    return _last;
  }

  useEffect(() => {
    setLastVisiblePageNum(getMaxPageNumsVisible());
  }, [props.dataSize]);

  useEffect(() => {
    setLastVisiblePageNum(getLastPageNum());
  }, [props.currentPage]);

  function footerItemsList() {
    let _list = [];
    let _last = lastVisiblePageNum;
    let _maxNumOfPages = getMaxPageNumsVisible();
    const _startNum = _last - _maxNumOfPages + 1;

    _list.push(
      ...[
        <FooterItem
          key={"first"}
          label={"<<"}
          onClick={() => {
            setLastVisiblePageNum(getMaxPageNumsVisible());
            props.setPageNumberCallback(1);
          }}
          isSelected={false}
        />,
        <FooterItem
          key={"prev"}
          label={"<"}
          onClick={() => props.setPageNumberCallback(props.currentPage - 1)}
          isSelected={false}
        />,
      ]
    );

    for (let i = 0; i < _maxNumOfPages; i++) {
      _list.push(
        <FooterItem
          key={i}
          label={_startNum + i}
          onClick={() => props.setPageNumberCallback(_startNum + i)}
          isSelected={props.currentPage == _startNum + i}
        />
      );
    }

    _list.push(
      ...[
        <FooterItem
          key={"next"}
          label={">"}
          onClick={() => props.setPageNumberCallback(props.currentPage + 1)}
          isSelected={false}
        />,
        <FooterItem
          key={"last"}
          label={">>"}
          onClick={() => {
            setLastVisiblePageNum(getMaxNumPages());
            props.setPageNumberCallback(getMaxNumPages());
          }}
          isSelected={false}
        />,
      ]
    );
    return _list;
  }

  return <div className="pf-style">{footerItemsList()}</div>;
}
