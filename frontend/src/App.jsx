import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import configureStore from "./store/configureStore.js";
import Routers from "./routes/index.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const store = configureStore();

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer position="bottom-right" autoClose={2000} />
        <Routers />
      </PersistGate>
    </Provider>
  );
}

export default App;
