import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Auth, User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

interface AccountProps {
  auth: Auth;
}

const Account: React.FC<AccountProps> = ({ auth }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{user ? `Welcome, ${user.displayName || user.email}` : "Your Account"}</h2>
        </div>
        <div className="mt-8 space-y-6">
          {user ? (
            <>
              <div className="text-center">
                <FaUser className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-base text-gray-600">{user.email}</p>
              </div>
              <button onClick={handleSignOut} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <FaSignOutAlt className="mr-2 h-5 w-5" />
                Sign Out
              </button>
              <NavLink to="/profile" className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <FaUser className="mr-2 h-5 w-5" />
                View Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <FaSignInAlt className="mr-2 h-5 w-5" />
                Sign In
              </NavLink>
              <NavLink to="/register" className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <FaUserPlus className="mr-2 h-5 w-5" />
                Create an Account
              </NavLink>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Account;
