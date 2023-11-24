import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { hotelInputs, productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { contactColumns, hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHall from "./pages/newHall/NewHall";
import NewSlot from "./pages/newSlot/NewSlot";
import UpdateUser from "./pages/update/updateUser";
import UpdateHall from "./pages/update/updateHall";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />
    }
    return children;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />

            <Route path="users">
              <Route
                path=":userId/update"
                element={
                  <ProtectedRoute>
                    <UpdateUser inputs={userInputs} />
                  </ProtectedRoute>
                }
              />

              <Route index element={<ProtectedRoute>
                <List columns={userColumns} />
              </ProtectedRoute>} />
              <Route path=":userId" element={
                <ProtectedRoute>
                </ProtectedRoute>
              } />
              <Route
                path="new"
                element={<ProtectedRoute><New inputs={userInputs} title="Add New User" /></ProtectedRoute>}
              />
            </Route>
            <Route path="halls">
              <Route index element={<ProtectedRoute><List columns={hotelColumns} /></ProtectedRoute>} />
              <Route path=":hallsId/update" element={
                <ProtectedRoute><UpdateHall inputs={hotelInputs} /></ProtectedRoute>}
              />
              <Route
                path="new"
                element={<ProtectedRoute><NewHall /></ProtectedRoute>}
              />
            </Route>
            <Route path="slots">
              <Route index element={<ProtectedRoute><List columns={roomColumns} /></ProtectedRoute>} />

              <Route
                path="new"
                element={<ProtectedRoute><NewSlot /></ProtectedRoute>}
              />
            </Route>
            <Route path="contact">
              <Route index element={<ProtectedRoute><List columns={contactColumns} /></ProtectedRoute>} />


            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
