import React from 'react';
import './TasksFilter.css';
import PropTypes from 'prop-types'

const filterButtons = [
    { label: 'all' },
    { label: 'active' },
    { label: 'completed' }
];

const TaskFilter = ({ filter, onFilterChange }) => {

    const firstToUpper = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);

    const buttons = filterButtons.map(({ label }) => {

        const isSelected = label === filter;
        const classNames = isSelected ? 'selected' : '';

        return (
            <li key={label}>
                <button
                    className={classNames}
                    onClick={() => onFilterChange(label)}
                >
                    {firstToUpper(label)}
                </button>
            </li>)
    })

    return (
        <ul className="filters">
            {buttons}
        </ul>
    );

}

TaskFilter.defaultProps = {
    onFilterChange: () => { },
}

TaskFilter.propTypes = {
    onFilterChange: PropTypes.func,
    filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
}

export default TaskFilter
