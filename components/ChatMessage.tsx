import React from 'react';
import { User, Bot } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`w-full py-6 md:py-8 border-b border-black/5 ${isUser ? 'bg-transparent' : 'bg-[#444654]/10'}`}>
      <div className="max-w-3xl mx-auto px-4 md:px-6 flex gap-4 md:gap-6">
        <div className="flex-shrink-0 flex flex-col relative items-end">
          <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${isUser ? 'bg-indigo-500' : 'bg-green-500'}`}>
            {isUser ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="font-semibold text-sm opacity-90 mb-1">
            {isUser ? 'You' : 'RuleBot'}
          </div>
          <div className="prose prose-invert max-w-none text-base leading-7 whitespace-pre-wrap">
            {message.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;