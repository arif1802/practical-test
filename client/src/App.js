import './App.css';
import Routes from './Routes'
import store from './Redux/Store'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './history'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store()}>
      <ConnectedRouter history={history}>
        <Routes />
        <ToastContainer />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
