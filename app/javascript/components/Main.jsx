import React from 'react'
import PropTypes from 'prop-types'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import { setData } from '../actions/data'
import { initialState } from '../store/initialState'

const store = configureStore(initialState);

class Main extends React.Component {
  constructor(props) {
    super(props);
    store.dispatch(setData(this.props.data));
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Main;
