import React from 'react'

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  }

  componentDidCatch(/* error, info */) {
    // Display fallback UI
    this.setState({ hasError: true })
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
