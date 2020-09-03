import React, { useState, useCallback } from "react";
import { Fragment } from "react";
import AddItem from "./addItem";
import SearchItem from "../components/searchItem";
import axios from "../axios-grocery";

import GroceryItem from "../components/groceryItem";
import ErrorModal from "../components/errorModal";

function GroceryList(props) {
  const [groceryItems, setGroceryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const loadItems = useCallback(
    (groceryItems) => {
      setGroceryItems(groceryItems);
    },
    [setGroceryItems]
  );

  const addItem = async (item) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/groceryItems.json", item);
      item["id"] = data.name;
      setGroceryItems((prevState) => {
        return [...prevState, item];
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const removeItem = (id) => {
    try {
      setLoading(true);
      axios.delete(`/groceryItems/${id}.json`);
      setGroceryItems((prevState) =>
        prevState.filter((item) => item.id !== id)
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const clearError = () => {
    setError(null);
  };
  return (
    <Fragment>
      {error && <ErrorModal clearError={clearError}>{error}</ErrorModal>}
      <div className="row">
        <div className="col">
          <div className="shadow p-3 mb-2 bg-white rounded">
            <AddItem onAdd={addItem} loading={loading} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="shadow p-3 mb-2 bg-white rounded">
            <SearchItem onFilter={loadItems} />
          </div>
        </div>
      </div>
      {groceryItems.length > 0 && <h1>Loaded Items</h1>}
      {groceryItems.map((item) => (
        <GroceryItem key={item.id} item={item} onRemove={removeItem} />
      ))}
    </Fragment>
  );
}

export default GroceryList;
