const Header = () => {
  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
        <div className="flex justify-between items-center">
            <div>
                <p className="text-4xl font-bold">Home</p>
            </div>
        </div>
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button</button>
        </div>
    </div>
  )
}

export default Header