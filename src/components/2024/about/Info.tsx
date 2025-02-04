const Info = () => {
  return (
    <div className="flex gap-6 p-6 bg-gradient-to-r from-pink-300 to-purple-500 min-h-screen justify-center items-center">
      {/* North Card */}
      <div className="bg-white rounded-2xl shadow-lg p-4 w-96">
        <div className="bg-blue-100 rounded-xl p-4">
          <h3 className="text-sm font-semibold">Financial Analyst <span className="bg-gray-200 px-2 py-1 rounded-md text-xs">SHARED</span></h3>
          <p className="mt-2 text-gray-700">Generate a donut chart visualizing each region’s share of unit demand.</p>
          <div className="bg-gray-100 p-2 mt-2 rounded-md">
            <p className="text-xs">I will use Python to create a donut chart from the provided data.</p>
            <p className="text-xs mt-1">Using 'Analyze and visualize data' tool</p>
          </div>
          <img src="/donut-chart-placeholder.png" alt="Donut Chart" className="mt-2 rounded-lg" />
        </div>
        <h2 className="text-lg font-bold mt-4">North</h2>
        <p className="text-gray-600 text-sm">Transform the way you work with secure AI agents, advanced search, and leading generative AI - all in one place.</p>
        <a href="#" className="text-blue-600 text-sm font-semibold mt-2 inline-block">Learn more</a>
      </div>
      
      {/* Compass Card */}
      <div className="bg-white rounded-2xl shadow-lg p-4 w-96">
        <div className="bg-gray-900 text-white rounded-xl p-4">
          <h3 className="text-sm font-semibold">DOCUMENT</h3>
          <p className="text-xs text-gray-300">Q4 Revenue projection</p>
          <div className="bg-gray-800 p-2 mt-2 rounded-md flex items-center justify-between">
            <input type="text" placeholder="Pull documentation for Q4 revenue?" className="bg-transparent text-white text-sm w-full focus:outline-none" />
            <button className="bg-white text-black px-3 py-1 rounded-lg text-sm">Search</button>
          </div>
          <div className="mt-4 bg-gray-800 p-4 rounded-md">
            <p className="text-xs text-gray-300">Sales Performance</p>
            <div className="h-16 bg-gray-700 rounded-md"></div>
          </div>
        </div>
        <h2 className="text-lg font-bold mt-4">Compass</h2>
        <p className="text-gray-600 text-sm">Unlock the potential of your data with an intelligent search and discovery system that doesn't compromise on security.</p>
        <a href="#" className="text-blue-600 text-sm font-semibold mt-2 inline-block">Learn more</a>
      </div>
    </div>
  );
};

export default Info;
