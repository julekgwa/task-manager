import React, {
  Component
} from 'react';

export const withLogger = WrappedComponent => {

  const logger = {
    info: (screen, logInfo) => {

      console.info(screen, logInfo);

    },
    error: (screen, logError) => {

      console.error(screen, logError);

    },
  };

  return class WithLogger extends Component {

    render = () => {

      return <WrappedComponent {...this.props} logger={logger} />;

    };

  };

};
