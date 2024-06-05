import { TableLayout } from "@/layouts/TableLayout";
import { setupStore } from "@/store/store";
import { Provider } from "react-redux";

const store = setupStore();

export const App = () => {
  return (
    <Provider store={store}>
      <TableLayout />
    </Provider>
  );
};
