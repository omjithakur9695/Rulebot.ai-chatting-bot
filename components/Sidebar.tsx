import React from 'react';
import { Plus, MessageSquare, Settings, LogOut, PanelLeftClose } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onNewChat }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar Container */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-black md:bg-gray-950 flex flex-col transition-transform duration-300 ease-in-out border-r border-white/10 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:static'}`}
      >
        <div className="p-3 flex-none">
          <button 
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) toggleSidebar();
            }}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-md border border-white/20 hover:bg-gray-900 transition-colors text-sm text-white"
          >
            <Plus size={16} />
            <span>New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="text-xs font-semibold text-gray-500 px-3 py-2">Today</div>
          <button className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-gray-900 transition-colors text-sm text-gray-100 truncate text-left group">
            <MessageSquare size={16} className="text-gray-400 group-hover:text-white" />
            <span className="truncate">Rule-based Logic</span>
          </button>
           <button className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-gray-900 transition-colors text-sm text-gray-100 truncate text-left group">
            <MessageSquare size={16} className="text-gray-400 group-hover:text-white" />
            <span className="truncate">React Development</span>
          </button>
        </div>

        <div className="flex-none p-3 border-t border-white/10">
          <button className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-gray-900 transition-colors text-sm text-white">
            <Settings size={16} />
            <span>Settings</span>
          </button>
           <div className="flex items-center gap-3 w-full px-3 py-3 mt-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-xs font-bold text-white">
              U
            </div>
            <div className="text-sm font-medium">User Account</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;