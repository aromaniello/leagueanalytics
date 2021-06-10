import React from 'react'
import PropTypes from 'prop-types'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import { initialState } from '../store/initialState'

const store = configureStore(initialState);

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <App data={this.props.data} />
      </Provider>
    );
  }
}

export default Main;
