

function Navbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-3/4 mx-auto ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <lord-icon
            src="https://cdn.lordicon.com/vyqvtrtg.json"
            trigger="loop"
            colors="primary:#000000"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon>
          <span className="self-center  text-2xl font-semibold whitespace-nowrap dark:text-white">
            Password Generator
          </span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
