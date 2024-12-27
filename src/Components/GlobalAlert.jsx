import React from 'react'

export default function GlobalAlert({text,textOP,button1,button2,btn1Function,btn2Function,darkMode}) {
  return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{zIndex: '100'}}>
        <div className={`${darkMode ? 'bg-[#262729]' : 'bg-white'} p-6 rounded-lg shadow-lg text-left`}>
            <h2 className={`${darkMode ? 'text-white':'text-black'} text-lg font-semibold mb-1`} >
            {text}
            </h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-muted-foreground'} mb-4`}>{textOP}</p>
            <div className="flex justify-end space-x-4">
            <button onClick={btn1Function} className={`${darkMode ? 'bg-[#6a6b6d] text-white hover:bg-[#545454]':'bg-muted text-muted-foreground hover:bg-gray-300'} border-none px-4 py-2 rounded`}>
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
