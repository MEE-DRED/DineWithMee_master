import api from './index';

/**
 * Chatbot API - Nia AI Health Assistant
 * Endpoints for managing conversations with Nia
 */
export const chatbotAPI = {
  /**
   * Create a new conversation with Nia
   * @param {Object} conversationData - Conversation details
   * @param {string} conversationData.conversationType - Type: INITIAL_TRIAGE, FOLLOW_UP, RECIPE_INQUIRY
   * @returns {Promise} Conversation data
   */
  createConversation: async (conversationData) => {
    const response = await api.post('/chatbot/conversations', conversationData);
    return response.data;
  },

  /**
   * Send a message in an existing conversation
   * @param {string} conversationId - Conversation ID
   * @param {Object} messageData - Message details
   * @param {string} messageData.content - Message content
   * @returns {Promise} User message and AI response
   */
  sendMessage: async (conversationId, messageData) => {
    const response = await api.post(`/chatbot/conversations/${conversationId}/messages`, messageData);
    return response.data;
  },

  /**
   * Get conversation history by ID
   * @param {string} conversationId - Conversation ID
   * @returns {Promise} Conversation with all messages
   */
  getConversationHistory: async (conversationId) => {
    const response = await api.get(`/chatbot/conversations/${conversationId}`);
    return response.data;
  },

  /**
   * Get all conversations for the current user
   * @returns {Promise} Array of user conversations
   */
  getAllConversations: async () => {
    const response = await api.get('/chatbot/conversations');
    return response.data;
  },

  /**
   * Mark a conversation as completed
   * @param {string} conversationId - Conversation ID
   * @returns {Promise} Updated conversation
   */
  completeConversation: async (conversationId) => {
    const response = await api.patch(`/chatbot/conversations/${conversationId}/complete`);
    return response.data;
  },
};
