import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./../store/configureStore";
import { AddRemoveClient } from "../components/AddRemoveClient";
import { Login } from "./Login";
import { BrowserRouter, Route, Routes } from "react-router";
import { Signup } from "./Signup/Signup";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <AddRemoveClient /> */}
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="manage-client" element={<AddRemoveClient />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
