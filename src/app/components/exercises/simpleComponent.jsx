import React from "react";
import PropTypes from "prop-types";

const SimpleComponent = ({ onLogin, onLogOut, isAuth }) => {
    return isAuth ? (
        <button className="btn btn-secondary" onClick={onLogOut}>
            Выйти
        </button>
    ) : (
        <button className="btn btn-warning" onClick={onLogin}>
            Войти
        </button>
    );
};

SimpleComponent.propTypes = {
    isAuth: PropTypes.bool,
    onLogin: PropTypes.func,
    onLogOut: PropTypes.func
};

export default SimpleComponent;
