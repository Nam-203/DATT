import ReactDOM from "react-dom";
import App from "./app";
import { store } from "./redux";
import { Provider } from "react-redux";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./fonts/Lato-Italic.ttf";
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
