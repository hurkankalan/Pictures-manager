import { ReactElement } from "react";
import { Provider } from "react-redux";
import store from "./src/store/store";
import Navigation from "./src/navigation/Navigation";

export default function App(): ReactElement {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
