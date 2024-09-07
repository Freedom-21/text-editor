import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RequireAuth, RequireGuest } from "../src/helpers/auth";
import Login from "pages/login";
import Signup from "pages/signup";
import { HomePage } from "pages/home";
import DocumentEditor from "pages/document";
import LandingPage from "pages/landing"; // Updated import path for the LandingPage
import Layout from "./layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public route: Landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected routes: Requires authentication */}
          <Route element={<RequireAuth />}>
            <Route path="/home">
              <Route index element={<HomePage />} />
              <Route path=":id" element={<DocumentEditor />} />
            </Route>
          </Route>

          {/* Guest-only routes: Only for unauthenticated users */}
          <Route element={<RequireGuest />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
