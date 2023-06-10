import React, { Component } from 'react';
import './App.css';
import Footer from '../Footer';
import TaskList from '../TaskList';
import Header from './../Header';

export default class App extends Component {

    maxId = 0;

    state = {
        todos: [
            this.createItem('Completed task'),
            this.createItem('Editing task'),
            this.createItem('Active task'),
        ],
        filter: 'all',
    };

    deleteItem = (id) => {
        this.setState(({ todos }) => {
            const idx = todos.findIndex((el) => el.id === id)
            return {
                todos: [
                    ...todos.slice(0, idx),
                    ...todos.slice(idx + 1)
                ]
            }
        })
    }

    deleteCompleteItems = () => {
        this.setState(({ todos }) => {
            const newArr = todos.filter((todo) => todo.done === false)
            return {
                todos: [...newArr]
            }
        })
    }

    addItem = (label) => {
        const newItem = this.createItem(label)

        this.setState(({ todos }) => {
            return {
                todos: [newItem, ...todos]
            }
        })
    }

    createItem(label) {
        return {
            id: ++this.maxId,
            label,
            done: false,
            createTime: new Date(),
        }
    }

    onToggleDone = (id) => {
        this.setState(({ todos }) => {
            const idx = todos.findIndex((el) => el.id === id)

            const oldItem = todos[idx]
            const newItem = { ...oldItem, done: !oldItem.done }

            return {
                todos: [
                    ...todos.slice(0, idx),
                    newItem,
                    ...todos.slice(idx + 1),
                ]
            }
        })
    }

    onTodoChange = (id, newLabel) => {
        this.setState(({ todos }) => {
            const idx = todos.findIndex((el) => el.id === id)

            const oldItem = todos[idx]
            const newItem = { ...oldItem, label: newLabel }

            return {
                todos: [
                    ...todos.slice(0, idx),
                    newItem,
                    ...todos.slice(idx + 1),
                ]
            }
        })
    }

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    filterItems(items, filter) {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => (!item.done));
        } else if (filter === 'completed') {
            return items.filter((item) => item.done);
        }
    }

    render() {

        const { todos, filter } = this.state;
        const itemsLeft = todos.filter((el) => el.done === false).length;
        const curretnItems = this.filterItems(todos, filter);

        return (
            <div className="todoapp">
                <Header addItem={this.addItem} />
                <section className='main'>
                    <TaskList
                        todos={curretnItems}
                        onDeleted={this.deleteItem}
                        onToggleDone={this.onToggleDone}
                        onTodoChange={this.onTodoChange}
                    />
                    <Footer
                        itemsLeft={itemsLeft}
                        onFilterChange={this.onFilterChange}
                        filter={filter}
                        deleteCompleteItems={this.deleteCompleteItems}
                    />
                </section>
            </div>
        );
    }
}
