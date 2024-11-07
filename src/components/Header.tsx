import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex text-white justify-between w-5/6 p-5 rounded-bl-lg rounded-br-lg mx-auto bg-sec-bg">
      <div>Logo</div>
      <nav>
        <ul className="flex gap-5">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
