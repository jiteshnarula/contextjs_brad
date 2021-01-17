import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";
import { Link } from "react-router-dom";
class Contact extends Component {
  state = {
    showDescription: false,
  };
  handleShow = () => {
    this.setState({
      showDescription: !this.state.showDescription,
    });
  };
  handleDelete = async (dispatch, id) => {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await axios.delete(`${url}/${id}`);
    if ((response.status = 200))
      dispatch({ type: "DELETE_CONTACT", payload: id });
    else {
      this.props.history.push("/404");
    }
  };
  render() {
    {
      return (
        <Consumer>
          {(value) => {
            const { id, name, email, phone } = this.props;
            const { dispatch } = value;
            return (
              <div className="card mt-3 mb-3">
                <h4 className="card-title mt-3 ml-3">
                  {name}
                  <button onClick={this.handleShow}>Show</button>
                </h4>
                <div>
                  <button onClick={() => this.handleDelete(dispatch, id)}>
                    Delete
                  </button>
                  <Link class="btn btn-primary" to={`editContact/${id}`}>
                    Edit
                  </Link>
                </div>
                {this.state.showDescription &&
                this.state.showDescription === true ? (
                  <ul className="list-group">
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Phone: {phone}</li>
                  </ul>
                ) : null}
              </div>
            );
          }}
        </Consumer>
      );
    }
  }
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
export default Contact;
