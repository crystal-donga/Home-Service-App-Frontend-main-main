
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import {store} from "./store"
import { CookiesProvider } from "react-cookie";
import { WishlistProvider } from "./context/WishlistContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WishlistProvider>
  <CookiesProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </CookiesProvider>
  </WishlistProvider>
);
