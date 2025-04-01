import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { BrowserRouter, Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <BrowserRouter>
      <div className="min-h-screen flex flex-wrap justify-between bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>{/* <Outlet /> */}</main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  ) : null;
}

export default App;
