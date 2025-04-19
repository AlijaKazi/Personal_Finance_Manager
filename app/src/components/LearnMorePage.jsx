import React from "react";
import "./LearnMorePage.css"; 

const LearnMorePage = () => {
  return (
    <div className="learn-more-page">
      <h1 className="lm-title">Learn More About Our Finance Manager App</h1>
      <p className="lm-description">
        Our Finance Manager app helps you take control of your financial future
        with smart budgeting, goal setting, and expense tracking. Here's how it works:
      </p>

      <div className="features">
        <div className="f-card">
        <div className="feature-icon">💰</div>
          <h3>Budgeting</h3>
          <p>
            Set up personalized budgets and track your spending to stay within your financial limits.
          </p>
        </div>

        <div className="f-card">
        <div className="feature-icon">📈</div>
          <h3>Goal Setting</h3>
          <p>
            Define your financial goals such as saving for a vacation or building an emergency fund, and track your progress.
          </p>
        </div>

        <div className="f-card">
        <div className="feature-icon">📊</div>
          <h3>Expense Tracking</h3>
          <p>
            Keep track of your daily expenses and identify areas where you can cut back to save more.
          </p>
        </div>
      </div>

      <p className="call-to-action">
        Ready to take control of your finances? <a href="/login">Log in</a> or <a href="/signup">Sign up</a> to get started.
      </p>
    </div>
  );
};

export default LearnMorePage;
