import { ComponentType, FC } from "react";
import { Location, useLocation } from "react-router-dom";

export interface WithRouterProps {
  location?: Location;
}

export const withRouter = <P extends object>(WrappedComponent: ComponentType<P & WithRouterProps>) => {
  const NewComponent: FC<P> = (props) => {
    const location = useLocation();

    return (
      <WrappedComponent
        location={location}
        {...props}
      />
    );
  };

  return NewComponent;
};
