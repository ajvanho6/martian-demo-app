import React from "react"
import * as PropTypes from "prop-types"
import classNames from "classnames"

import "./Input.scss"

const Input = ({ className, hasError, isReadOnly, message, ...rest }) => {
  // eslint-disable-next-line no-console
  console.log(`${message} Input Component.`)

  const classes = classNames("martian-input", className, {
    "martian-input--has-error": hasError
  })

  return <input readOnly={isReadOnly} className={classes} {...rest} />
}

Input.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  hasError: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  message: PropTypes.string.isRequired
}

Input.defaultProps = {
  placeholder: "",
  className: "",
  hasError: false,
  isReadOnly: false
}

export default Input
