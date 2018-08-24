import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default (WrappedComponent) => {
  class Page extends Component {
    componentDidMount() {
      const {navigationOptions} = WrappedComponent;
      document.title = navigationOptions.title || '算钱网'
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
  return hoistNonReactStatic(Page, WrappedComponent);
}
