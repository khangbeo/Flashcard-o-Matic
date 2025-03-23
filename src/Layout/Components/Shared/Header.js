import React from "react";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <div className="header-brand">
                    <h1 className="header-title">
                        <span className="highlight">StudyCarrd</span>
                    </h1>
                </div>
                <p className="header-tagline">Simple, effective study cards</p>
            </div>
        </header>
    );
}

export default Header;
