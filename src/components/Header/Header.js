import React from 'react';
import './Header.css';
import NewTaskForm from '../NewTaskForm';
import PropTypes from 'prop-types'

const Header = ({ addItem }) => {
    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm addItem={addItem} />
        </header>
    );
};

Header.defaultProps = {
    addItem: () => { },
}

Header.propTypes = {
    addItem: PropTypes.func,
}


export default Header;