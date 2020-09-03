import React, { useRef, useState, useEffect } from "react";
import axios from "../axios-grocery";
const SearchItem = (props) => {
  const { onFilter } = props;
  const [searchName, setSearchName] = useState("");
  const searchRef = useRef("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchData = async () => {
        const queryParams =
          searchName.length === 0
            ? ""
            : `?orderBy="name"&equalTo="${searchName}"`;
        const { data } = await axios.get("/groceryItems.json" + queryParams);
        const items = [];
        for (const key in data) {
          items.push({ id: key, ...data[key] });
        }
        onFilter(items);
      };
      fetchData();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchName, onFilter]);

  const changeHandler = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <div className="row">
      <label htmlFor="filterName" className="col-sm-4 col-form-label">
        Filter By Name:
      </label>
      <div className="col-sm-8">
        <input
          type="text"
          className="form-control"
          id="filterName"
          placeholder="Search..."
          ref={searchRef}
          value={searchName}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};

export default SearchItem;
