import React from 'react';

export default function GroupSendMessage({ message, time }) {
  return (
    <div className="w-full flex justify-end">
      <div className="flex items-start mb-2">
        <div className="bg-primary text-white p-2 rounded-lg max-w-xs break-words">
          <p className="text-sm">{message}</p>
          <span className="text-xs text-gray-600">{time}</span>
        </div>
      </div>
    </div>
  );
}
