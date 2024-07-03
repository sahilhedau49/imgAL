import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { AuthContextProvider } from "./context/auth";
import Login from "./components/Login";
import Protected from "./components/Protected";
import ProtectedSignup from "./components/ProtectedSignup";
import PasswordReset from "./components/PasswordReset";
import CreateRoom from "./components/CreateRoom";
import Navbar from "./components/Navbar";
import RoomGallery from "./components/RoomGallery";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-zinc-200">
      <AuthContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedSignup>
                <Signup />
              </ProtectedSignup>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedSignup>
                <Login />
              </ProtectedSignup>
            }
          />
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route
            path="/createRoom"
            element={
              <Protected>
                <CreateRoom />
              </Protected>
            }
          />
          <Route
            path="/room/:room_id"
            element={
              <Protected>
                <RoomGallery />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
