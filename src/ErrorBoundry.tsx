import React from "react";

var state = { hasError: false };

export default class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
