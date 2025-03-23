import React from "react";
import "./ErrorAlert.css";

function ErrorAlert({ error }) {
    return (
        error && (
            <div className="error-alert">
                <div className="error-content">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <div className="error-message">
                        <h4 className="error-title">Error</h4>
                        <p className="error-text">{error.message}</p>
                    </div>
                </div>
            </div>
        )
    );
}

export default ErrorAlert;
