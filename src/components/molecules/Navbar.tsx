import { motion } from "framer-motion";
import ConnectButtonCustom from "../atoms/ConnectButtonCustom";
import { Link } from "react-router-dom";
import SearchInput from "../atoms/SearchInput";

const Navbar = () => {
    return (
        <section>
            <SimpleFloatingNav />
        </section>
    );
};

const SimpleFloatingNav = () => {
    return (
        <nav className="fixed left-[50%] top-8 flex w-fit -translate-x-[50%] items-center gap-6 rounded-lg border-[1px] border-neutral-700 bg-white p-2 text-sm text-neutral-800 z-50">
            <NavLink to="/page/1">Home</NavLink>
            <ConnectButtonCustom />
            <SearchInput />
        </nav>
    );
};
const NavLink = ({ children, to }: any) => {
    return (
        <Link to={to} rel="nofollow" className="block overflow-hidden">
            <motion.div
                whileHover={{ y: -20 }}
                transition={{ ease: "backInOut", duration: 0.5 }}
                className="h-[20px]"
            >
                <span className="flex flex-row h-[20px] items-center">{children}</span>
                <span className="flex flex-row h-[20px] items-center text-indigo-500">
                    {children}
                </span>
            </motion.div>
        </Link>
    );
};

export default Navbar;