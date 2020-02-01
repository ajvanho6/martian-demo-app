import React from "react"
import * as PropTypes from "prop-types"
import classNames from "classnames"

import "./InputGroup.scss"

const InputGroup = ({ children, className, message, ...rest }) => {
  // eslint-disable-next-line no-console
  console.log(`${message} InputGroup Component.`)

  const classes = classNames("martian-input-group", className)

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

InputGroup.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  children: PropTypes.array
}

InputGroup.defaultProps = {
  className: "",
  children: []
}

export default InputGroup
