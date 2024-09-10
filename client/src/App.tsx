import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "pages/login";
import Signup from "pages/signup";
import { HomePage } from "pages/home";
import DocumentEditor from "pages/document";
import Layout from "./layout";
import RequireAuth from "./RequireAuth";
import RequireGuest from "./RequireGuest";
import LandingPage from "pages/landing";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route>
          <Route index element={<LandingPage />} /> Landing page is root
            <Route element={<RequireAuth />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/home/:id" element={<DocumentEditor />} />
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

