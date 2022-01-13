import React from 'react';
import {useNavigate} from "react-router";
import {ABOUT_ROUTE, CALCULATE_ROUTE, TABLE_ROUTE} from "../utils/consts";

const NavBar = () => {

    const navigate = useNavigate()

    return (
        <div className="uk-container">
            <nav className="uk-navbar-container" uk-navbar>
                <div className="uk-navbar-left">
                    <a className="uk-navbar-item uk-logo" onClick={() => navigate(TABLE_ROUTE)}>Users activity</a>
                    <ul className="uk-navbar-nav">
                        <li>
                            <a onClick={() => navigate(TABLE_ROUTE)}>
                                Home
                            </a>
                        </li>
                    </ul>
                    <ul className="uk-navbar-nav">
                        <li>
                            <a onClick={() => navigate(ABOUT_ROUTE)}>
                                About
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    );
};

export default NavBar;