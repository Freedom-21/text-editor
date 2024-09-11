import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Modular CSS for the landing page

const LandingPage: React.FC = () => {
  return (
    <div>
      {/* Navigation Menu */}
      <header>
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>
      </header>
      
      {/* Home Section */}
      <section id="home" className="full-screen">
        <div className="overlay">
          <div className="intro">
            <h1>Online Text Editor</h1>
            <p>A modern and collaborative text editing tool designed for developers and writers alike.</p>
            <div>
              <Link to="/signup" className="btn">Sign Up</Link>
              <Link to="/login" className="btn">Log In</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-background">
        <h2>Features</h2>

        <div className="feature feature-right">
          <div className="feature-text">
            <h3 className="user-friendly-title">Real-Time Collaboration</h3>
            <p className="user-friendly-desc">Collaborate seamlessly with multiple users, all in real-time.</p>
          </div>
          <div className="feature-image">
            <img src="/images/collaboration-image.png" alt="Collaboration" />
          </div>
        </div>

        <div className="feature feature-left">
          <div className="feature-image">
            <img src="/images/cursor-image.png" alt="Cursor Tracking" />
          </div>
          <div className="feature-text">
            <h3 className="user-friendly-title">Cursor Position Tracking</h3>
            <p className="user-friendly-desc">See where your collaborators are typing with visible cursors for everyone.</p>
          </div>
        </div>

        {/* New "User Friendly" feature */}
        <div className="feature feature-right">
          <div className="feature-text">
            <h3 className="user-friendly-title">User Friendly</h3>
            <p className="user-friendly-desc">
              Our tool is designed with simplicity in mind, allowing users to focus on writing and collaboration without the need for complex setup or configurations.
            </p>
          </div>
          <div className="feature-image">
            <img src="/images/friendly.png" alt="User Friendly Feature" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-background">
        <h2>About the Project</h2>
        <p>This project is designed to facilitate collaborative writing. Built with love and dedication, it supports real-time updates and user-friendly features.</p>
        <h3>Let's Connect:</h3>
        <div id="contact-links">
          <a href="https://github.com/Freedom-21" target="_blank">GitHub</a>
          <a href="https://linkedin.com/in/freedom-yenesew" target="_blank">LinkedIn</a>
          <a href="https://github.com/Freedom-21/text-editor" target="_blank">Project Repository</a>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Text Editor Project | Built by Freedom</p>
      </footer>
    </div>
  );
};

export default LandingPage;
