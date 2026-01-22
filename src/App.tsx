import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
