import { useState } from 'react';
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Messages = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(0);
  const [input, setInput] = useState('');

  // Simulated conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Mr. Dara',
      role: 'Teacher',
      avatar: 'MD',
      color: 'bg-blue-500',
      online: true,
      messages: [
        { id: 1, from: 'them', text: 'Please submit your assignment before Friday.', time: '9:30 AM' },
        { id: 2, from: 'me', text: 'I will submit it tomorrow. Thank you!', time: '9:45 AM' },
        { id: 3, from: 'them', text: 'Great. Looking forward to it.', time: '9:50 AM' },
      ]
    },
    {
      id: 2,
      name: 'Ms. Lina',
      role: 'Physics Teacher',
      avatar: 'ML',
      color: 'bg-purple-500',
      online: false,
      messages: [
        { id: 1, from: 'them', text: 'Your physics project looks good.', time: 'Yesterday' },
        { id: 2, from: 'me', text: 'Thank you Ms. Lina!', time: 'Yesterday' },
      ]
    },
    {
      id: 3,
      name: 'School Admin',
      role: 'Administration',
      avatar: 'SA',
      color: 'bg-emerald-500',
      online: true,
      messages: [
        { id: 1, from: 'them', text: 'Reminder: Fee payment deadline is approaching.', time: 'Monday' },
      ]
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const updated = [...conversations];
    updated[selectedChat].messages.push({
      id: updated[selectedChat].messages.length + 1,
      from: 'me',
      text: input,
      time: 'Just now'
    });
    setConversations(updated);
    setInput('');
  };

  const selectedConv = conversations[selectedChat];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      {/* Conversation list */}
      <div className="card overflow-hidden lg:col-span-1 flex flex-col">
        <div className="px-4 py-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-500 text-sm">{conversations.filter(c => c.online).length} online</p>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {conversations.map((conv, idx) => (
            <button
              key={conv.id}
              onClick={() => setSelectedChat(idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${selectedChat === idx ? 'bg-emerald-50 border-l-4 border-emerald-600' : 'border-l-4 border-transparent'}`}
            >
              <div className="relative">
                <div className={`w-11 h-11 rounded-full ${conv.color} text-white flex items-center justify-center font-semibold`}>
                  {conv.avatar}
                </div>
                {conv.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm truncate">{conv.name}</p>
                  <span className="text-xs text-gray-400 flex-shrink-0">{conv.messages[conv.messages.length - 1]?.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{conv.messages[conv.messages.length - 1]?.text}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      {selectedConv && (
        <div className="card lg:col-span-2 flex flex-col overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${selectedConv.color} text-white flex items-center justify-center font-semibold`}>
                {selectedConv.avatar}
              </div>
              <div>
                <p className="font-semibold text-sm">{selectedConv.name}</p>
                <p className="text-xs text-gray-500">{selectedConv.role} • {selectedConv.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {selectedConv.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${msg.from === 'me' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-800'} rounded-2xl px-4 py-2 shadow-sm`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-emerald-200' : 'text-gray-400'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 bg-white">
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              className="flex-1 input"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
              <Smile className="w-5 h-5" />
            </button>
            <button className="btn-primary p-2.5" onClick={handleSend}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;