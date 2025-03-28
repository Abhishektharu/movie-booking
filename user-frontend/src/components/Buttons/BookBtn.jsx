import React from 'react'

const BookBtn = ({label, onClick }) => {
  return (
<button className="relative inline-flex items-center justify-center px-6 py-3 text-white font-mono text-lg font-semibold transition-transform transform-gpu border-0 rounded-md shadow-md bg-gradient-to-r from-sky-400 to-indigo-600 hover:shadow-lg hover:-translate-y-1 active:shadow-inner active:translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      onClick={onClick}
    >
      {label}
    </button>  );
}

export default BookBtn;