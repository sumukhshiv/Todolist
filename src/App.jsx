import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null 
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      id: this.state.nextItemId, // a unique id identifying this item
      description: description, // a brief description of the todo item
      sessionsCompleted: 0, // how many times a pomodoro session has been completed
      isCompleted: false, // whether the item has 
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items: this.state.items.concat([newItem]),
      nextItemId: this.state.nextItemId+1
    })));
  }

  clearCompletedItems() {
    // TODO 7
    let arr = this.state.items;
    const result = arr.filter(item => !item.isCompleted);
    this.setState((prevState => ({
      items: result
    })));    
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    let arr = this.state.items;
    for(let i = 0; i < arr.length; i++) {
      if (arr[i].id == itemId) {
        arr[i].sessionsCompleted = arr[i].sessionsCompleted+1;
      }
     }
    this.setState((prevState => ({
      items: arr
    })));
  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
    let arr = this.state.items;
    for(let i = 0; i < arr.length; i++) {
      if (arr[i].id == itemId) {
        arr[i].isCompleted = !arr[i].isCompleted;
      }
     }
    this.setState((prevState => ({
      items: arr
    })));

    // let arr = this.state.items;
    let counter = 0;
    for(let i = 0; i < arr.length; i++) {
      if (arr[i].isCompleted) {
        counter = counter+1;
      }
     }
    console.log(counter);
    if (counter > 0) {
      this.setState((prevState => ({
        areItemsMarkedAsCompleted: true
      })));
    } else {
      this.setState((prevState => ({
        areItemsMarkedAsCompleted: false
      })));
    }
  }

  startSession(id) {
    this.setState((prevState => ({
      itemIdRunning: id,
      sessionIsRunning: true
    })));
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    return (
      <div className="flex-wrapper">
        {this.state.items.length > 0 ? (
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {this.state.areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
          </header>
          {/* TODO 4 */}
            {this.state.sessionIsRunning && <Timer
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
              autoPlays
              key={this.state.itemIdRunning}
            /> }
            <div className="items-container">
            {/* TODO 3:  display todo items */
            this.state.items.map((item) => (<TodoItem key={item.id} description={item.description} sessionsCompleted={item.sessionsCompleted} isCompleted={item.isCompleted} startSession={() => this.startSession(item.id)} toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}/>))}
            </div>
        </div>) : (<EmptyState/>)
        };
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
