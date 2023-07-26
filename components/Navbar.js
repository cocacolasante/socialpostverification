"use client"
import Link from "next/link";
import { useContext } from "react";
import { Web3Context } from "../context/Web3Context";

const Navbar = () => {
  const { connectToWallet, currentAccount } = useContext(Web3Context);

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500">
      <ul className="flex space-x-3 text-white ">
        <li className="hover:shadow-xl ">
          <Link  href="/">Home</Link>
        </li>
        <li className="hover:shadow-xl ">
          <Link href="/createpost">Create Post</Link>
        </li>
        <li className="hover:shadow-xl ">
          <Link href="/findposts">Find users posts</Link>
        </li>
        <li className="hover:shadow-xl ">
          <Link href="/yourposts">Your Posts</Link>
        </li>
      </ul>
      <div>
        {/* create the network catch for the correct blockchain */}
        {!currentAccount ? (
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={connectToWallet}
          >
            Connect
          </button>
        ) : (
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={null}
          >
            {currentAccount.slice(0, 4)}...{currentAccount.slice(-6)}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
