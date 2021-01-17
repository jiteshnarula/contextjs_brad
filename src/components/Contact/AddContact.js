import axios from "axios";
import React, { Component } from "react";
import { Consumer } from "../../context";

export default class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
  };
  handleChange = (e) => {
    return this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (dispatch, contactsState, e) => {
    e.preventDefault();
    // let lastIndex = contactsState.length;
    // let newContact = {
    //   ...this.state,
    //   id: contactsState[lastIndex - 1].id + 1,
    // };
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await axios.post(url, this.state);
    if (response.status === 201) {
      const responseID = response.data.id;
      let newContact = {
        ...this.state,
        id: responseID,
      };
      dispatch({ type: "ADD_CONTACT", payload: newContact });
      this.setState({
        name: "",
        email: "",
        phone: "",
      });
    }
    // console.log(newContact);

    this.props.history.push("/");
  };
  render() {
    const { name, email, phone } = this.state;
    return (
      <>
        <h1 className="display-4 ml-auto mr-auto "> Add Component</h1>
        <Consumer>
          {(value) => {
            const { dispatch, contacts } = value;
            return (
              <div className="card">
                <div className="card-header">Add Contact</div>
                <div className="card-body">
                  <form
                    onSubmit={this.handleSubmit.bind(this, dispatch, contacts)}
                  >
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="name"
                        placeholder="Enter Name..."
                        value={name}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Enter Email..."
                        value={email}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control form-control-lg"
                        placeholder="Enter Phone ..."
                        value={phone}
                        onChange={this.handleChange}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Add Contact"
                      className="btn btn-primary btn-block"
                    />
                  </form>
                </div>
              </div>
            );
          }}
        </Consumer>
      </>
    );
  }
}
