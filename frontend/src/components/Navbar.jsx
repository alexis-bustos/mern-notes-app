import React, { useContext } from "react";
import { Link, useLocation } from "react-router";
import { PlusIcon } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // Hide login/register buttons if we're on login or register page
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="sticky top-0 z-50 bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            <Link to="/">NotesApp</Link>
          </h1>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to={"/create"} className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>
                <button onClick={logout} className="btn btn-outline btn-error">
                  Logout
                </button>
              </>
            ) : (
              !isAuthPage && ( // 👈 hide buttons on login/register pages
                <>
                  <Link to={"/login"} className="btn btn-outline">
                    Login
                  </Link>
                  <Link to={"/register"} className="btn btn-primary">
                    Register
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
