import React from "react"
import * as PropTypes from "prop-types"
import classNames from "classnames"

import "./Label.scss"

const Label = ({
  children,
  className,
  hasError,
  message,
  htmlFor,
  ...rest
}) => {
  // eslint-disable-next-line no-console
  console.log(`${message} Label Component.`)

  const classes = classNames("martian-label", className, {
    "martian-label--has-error": hasError
  })

  return (
    <label htmlFor={htmlFor} className={classes} {...rest}>
      {children}
    </label>
  )
}

Label.propTypes = {
  className: PropTypes.string,
  hasError: PropTypes.bool,
  message: PropTypes.string.isRequired,
  children: PropTypes.string,
  htmlFor: PropTypes.string
}

Label.defaultProps = {
  className: "",
  hasError: false,
  children: "",
  htmlFor: ""
}

export default Label
