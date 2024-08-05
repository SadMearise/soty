import { Component, ReactNode } from "react";
import { WithRouterProps, withRouter } from "../hocs";
import { Error } from "../pages";

interface ErrorBoundaryProps extends WithRouterProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { location } = this.props;

    if (prevProps.location?.pathname !== location?.pathname) {
      this.setState({ hasError: false });
    }
  }

  render() {
    const { hasError } = this.state;
    const { children, location } = this.props;

    if (hasError && location) {
      return (
        <Error
          title="Что-то пошло не так"
          text="Обновите страницу"
          link={{ route: location.pathname, text: "Обновить" }}
        />
      );
    }

    return children;
  }
}

export default withRouter(ErrorBoundary);
