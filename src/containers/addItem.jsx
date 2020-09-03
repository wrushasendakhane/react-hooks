import React, { useState } from "react";

function AddItem(props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAdd({ name, amount });
    setName("");
    setAmount(0);
  };

  const changeHandler = ({ target }) => {
    switch (target.name) {
      case "name":
        setName(target.value);
        break;
      case "amount":
        setAmount(target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="card ">
      <div className="card-body">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              placeholder="Name"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              name="amount"
              value={amount}
              placeholder="Amount"
              onChange={changeHandler}
            />
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary btn-sm" type="submit">
                ADD ITEM
              </button>
            </div>
            <div className="col">
              {props.loading && (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
