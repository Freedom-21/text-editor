import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RequireAuth, RequireGuest } from "../src/helpers/auth";
import Login from "pages/login";
import Signup from "pages/signup";
import { HomePage } from "pages/home";
import DocumentEditor from "pages/document";
import Layout from "./layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route>
            <Route element={<RequireAuth />}>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path=":id" element={<DocumentEditor />} />
              </Route>
            </Route>
            <Route element={<RequireGuest />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
