import React from 'react';

export default function ReceiveMessage({ message, time }) {
  return (
    <div className="w-full flex justify-start">
      <div className="flex items-start mb-2">
        <div className="bg-[#1c1c1c] text-white p-2 rounded-lg max-w-xs break-words">
          <p className="text-sm">{message}</p>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
      </div>
    </div>
  );
}
