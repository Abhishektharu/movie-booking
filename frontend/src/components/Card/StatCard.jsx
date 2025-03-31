import React from 'react'

const StatCard = ({title, value, icon}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      {icon}
    </div>
  </div>
  )
}

export default StatCard