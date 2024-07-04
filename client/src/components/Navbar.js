import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/auth";

const Navbar = () => {
  const { SignOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await SignOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="border-b-2 border-black px-40 py-4 justify-between navbar sm:px-4">
        <Link to={"/"} className="font-bold normal-case text-2xl md:text-xl">
          NoteHub
        </Link>
        <div className="flex gap-6">
          {user && user.email && (
            <p className="font-semibold text-lg md:hidden">
              {user.email.split("@")[0]}
            </p>
          )}
          <button
            onClick={handleSignOut}
            disabled={!user || !user?.emailVerified}
            className="py-3 border-2 border-zinc-500 text-zinc-100 disabled:invisible px-4 bg-zinc-700 rounded-xl md:rounded-md hover:bg-zinc-300 duration-200 hover:text-zinc-800 md:py-2"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
