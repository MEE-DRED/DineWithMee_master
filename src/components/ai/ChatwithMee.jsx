import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMessage,
  updateUserProfile,
  updateHealthScreening,
  setCurrentStep,
  sendChatMessage,
  selectMessages,
  selectUserProfile,
  selectCurrentStep,
  selectChatLoading,
} from '../../redux/slices/chatSlice';
import NiaAvatar from './NiaAvatar';

const ChatwithMee = () => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const userProfile = useSelector(selectUserProfile);
  const currentStep = useSelector(selectCurrentStep);
  const loading = useSelector(selectChatLoading);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      const greetingMessage = getGreetingMessage();
      dispatch(addMessage({
        id: Date.now(),
        sender: 'nia',
        text: greetingMessage,
        timestamp: new Date().toISOString(),
      }));
    }
  }, [dispatch, messages.length]);

  const getGreetingMessage = () => {
    const location = userProfile.location || 'Guest';
    const greetings = {
      Nigeria: 'Kedu! I\'m Nia, your virtual nutritionist. Welcome to DineWithMee! 🌍',
      Rwanda: 'Muraho! I\'m Nia, your virtual nutritionist. Welcome to DineWithMee! 🌍',
    };
    return greetings[location] || 'Welcome! I\'m Nia, your virtual nutritionist. Let\'s start your health journey! 🌍';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(userMessage));
    setInputValue('');
    setIsTyping(true);

    // Process message based on current step
    try {
      await dispatch(sendChatMessage({
        message: inputValue,
        step: currentStep,
        userProfile,
      })).unwrap();
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    handleSendMessage();
  };

  const getQuickReplies = () => {
    switch (currentStep) {
      case 'greeting':
        return ['Get Started', 'Learn More', 'Talk to Nutritionist'];
      case 'profiling':
        return [];
      case 'dietary':
        return ['No restrictions', 'Vegetarian', 'Halal', 'Diabetic'];
      case 'screening':
        return ['Hypertension', 'Diabetes', 'Both', 'None'];
      case 'recommendations':
        return ['Show Meal Plan', 'Book Consultation', 'Learn More'];
      default:
        return [];
    }
  };

  const formatMessageText = (text) => {
    // Format with markdown-like syntax
    return text.split('\n').map((line, index) => (
      <p key={index} className="mb-2 last:mb-0">
        {line}
      </p>
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-dwm-off-white">
      {/* Header */}
      <div className="bg-dwm-green-deep text-white py-4 px-6 shadow-dwm-md flex items-center gap-4">
        <NiaAvatar size="md" />
        <div>
          <h2 className="font-serif text-2xl font-bold">Chat with Nia</h2>
          <p className="text-sm text-dwm-gold-light">Your AI Nutritionist</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-dwm-md p-4 ${
                message.sender === 'user'
                  ? 'bg-dwm-gold text-white'
                  : 'bg-white text-dwm-text-dark shadow-dwm-sm'
              }`}
            >
              {message.sender === 'nia' && (
                <div className="flex items-center gap-2 mb-2">
                  <NiaAvatar size="sm" />
                  <span className="font-semibold text-dwm-green-deep">Nia</span>
                </div>
              )}
              <div className="text-sm leading-relaxed">
                {formatMessageText(message.text)}
              </div>
              <div className="text-xs opacity-70 mt-2">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-dwm-md p-4 shadow-dwm-sm flex items-center gap-2">
              <NiaAvatar size="sm" />
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-dwm-green-deep rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-dwm-green-deep rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-dwm-green-deep rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {getQuickReplies().length > 0 && (
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {getQuickReplies().map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="bg-white text-dwm-green-deep border-2 border-dwm-green-light hover:bg-dwm-green-light hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-dwm-sm hover:shadow-dwm-md"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-dwm-md focus:outline-none focus:ring-2 focus:ring-dwm-gold focus:border-transparent"
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || loading}
            className="bg-dwm-gold hover:bg-dwm-gold-light text-white px-6 py-3 rounded-dwm-md font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-dwm-sm hover:shadow-dwm-md"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatwithMee;
