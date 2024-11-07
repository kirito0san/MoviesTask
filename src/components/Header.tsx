import { Link } from "react-router-dom";
import Logo from "../assets/Logo.webp";
export default function Header() {
  return (
    <div className="flex text-white justify-between w-[94%] p-5 rounded-bl-lg rounded-br-lg mx-auto bg-sec-bg">
      <div>
        <img className="w-[60px] h-[60px] rounded-2xl" src={Logo} alt="" />
      </div>
      <nav className="flex items-center">
        <ul className="flex gap-5">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
