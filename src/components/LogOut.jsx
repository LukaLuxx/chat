import React from "react";
import { Link } from "react-router-dom";
import ChatFeed from "./ChatFeed";
import Login from "./Login";

const handleLogout = () => {
    if (<ChatFeed /> ? <Login /> : <ChatFeed />);
};

const LogOut = () => (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
);

export default LogOut;
