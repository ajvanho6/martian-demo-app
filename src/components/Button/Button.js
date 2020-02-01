import React from "react"
import * as PropTypes from "prop-types"
import classNames from "classnames"

import "./Button.scss"

const Button = ({
  children,
  className,
  isDisabled,
  buttonStyle,
  message,
  ...rest
}) => {
  // eslint-disable-next-line no-console
  console.log(`${message} Button Component.`)

  const classes = classNames(
    "martian-button",
    {
      "martian-button--primary": buttonStyle === "primary"
    },
    className
  )

  return (
    <button type="button" className={classes} disabled={isDisabled} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  buttonStyle: PropTypes.string,
  message: PropTypes.string.isRequired,
  children: PropTypes.any
}

Button.defaultProps = {
  className: "",
  buttonStyle: "",
  isDisabled: false,
  children: ""
}

export default Button
