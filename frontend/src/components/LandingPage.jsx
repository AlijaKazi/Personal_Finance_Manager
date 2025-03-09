import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1 className="heading">Welcome to Finance Manager</h1>
        <p className="subheading">Effortless control over your personal finances!</p>
      </header>
      <br /><br />

      <section className="sh">
        <h2 className="sh-title">Master your finances with ease and precision.</h2>
        <p className="sh-description">
        "Keep track of your expenses, savings, and investments - all in one convenient place."        </p>
        <div className="button-container">
        <Link to="/login" className="link">
              <button className="button button-primary">Get Started</button>
            </Link>
            <Link to="/learnmore" className="link">
              <button className="button button-secondary">Learn More</button>
            </Link>
        </div>
      </section>

      <section className="how-to-operate">
        <h2 className="hto-title">How It Works</h2>
        <div className="hto-content">
          <div className="hto-card">
            <h3>Step 1: Sign Up</h3>
            <p>Get started by creating an account with us. It's fast, easy, and free.</p>
          </div>
          <div className="hto-card">
            <h3>Step 2: Set Your Financial Goals</h3>
            <p>Define your savings, investment, and budgeting goals to help guide your financial journey.</p>
          </div>

          <div className="hto-card">
            <h3>Step 3: Analyze Your Spending</h3>
            <p>Review your spending patterns, identify areas to cut back, and make smarter financial decisions to secure your future.</p>
          </div>

        </div>
      </section>
      <section className="why-choose-us">
  <h2 className="wcu-title">Why Choose Us</h2>
  <div className="wcu-content">
    <div className="wcu-card">
      <h3>Expert Financial Advice</h3>
      <p>Our team of professionals provides trusted, actionable insights to help you make the best financial decisions.</p>
    </div>
    <div className="wcu-card">
      <h3>Personalized Experience</h3>
      <p>We tailor our services to your specific needs, ensuring you receive a financial plan that works for you.</p>
    </div>

    <div className="wcu-card">
      <h3>Easy to Use</h3>
      <p>Our platform is user-friendly, making it simple for you to manage your finances without the complexity.</p>
    </div>

    <div className="wcu-card">
      <h3>Secure and Safe</h3>
      <p>Your financial data is always protected with top-notch security measures, giving you peace of mind.</p>
    </div>
  </div>
</section>


      <footer className="footer">
        <p>&copy; 2025 Finance Manager. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
