import * as React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 opacity-80 bg-zinc-900 text-white border-b-2 border-cyan-700">
      <nav className="w-11/12 mx-auto py-2 flex items-center justify-between">
        <Link to="/" className="text-2xl items-center font-bold hover:text-cyan-600">
        <i class="fas fa-code"></i> DevConnector
        </Link>
        <div className="flex items-center gap-10 text-l font-bolder">
          <Link to="/profiles" className="items-start hover:text-cyan-600">
            Developers
          </Link>
          <Link to="/register" className="hover:text-cyan-600">
            Register
          </Link>
          <Link to="/login" className="hover:text-cyan-600">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;