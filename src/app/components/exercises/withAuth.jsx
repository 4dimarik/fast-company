import React from "react";

const withAuth = (Component) => (props) => {
    const isAuth = Boolean(localStorage.getItem("auth"));
    const handleLogin = () => {
        localStorage.setItem("auth", "true");
    };
    const handleLogOut = () => {
        localStorage.removeItem("auth");
    };
    return (
        <Component
            {...props}
            onLogin={handleLogin}
            onLogOut={handleLogOut}
            isAuth={isAuth}
        />
    );
};

export default withAuth;
