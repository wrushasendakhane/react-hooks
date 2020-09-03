import React, { useEffect, Fragment } from "react";
import $ from "jquery";
const ErrorModal = (props) => {
  useEffect(() => {
    if (props.children) {
      $("#errorModal").show();
    }
  });
  return (
    <Fragment>
      <div
        id="errorModal"
        className="modal"
        data-backdrop="static"
        tabIndex="-1"
        role="dialog"
        onClick={() => $("#errorModal").hide()}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            "z-index": 100,
            left: 0,
            top: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <p>{props.children}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ErrorModal;
