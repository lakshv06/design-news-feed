import React, { ReactElement } from "react";

function LoadingIndicator(): ReactElement {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
            </div>
            <span className="ml-2">Loading Data...</span>
        </div>
    );
}

export default LoadingIndicator;
