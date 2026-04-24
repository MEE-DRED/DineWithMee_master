import React, { useState, useEffect, useRef } from 'react';
import { chatbotAPI } from '../../redux/api/chatbot';
import { healthTriageAPI } from '../../redux/api/healthTriage';
import LoadingSpinner from '../common/LoadingSpinner';

const NiaChatInterface = ({ onComplete, initialType = 'INITIAL_TRIAGE' }) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Start conversation on component mount
  useEffect(() => {
    startConversation();
  }, []);

  const startConversation = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await chatbotAPI.createConversation({
        conversationType: initialType
      });

      setConversation(response.data);

      // Add Nia's greeting based on user's country (from localStorage or context)
      const user = JSON.parse(localStorage.getItem('dwm-user') || '{}');
      const greeting = getGreeting(user.country || 'Other');

      setMessages([{
        id: Date.now(),
        content: `${greeting} I'm Nia, your ChatwithMee nutrition assistant. I'm here to help you manage your health through food. To get started, may I know whether you are from Nigeria, Rwanda, or another country?`,
        sender: 'AI',
        timestamp: new Date().toISOString()
      }]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start conversation');
      console.error('Failed to start conversation:', err);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = (country) => {
    switch (country?.toLowerCase()) {
      case 'rwanda':
        return 'Muraho! 😊';
      case 'nigeria':
        return 'Kedu! 😊';
      default:
        return 'Hello! 😊';
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim() || !conversation?.id || loading) return;

    const userMessageContent = inputMessage.trim();
    setInputMessage('');

    // Add user message to UI immediately
    const userMsg = {
      id: Date.now(),
      content: userMessageContent,
      sender: 'USER',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setLoading(true);

    try {
      const response = await chatbotAPI.sendMessage(conversation.id, {
        content: userMessageContent
      });

      // Add AI response
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        content: response.data.aiResponse.content,
        sender: 'AI',
        timestamp: response.data.aiResponse.timestamp
      }]);

      // Check if conversation should be completed
      if (response.data.shouldComplete) {
        await handleCompleteConversation();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
      console.error('Failed to send message:', err);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleCompleteConversation = async () => {
    if (!conversation?.id) return;

    try {
      await chatbotAPI.completeConversation(conversation.id);

      if (onComplete) {
        onComplete(conversation.id);
      }
    } catch (err) {
      console.error('Failed to complete conversation:', err);
    }
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
  };

  if (error && !conversation) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={startConversation}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
              🤖
            </div>
            <div>
              <h2 className="text-xl font-bold">Nia</h2>
              <p className="text-sm text-green-100">Your AI Health Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-yellow-300 animate-pulse' : 'bg-green-300'}`}></span>
            <span className="text-sm">{isTyping ? 'Typing...' : 'Online'}</span>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-green-50/30 to-white">
        {loading && messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.sender === 'USER'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                      : 'bg-white border border-green-100 text-gray-800 shadow-sm'
                  }`}
                >
                  {message.sender === 'AI' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">🤖</span>
                      <span className="text-xs font-semibold text-green-600">Nia</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <span
                    className={`text-xs mt-2 block ${
                      message.sender === 'USER' ? 'text-green-100' : 'text-gray-500'
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-green-100 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Quick Reply Suggestions (show after certain messages) */}
      {messages.length > 0 && !isTyping && (
        <div className="px-6 py-3 bg-green-50/50 border-t border-green-100">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleQuickReply('Nigeria')}
              className="px-3 py-1.5 bg-white border border-green-200 rounded-full text-sm text-green-700 hover:bg-green-50 transition"
            >
              🇳🇬 Nigeria
            </button>
            <button
              onClick={() => handleQuickReply('Rwanda')}
              className="px-3 py-1.5 bg-white border border-green-200 rounded-full text-sm text-green-700 hover:bg-green-50 transition"
            >
              🇷🇼 Rwanda
            </button>
            <button
              onClick={() => handleQuickReply('Other')}
              className="px-3 py-1.5 bg-white border border-green-200 rounded-full text-sm text-green-700 hover:bg-green-50 transition"
            >
              🌍 Other
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-green-100">
        {error && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={loading || !conversation}
            className="flex-1 px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim() || !conversation}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-md hover:shadow-lg"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <LoadingSpinner size="small" />
                <span>Sending...</span>
              </span>
            ) : (
              'Send'
            )}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-2 text-center">
          Nia is here to help with nutrition guidance. For medical emergencies, please contact a healthcare provider.
        </p>
      </div>
    </div>
  );
};

export default NiaChatInterface;
