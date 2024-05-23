import React, { useState } from 'react';
import axios from 'axios';
import './ChatApp.css';

const ChatApp: React.FC = () => {
  const [userQuery, setUserQuery] = useState('');
  const [response, setResponse] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post('/api/chat', { userQuery });
      setResponse(result.data.response);
      setQuestions(result.data.questions);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching chat response:', error);
      setErrorMessage('Error fetching chat response');
    }
  };

  return (
    <div className="chatbox-container">
      <form onSubmit={handleSubmit} className="chatbox-form">
        <textarea
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Ask your question..."
          className="chatbox-input"
        />
        <button type="submit" className="chatbox-submit">Submit</button>
      </form>
      <div className="chatbox-response">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <h3 className="response-heading">Response:</h3>
        <p className="response-text">{response}</p>
        <h3 className="suggested-questions-heading">Suggested Questions:</h3>
        <ul className="suggested-questions-list">
          {questions.map((question, index) => (
            <li key={index} className="suggested-question">{question}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatApp;
