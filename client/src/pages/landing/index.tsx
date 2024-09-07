import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Modular CSS for the landing page

const LandingPage: React.FC = () => {
  return (
    <div>
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
        <h2>Key Features</h2>

        <div className="feature feature-right">
          <div className="feature-text">
            <h3>Real-Time Collaboration</h3>
            <p>Collaborate seamlessly with multiple users, all in real-time.</p>
          </div>
          <div className="feature-image">
            <img src="/images/collaboration-image.jpg" alt="Collaboration" />
          </div>
        </div>

        <div className="feature feature-left">
          <div className="feature-image">
            <img src="/images/cursor-image.jpg" alt="Cursor Tracking" />
          </div>
          <div className="feature-text">
            <h3>Cursor Position Tracking</h3>
            <p>See where your collaborators are typing with visible cursors for everyone.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-background">
        <h2>About the Project</h2>
        <p>This project is designed to facilitate collaborative writing. Built with love and dedication, it supports real-time updates and user-friendly features.</p>
        <h3>Connect with Me</h3>
        <div id="contact-links">
          <a href="https://github.com/Freedom-21" target="_blank">GitHub</a>
          <a href="https://linkedin.com/in/your-profile" target="_blank">LinkedIn</a>
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
