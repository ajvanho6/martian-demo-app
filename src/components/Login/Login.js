import React, { useState } from "react"
import { withRouter, Redirect } from "react-router-dom"
import * as PropTypes from "prop-types"

import Input from "../Input/Input"
import Label from "../Label/Label"
import InputGroup from "../InputGroup/InputGroup"
import Button from "../Button/Button"
import routes from "../../routes"
import { storeMartian, getMartian } from "../../helpers"

import "./Login.scss"

const Login = ({ history, message }) => {
  // eslint-disable-next-line no-console
  console.log(`${message} Login Component.`)

  const [state, setState] = useState({
    username: "",
    password: ""
  })

  const [errors, setErrorsState] = useState({})

  const onInputChange = e => {
    const { name, value } = e.target
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const onSubmit = e => {
    e.preventDefault()
    const { username, password } = state

    if (!(username === "ivan" && password === "baresic")) {
      setErrorsState(prevState => ({
        ...prevState.errors,
        name: true,
        password: true
      }))
      return
    }

    setErrorsState({})

    storeMartian()

    history.push(routes.APP)
  }

  const { username, password } = state

  if (getMartian()) {
    return <Redirect to={routes.APP} />
  }

  return (
    <div className="martian-login">
      <form
        autoComplete="off"
        className="martian-login__form"
        name="loginForm"
        onSubmit={onSubmit}
      >
        <InputGroup message="Hello from">
          <Label htmlFor="username" hasError={errors.name} message="Hello from">
            Name
          </Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            autoComplete="none"
            hasError={errors.name}
            value={username}
            onChange={onInputChange}
            message="Hello from"
          />
        </InputGroup>

        <InputGroup message="Hello from">
          <Label
            htmlFor="password"
            hasError={errors.password}
            message="Hello from"
          >
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            autoComplete="new-password"
            hasError={errors.password}
            value={password}
            onChange={onInputChange}
            message="Hello from"
          />
        </InputGroup>

        <Button buttonStyle="primary" onClick={onSubmit} message="Hello from">
          Log In
        </Button>
      </form>
    </div>
  )
}

Login.propTypes = {
  history: PropTypes.object,
  message: PropTypes.string.isRequired
}

Login.defaultProps = {
  history: {}
}

export default withRouter(Login)
