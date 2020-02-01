import React from "react"

import StoreContext from "../context/StoreContext"

// const withStore = WrappedComponent => {
//   return class extends React.Component {
//     render() {
//       return (
//         <StoreContext.Consumer>
//           {context => <WrappedComponent store={context} {...this.props} />}
//         </StoreContext.Consumer>
//       )
//     }
//   }
// }

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
