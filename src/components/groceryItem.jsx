import React from "react";
const groceryItem = (props) => {
  const { item } = props;
  return (
    <div className="shadow p-1 mb-1 bg-white rounded">
      <div className="row" onClick={() => props.onRemove(item.id)}>
        <div className="col">{item.name}</div>
        <div className="col text-right">{item.amount}</div>
      </div>
    </div>
  );
};

export default groceryItem;
