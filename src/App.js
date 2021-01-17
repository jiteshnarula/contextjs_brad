import Header from "./components/Layout/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "./context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import About from "./components/pages/About";
import Contacts from "./components/Contact/Contacts";
import AddContact from "./components/Contact/AddContact";
import NotFound from "./components/pages/NotFound";
import EditContact from "./components/Contact/EditContact";

function App() {
  return (
    <Provider>
      <Router>
        <Header branding="Contact Manager" />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Contacts} />
            <Route exact path="/about" component={About} />
            <Route exact path="/addcontact" component={AddContact} />
            <Route exact path="/editcontact/:id" component={EditContact} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
