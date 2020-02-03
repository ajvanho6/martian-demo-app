import React from "react"

import StoreContext from "../context/StoreContext"

export function withStoreHOC(Component) {
  return function WrapperComponent(props) {
    return (
      <StoreContext.Consumer>
        {data => <Component {...props} context={data} />}
      </StoreContext.Consumer>
    )
  }
}

export default withStoreHOC
