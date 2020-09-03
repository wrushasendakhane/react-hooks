import React, { useState, useCallback, useReducer } from "react";
import { Fragment } from "react";
import AddItem from "./addItem";
import SearchItem from "../components/searchItem";
import axios from "../axios-grocery";

import GroceryItem from "../components/groceryItem";
import ErrorModal from "../components/errorModal";

const groceryItemsReducer = (groceryItems, action) => {
  switch (action.type) {
    case "SET":
      return action.groceryItems;
    case "ADD":
      return [...groceryItems, action.groceryItem];
    case "REMOVE":
      return groceryItems.filter((item) => item.id !== action.id);
    default:
      throw new Error("Should not get here!");
  }
};

function GroceryList(props) {
  const [groceryItems, dispatch] = useReducer(groceryItemsReducer, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const loadItems = useCallback((groceryItems) => {
    dispatch({ type: "SET", groceryItems: groceryItems });
  }, []);

  const addItem = async (item) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/groceryItems.json", item);
      item["id"] = data.name;
      dispatch({ type: "ADD", groceryItem: item });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const removeItem = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/groceryItems/${id}.json`);
      dispatch({ type: "REMOVE", id: id });
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
      {groceryItems.length > 0 &&
        groceryItems.map((item) => (
          // item.id
          <GroceryItem key={item.id} item={item} onRemove={removeItem} />
        ))}
    </Fragment>
  );
}

export default GroceryList;
