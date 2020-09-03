import React, { useCallback, useReducer } from "react";
import { Fragment } from "react";
import AddItem from "./addItem";
import SearchItem from "../components/searchItem";
import axios from "../axios-grocery";

import GroceryItem from "../components/groceryItem";
import ErrorModal from "../components/errorModal";

const groceryItemsReducer = (prevState, action) => {
  switch (action.type) {
    case "SET":
      return action.groceryItems;
    case "ADD":
      return [...prevState, action.groceryItem];
    case "REMOVE":
      return prevState.filter((item) => item.id !== action.id);
    default:
      throw new Error("Should not get here!");
  }
};

const httpReducer = (prevState, action) => {
  switch (action.type) {
    case "HTTP_SEND":
      return { loading: true, error: null };
    case "HTTP_RESPONSE":
      return { ...prevState, loading: false };
    case "HTTP_ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR_ERROR":
      return { ...prevState, error: null };
    default:
      throw new Error("Should not be here!");
  }
};

function GroceryList(props) {
  const [groceryItems, dispatch] = useReducer(groceryItemsReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });
  const loadItems = useCallback((groceryItems) => {
    dispatch({ type: "SET", groceryItems: groceryItems });
  }, []);

  const addItem = async (item) => {
    try {
      dispatchHttp({ type: "HTTP_SEND" });
      const { data } = await axios.post("/groceryItems.json", item);
      item["id"] = data.name;
      dispatch({ type: "ADD", groceryItem: item });
      dispatchHttp({ type: "HTTP_RESPONSE" });
    } catch (error) {
      dispatchHttp({ type: "HTTP_ERROR", errorMessage: error.message });
    }
  };

  const removeItem = async (id) => {
    try {
      dispatchHttp({ type: "HTTP_SEND" });
      await axios.delete(`/groceryItems/${id}.json`);
      dispatch({ type: "REMOVE", id: id });
      dispatchHttp({ type: "HTTP_RESPONSE" });
    } catch (error) {
      dispatchHttp({ type: "HTTP_ERROR", errorMessage: error.message });
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };
  return (
    <Fragment>
      {httpState.error && (
        <ErrorModal clearError={clearError}>{httpState.error}</ErrorModal>
      )}
      <div className="row">
        <div className="col">
          <div className="shadow p-3 mb-2 bg-white rounded">
            <AddItem onAdd={addItem} loading={httpState.loading} />
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
