import axios from "axios";
import React from "react";

const Context = React.createContext();
//First we need to create a varibale by using a createContext() method.

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((item) => item.id !== action.payload),
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.payload.id) {
            return (item = action.payload);
          } else {
            return item;
          }
        }),
      };
  }
};

export class Provider extends React.Component {
  // Inside this we will define our state
  state = {
    contacts: [],
    dispatch: (action) =>
      this.setState((state) => {
        return reducer(state, action);
      }),
  };
  async componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/users";
    // const response = await fetch(url);
    // const data = await response.json();
    // if (response.status === 200) {
    //   this.setState({
    //     contacts: data,
    //   });
    // }
    const response = await axios.get(url);
    this.setState({ contacts: response.data });
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
