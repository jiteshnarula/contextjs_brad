import axios from "axios";
import React, { Component } from "react";
import { Consumer } from "../../context";

export default class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
  };
  async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const { name, email, phone } = response.data;
    this.setState({
      name,
      email,
      phone,
    });
  }
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
    let updateContact = {
      ...this.state,
    };

    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await axios.put(
      `${url}/${this.props.match.params.id}`,
      updateContact
    );

    dispatch({ type: "UPDATE_CONTACT", payload: response.data });

    this.setState({
      name: "",
      email: "",
      phone: "",
    });

    this.props.history.push("/");
  };
  render() {
    const { name, email, phone } = this.state;
    return (
      <>
        <Consumer>
          {(value) => {
            const { dispatch, contacts } = value;
            return (
              <div className="card">
                <div className="card-header">Edit Contact</div>
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
                      value="Update Contact"
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
