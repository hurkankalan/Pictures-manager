import { ReactElement } from "react";
import { Provider } from "react-redux";
import store from "./src/store/store";
import PrivateNavigation from "./src/navigation/PrivateNavigation";

export default function App(): ReactElement {
  return (
    <Provider store={store}>
      <PrivateNavigation />
    </Provider>
  );
}
