import { BrowserRouter, Routes, Route } from "react-router-dom"
import Body from "./Body"
import Login from "./Login"
import Profile from "./Profile"
import appStore from "./utils/appStore"
import { Provider } from "react-redux"
import Feed from "./Feed"
import Connections from "./Connections"
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>

  )
}

export default App
