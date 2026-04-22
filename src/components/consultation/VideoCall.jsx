import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button, 
  Badge, 
  Input, 
  Textarea 
} from '../ui';

const VideoCall = ({ onEndCall }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [callNotes, setCallNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('idle'); // idle, recording, paused

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const chatContainerRef = useRef(null);

  const startCallTimer = () => {
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    // Simulate call connection
    const timer = setTimeout(() => {
      setIsConnected(true);
      startCallTimer();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    setParticipants(prev => 
      prev.map(p => p.id === 1 ? { ...p, isVideoEnabled: !isVideoEnabled } : p)
    );
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    setParticipants(prev => 
      prev.map(p => p.id === 1 ? { ...p, isAudioEnabled: !isAudioEnabled } : p)
    );
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'You',
        content: newMessage,
        timestamp: new Date(),
        type: 'user'
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate response
      setTimeout(() => {
        const response = {
          id: Date.now() + 1,
          sender: 'Dr. Sarah Johnson',
          content: 'Thank you for your message. Let me help you with that.',
          timestamp: new Date(),
          type: 'other'
        };
        setChatMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const startRecording = () => {
    setRecordingStatus('recording');
  };

  const pauseRecording = () => {
    setRecordingStatus('paused');
  };

  const stopRecording = () => {
    setRecordingStatus('idle');
  };

  const endCall = () => {
    if (onEndCall) {
      onEndCall({
        duration: callDuration,
        notes: callNotes,
        messages: chatMessages
      });
    }
  };

  const getConnectionQualityColor = (quality) => {
    switch (quality) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`h-screen bg-gray-900 ${isFullscreen ? 'fixed inset-0 z-50' : 'relative'}`}>
      {/* Connection Status */}
      {!isConnected && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-white text-xl font-semibold mb-2">Connecting to consultation...</h2>
            <p className="text-gray-400">Please wait while we establish the connection</p>
          </div>
        </div>
      )}

      {/* Main Video Area */}
      <div className="relative h-full">
        {/* Remote Video (Main) */}
        <div className="absolute inset-0 bg-gray-800">
          <video
            ref={remoteVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />
          
          {/* Placeholder for remote video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-white text-xl font-semibold">Dr. Sarah Johnson</h3>
              <p className="text-gray-400">Nutritionist</p>
            </div>
          </div>
        </div>

        {/* Local Video (Picture-in-Picture) */}
        <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg shadow-lg">
          <video
            ref={localVideoRef}
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            muted
            playsInline
          />
          
          {/* Placeholder for local video */}
          <div className="absolute inset-0 flex items-center justify-center rounded-lg">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          
          {/* Video/Audio Status Indicators */}
          <div className="absolute bottom-2 left-2 flex space-x-1">
            {!isVideoEnabled && (
              <div className="bg-red-600 rounded-full p-1">
                <VideoOff className="h-3 w-3 text-white" />
              </div>
            )}
            {!isAudioEnabled && (
              <div className="bg-red-600 rounded-full p-1">
                <MicOff className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Call Header */}
        <div className="absolute top-4 left-4 right-64 flex items-center justify-between">
          <div className="bg-black bg-opacity-50 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-3">
              <div>
                <h3 className="text-white font-semibold">Consultation with Dr. Sarah Johnson</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-300">{formatDuration(callDuration)}</span>
                  <span className={`text-xs ${getConnectionQualityColor(connectionQuality)}`}>
                    Connection: {connectionQuality}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {recordingStatus !== 'idle' && (
            <div className="bg-red-600 rounded-lg px-3 py-1 flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">
                {recordingStatus === 'recording' ? 'Recording' : 'Paused'}
              </span>
            </div>
          )}
        </div>

        {/* Control Panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75">
          <div className="flex items-center justify-center space-x-4 p-4">
            {/* Mute/Unmute */}
            <Button
              variant={isAudioEnabled ? "secondary" : "destructive"}
              size="lg"
              onClick={toggleAudio}
              className="rounded-full p-4"
            >
              {isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
            </Button>

            {/* Video On/Off */}
            <Button
              variant={isVideoEnabled ? "secondary" : "destructive"}
              size="lg"
              onClick={toggleVideo}
              className="rounded-full p-4"
            >
              {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
            </Button>

            {/* Screen Share */}
            <Button
              variant={isScreenSharing ? "default" : "secondary"}
              size="lg"
              onClick={toggleScreenShare}
              className="rounded-full p-4"
            >
              <Share className="h-6 w-6" />
            </Button>

            {/* Recording Controls */}
            <div className="flex space-x-2">
              {recordingStatus === 'idle' ? (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={startRecording}
                  className="rounded-full p-4"
                >
                  <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                </Button>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={recordingStatus === 'recording' ? pauseRecording : startRecording}
                    className="rounded-full p-4"
                  >
                    {recordingStatus === 'recording' ? '⏸️' : '⏺️'}
                  </Button>
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={stopRecording}
                    className="rounded-full p-4"
                  >
                    ⏹️
                  </Button>
                </>
              )}
            </div>

            {/* Chat */}
            <Button
              variant={showChat ? "default" : "secondary"}
              size="lg"
              onClick={() => setShowChat(!showChat)}
              className="rounded-full p-4"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>

            {/* Notes */}
            <Button
              variant={showNotes ? "default" : "secondary"}
              size="lg"
              onClick={() => setShowNotes(!showNotes)}
              className="rounded-full p-4"
            >
              <div className="text-lg">📝</div>
            </Button>

            {/* Settings */}
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full p-4"
            >
              <Settings className="h-6 w-6" />
            </Button>

            {/* Fullscreen */}
            <Button
              variant="secondary"
              size="lg"
              onClick={toggleFullscreen}
              className="rounded-full p-4"
            >
              {isFullscreen ? <Minimize2 className="h-6 w-6" /> : <Maximize2 className="h-6 w-6" />}
            </Button>

            {/* End Call */}
            <Button
              variant="destructive"
              size="lg"
              onClick={endCall}
              className="rounded-full p-4"
            >
              <PhoneOff className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="absolute right-0 top-0 bottom-20 w-80 bg-white shadow-lg">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Chat</h3>
              </div>
              
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm font-medium">{message.sender}</p>
                      <p>{message.content}</p>
                      <p className="text-xs opacity-75 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage}>Send</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes Panel */}
        {showNotes && (
          <div className="absolute right-0 top-0 bottom-20 w-80 bg-white shadow-lg">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Consultation Notes</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <Textarea
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  placeholder="Take notes during the consultation..."
                  className="h-full resize-none"
                />
              </div>
              
              <div className="p-4 border-t">
                <Button className="w-full">Save Notes</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
