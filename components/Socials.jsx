import Link from "next/link";
import { FaBehance, FaInstagram, FaFacebook } from "react-icons/fa";

const socials = [
    { icon: <FaBehance/>, path: "https://www.behance.net" },
    { icon: <FaInstagram />, path: "https://www.instagram.com/" },
    { icon: <FaFacebook />, path: "https://facebook.com/" },
];

const Social = ({ containerStyles = "flex gap-4 justify-center", iconStyles = "" }) => {
    return (
    <div className={containerStyles}>
        {socials.map((item, index) => (
        <Link
            key={index}
            href={item.path}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 border rounded-full flex justify-center items-center border-[#03d3b0] text-[#03d3b0]  hover:bg-[#03d3b0] hover:text-[#231e64] text-base hover:transition-all duration-500"
        >
            {item.icon}
        </Link>
        ))}
    </div>
    );
};

export default Social;

