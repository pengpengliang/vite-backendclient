import React from 'react'
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "./module/Home/index.jsx";
import Login from "./module/Login/index.jsx";
import './icon.less'
import 'antd/dist/antd.less'

function App() {
  return (
    <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </HashRouter>
  )
}

export default App
