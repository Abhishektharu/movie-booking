const Navbar = () => {
  return (
    <nav className="p-4 bg-black flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">MovieApp</h1>
      <div>
        <a href="#" className="mx-2 text-gray-400 hover:text-white">Home</a>
        <a href="#" className="mx-2 text-gray-400 hover:text-white">Movies</a>
        <a href="#" className="mx-2 text-gray-400 hover:text-white">About</a>
      </div>
    </nav>
  );
};

export default Navbar;
