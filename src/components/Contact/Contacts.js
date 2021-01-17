import React, { Component } from "react";
import { Consumer } from "../../context";
import Contact from "./Contact";

class Contacts extends Component {
  render() {
    {
      return (
        <Consumer>
          {(value) => {
            return value.contacts.map((item) => {
              return (
                <Contact
                  name={item.name}
                  id={item.id}
                  email={item.email}
                  phone={item.phone}
                  key={item.id}
                />
              );
            });
          }}
        </Consumer>
      );
    }
  }
}

export default Contacts;
