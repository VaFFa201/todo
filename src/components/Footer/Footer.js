import React from 'react';
import './Footer.css';
import TaskFilter from '../TasksFilter';
import PropTypes from 'prop-types';

const Footer = ({ itemsLeft, onFilterChange, filter, deleteCompleteItems }) => {
    return (
        <footer className="footer">
            <span className="todo-count">{itemsLeft} items left</span>
            <TaskFilter onFilterChange={onFilterChange} filter={filter} />
            <button
                className="clear-completed"
                onClick={deleteCompleteItems}
            >Clear completed</button>
        </footer>
    );
};

Footer.defaultProps = {
    itemsLeft: -1,
    onFilterChange: () => { },
    filter: 'all',
    deleteCompleteItems: () => { },
}

Footer.propTypes = {
    itemsLeft: PropTypes.number,
    onFilterChange: PropTypes.func,
    filter: PropTypes.oneOf(['all', 'active', 'completed']),
    deleteCompleteItems: PropTypes.func,
}

export default Footer;