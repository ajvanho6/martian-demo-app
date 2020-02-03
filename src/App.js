import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import "./index.scss"
import routes from "./routes"
import Header from "./components/Header/Header"
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import Post from "./components/Post/Post"
import { getMartian } from "./helpers"
import CreateStore from "./components/CreateStore/CreateStore"
import { withStoreHOC } from "./hoc/WithStoreHOC"

const WrappedHome = withStoreHOC(Home)

const WrappedPost = withStoreHOC(Post)

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        getMartian() ? <Component {...props} /> : <Redirect to={routes.ROOT} />
      }
    />
  )
}

const App = () => {
  return (
    <CreateStore message="Hello from">
      <Router key={new Date()}>
        <Header message="Hello from" />
        <Switch>
          <Route
            exact
            path={routes.ROOT}
            render={props => <Login {...props} message="Hello from" />}
          />
          <PrivateRoute
            path={routes.APP}
            component={props => <WrappedHome {...props} message="Hello from" />}
          />
          <PrivateRoute
            path={routes.POST}
            component={props => <WrappedPost {...props} message="Hello from" />}
          />
        </Switch>
      </Router>
    </CreateStore>
  )
}

export default App
