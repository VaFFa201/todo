import React, { Component } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {

    static defaultProps = {
        addItem: () => { },
    }

    static propTypes = {
        addItem: PropTypes.func,
    }

    state = {
        inputValue: ''
    }

    onLabelChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.inputValue);
        this.setState({ inputValue: '' });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    onChange={this.onLabelChange}
                    value={this.state.inputValue}
                    autoFocus
                />
            </form>
        );
    }
}
