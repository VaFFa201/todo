import { formatDistanceToNow } from 'date-fns';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {

    static defaultProps = {
        onTodoChange: () => { },
        onToggleDone: () => { },
        onDeleted: () => { },
    }

    static propTypes = {
        onTodoChange: PropTypes.func,
        onToggleDone: PropTypes.func,
        onDeleted: PropTypes.func,
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
        createTime: PropTypes.object.isRequired,
    }

    state = {
        isEditing: false,
        inputValue: this.props.label
    }

    toggleEditState = () => {
        this.setState(({ isEditing }) => {
            return {
                isEditing: !isEditing
            }
        })
    }

    onLabelChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onTodoChange(this.props.id, this.state.inputValue);
        this.toggleEditState();
    }

    render() {
        const { label, done, createTime, onToggleDone, onDeleted } = this.props;

        const { isEditing } = this.state

        const classNames = done ? 'completed' :
            isEditing ? 'editing' : '';

        return (
            <li className={classNames}>
                <div className="view" >
                    <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
                    <label>
                        <span
                            className="description"
                            onClick={onToggleDone}
                        >{label}</span>
                        <span className="created">created {formatDistanceToNow(createTime)} ago</span>
                    </label>
                    <button
                        className="icon icon-edit"
                        onClick={this.toggleEditState}
                    ></button>
                    <button
                        className="icon icon-destroy"
                        onClick={onDeleted}
                    ></button>
                </div>
                {isEditing ? <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        className="edit"
                        value={this.state.inputValue}
                        onChange={this.onLabelChange}
                    ></input>
                </form> : <span></span>}
            </li>
        )
    }
}
