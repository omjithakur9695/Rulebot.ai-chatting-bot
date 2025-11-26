import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, Bot, StopCircle, ArrowDown } from 'lucide-react';
import { Message, Sender } from './types';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import { processMessage } from './services/ruleEngine';
import { v4 as uuidv4 } from 'uuid'; // We'll implement a simple ID generator instead of adding a dep

// Simple UUID generator to avoid external dependency for just one function
const generateId = () => Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    const userMessage: Message = {
      id: generateId(),
      text: userText,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate network delay / "thinking" time
    const delay = Math.min(1000, Math.max(500, userText.length * 20));

    setTimeout(() => {
      const botResponseText = processMessage(userText);
      
      const botMessage: Message = {
        id: generateId(),
        text: botResponseText,
        sender: 'bot',
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setIsTyping(false);
  };

  return (
    <div className="flex h-screen bg-gray-800 font-sans text-gray-100 overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        onNewChat={handleNewChat}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Top Bar (Mobile) */}
        <div className="sticky top-0 z-10 flex items-center p-2 text-gray-300 bg-gray-800 border-b border-white/10 md:hidden">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 rounded-md hover:bg-gray-900 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <span className="flex-1 text-center font-medium">RuleBot AI</span>
          <div className="w-8" /> {/* Spacer for centering */}
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="bg-gray-700/50 p-4 rounded-full mb-6">
                <Bot size={48} className="text-gray-300" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">RuleBot AI</h2>
              <p className="text-gray-400 mb-8 max-w-md">
                I am a simple rule-based chatbot. I match your keywords to predefined responses.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
                {[
                  "What can you do?",
                  "Tell me a joke",
                  "What time is it?",
                  "Explain React"
                ].map((text) => (
                  <button 
                    key={text}
                    onClick={() => {
                        const fakeEvent = { target: { value: text } } as any;
                        setInput(text);
                        // A bit hacky to trigger send immediately, better to use effect or direct call
                        // But for this UI we just fill input to let user send
                    }}
                    className="p-3 bg-gray-700/30 hover:bg-gray-700/50 border border-white/10 rounded-lg text-sm text-left transition-colors"
                  >
                    "{text}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col pb-32">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <div className="w-full py-6 bg-[#444654]/10 border-b border-black/5 animate-pulse">
                  <div className="max-w-3xl mx-auto px-4 md:px-6 flex gap-4 md:gap-6">
                    <div className="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
                        <Bot size={20} className="text-white" />
                    </div>
                    <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-bounce delay-75"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-800 via-gray-800 to-transparent pt-10 pb-6 px-4">
          <div className="max-w-3xl mx-auto relative">
            {messages.length > 0 && (
                <button 
                    onClick={scrollToBottom}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2 shadow-lg md:hidden border border-white/10"
                >
                    <ArrowDown size={16} />
                </button>
            )}
            
            <div className="relative flex items-end w-full p-3 bg-[#40414F] rounded-xl border border-black/10 shadow-md overflow-hidden ring-offset-2 focus-within:ring-2 ring-blue-500/50">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Send a message..."
                rows={1}
                className="w-full max-h-[200px] py-2 pr-10 bg-transparent border-0 text-white placeholder-gray-400 focus:ring-0 focus:outline-none resize-none overflow-y-auto m-0"
                style={{ minHeight: '24px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className={`absolute right-3 bottom-3 p-1.5 rounded-md transition-colors ${
                  input.trim() && !isTyping
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-transparent text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-center text-xs text-gray-400 mt-2 px-2">
              RuleBot may produce inaccurate information about people, places, or facts because it is just a bunch of if-else statements.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;