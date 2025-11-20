import React, { useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import ChartDisplay from './components/ChartDisplay';
import TableDisplay from './components/TableDisplay';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [lastArea, setLastArea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // 👈 New state to track if search happened

  const handleSend = async (message) => {
    // Clear previous messages and data
    setMessages([]);
    setChartData([]);
    setTableData([]);
    
    // Add only the current user message
    setMessages([{ text: message, isUser: true }]);
    setLastArea(message);
    setIsLoading(true);
    setHasSearched(true); // 👈 Set to true when search happens

    try {
      const response = await axios.get(`https://real-estate-backend-q544.onrender.com/api/chatbot/analyze/?area=${message}`);

      const data = response.data;

      // Add bot response - this will replace previous messages
      setMessages([
        { text: message, isUser: true },
        { text: data.summary, isUser: false }
      ]);
      setChartData(data.chart_data);
      setTableData(data.table_data);
    } catch (error) {
      setMessages([
        { text: message, isUser: true },
        { text: error.response?.data?.error || 'Error fetching data', isUser: false }
      ]);
      setChartData([]);
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!lastArea) {
      alert("Please search for an area first!");
      return;
    }
    window.location.href = `https://real-estate-backend-q544.onrender.com/api/chatbot/download/?area=${lastArea}`;
  };

  return (
    <div className="app-container">
      <div className="main-content">
       {/* Header Section */}
<header className="app-header">
  <div className="header-content">
    {/* Logo and Title Container */}
    <div className="title-container">
      <div className="logo-wrapper">
        <div className="logo-icon">🏠</div>
        <div className="logo-glow"></div>
      </div>
      <div className="title-wrapper">
        <h1 className="app-title">
          Real Estate Insights
        </h1>
        <div className="title-underline"></div>
      </div>
    </div>
    
    {/* Subtitle and Description */}
    <div className="description-container">
      <p className="app-subtitle">
        Analyze property trends and market data
      </p>
      <div className="feature-pills">
        <span className="feature-pill">Market Trends</span>
        <span className="feature-pill">Property Analytics</span>
        <span className="feature-pill">Investment Insights</span>
      </div>
    </div>
    
    {/* Optional CTA Button */}
    <div className="header-actions">
      <button className="cta-button">
        <span>Get Started</span>
        <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </button>
    </div>
  </div>
  
  {/* Background Elements */}
  <div className="header-background">
    <div className="bg-shape shape-1"></div>
    <div className="bg-shape shape-2"></div>
    <div className="bg-shape shape-3"></div>
  </div>
</header>

        {/* Chat Section */}
        <div className="chat-section">
          <div className="chat-container">
            <div className={`chat-box ${hasSearched ? 'chat-box-expanded' : ''}`}>
              {messages.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">💬</div>
                  <h3>Start a Conversation</h3>
                  <p>Ask about any area to get real estate insights and data analysis</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <ChatMessage 
                    key={index} 
                    message={msg.text} 
                    isUser={msg.isUser} 
                  />
                ))
              )}
              {isLoading && (
                <div className="loading-message">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>

            <ChatInput onSend={handleSend} disabled={isLoading} />
          </div>
        </div>

        {/* Download Section */}
        {lastArea && (
          <div className="download-section">
            <div className="download-card">
              <div className="download-info">
                <h4>📊 Data Available</h4>
                <p>Download complete dataset for <strong>{lastArea}</strong></p>
              </div>
              <button 
                className="download-btn"
                onClick={handleDownload}
              >
                <span className="download-icon">📥</span>
                Download Excel Data
              </button>
            </div>
          </div>
        )}

        {/* Visualization Sections */}
        {chartData.length > 0 && (
          <div className="visualization-section">
            <ChartDisplay data={chartData} />
          </div>
        )}

        {tableData.length > 0 && (
          <div className="visualization-section">
            <div className="section-header">
              <h3>📋 Detailed Data</h3>
              <p>Comprehensive property information</p>
            </div>
            <TableDisplay data={tableData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;