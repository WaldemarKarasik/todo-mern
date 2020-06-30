import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  const auth = useContext(AuthContext);
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register/" component={Register} />
    </Router>
  );
}

export default App;
