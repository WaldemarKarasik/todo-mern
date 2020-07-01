import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Todos from "./Components/Todos";
import Admin from "./Components/Admin";
import PrivateRoute from "./hocs/PrivateRoute";
import UnprivateRoute from "./hocs/UnprivateRoute";

function App() {
  const auth = useContext(AuthContext);
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Route exact path="/" component={Home} />
        <UnprivateRoute path="/login" component={Login} />
        <UnprivateRoute path="/register/" component={Register} />
        <PrivateRoute
          path="/todos"
          roles={["user", "admin"]}
          component={Todos}
        />
        <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
      </div>
    </Router>
  );
}

export default App;
