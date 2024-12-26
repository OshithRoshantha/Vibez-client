import React from 'react'

export default function GlobalAlert({text,textOP,button1,button2,btn1Function,btn2Function}) {
  return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-left ">
            <h2 className="text-lg font-semibold text-black mb-1">
            {text}
            </h2>
            <p className="text-muted-foreground mb-4">{textOP}</p>
            <div className="flex justify-end space-x-4">
            <button onClick={btn1Function} className="bg-muted border-none text-muted-foreground hover:bg-gray-300 px-4 py-2 rounded">
                {button1}
            </button>
            <button onClick={btn2Function} className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded">
                {button2}
            </button>
            </div>
        </div>
        </div>
  )
}
