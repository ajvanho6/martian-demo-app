import React from "react"
import { withRouter } from "react-router-dom"
import * as PropTypes from "prop-types"

import { getMartian, removeMartian } from "../../helpers"
import Button from "../Button/Button"
import routes from "../../routes"

import "./Header.scss"

const Header = ({ history, message }) => {
  // eslint-disable-next-line no-console
  console.log(`${message} Header Component.`)

  const signOut = () => {
    removeMartian()
    history.push({
      pathname: routes.ROOT
    })
  }

  const renderSignOutButton = () => {
    const isUSerSignedIn = getMartian()
    if (isUSerSignedIn) {
      return (
        <Button buttonStyle="primary" onClick={signOut} message="Hello from">
          Log Out
        </Button>
      )
    }
    return null
  }

  return (
    <div className="martian-header">
      <div className="martian-header__inner">
        <h1>Planet Mars</h1>
        {renderSignOutButton()}
      </div>
    </div>
  )
}

Header.propTypes = {
  history: PropTypes.object,
  message: PropTypes.string.isRequired
}

Header.defaultProps = {
  history: {}
}

export default withRouter(Header)
