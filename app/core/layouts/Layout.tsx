import { Head, BlitzLayout, useMutation, Link, Routes, useRouter } from "blitz";
import { useCurrentUser } from "../hooks/useCurrentUser";
import logout from "../../auth/mutations/logout";
import { Suspense, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faTwitter, faTiktok, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Navbar() {
    const currentUser = useCurrentUser();
    const [logoutMutation] = useMutation(logout);
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();

    const open = () => {
        setExpanded(true);
    };
    const close = () => {
        setExpanded(false);
    };

    const LeftNavLink = ({ href, children, className }: { href: any; children: any; className?: string }) => {
        return (
            <>
                <style jsx scoped>{`
                    .link {
                        font-family: "Nunito", sans-serif;
                    }
                `}</style>
                <Link href={href}>
                    <a
                        className={`link ${className} p-3 uppercase border-b-2 border-transparent hover:border-gray-700 transition-all duration-200`}
                    >
                        {children}
                    </a>
                </Link>
            </>
        );
    };

    return (
        <nav className={`bg-white ${router.route === "/" ? "" : "border-b-2 border-gray-200"}`}>
            <style jsx>{`
                @import url("https://fonts.googleapis.com/css2?family=Nunito&family=Yeseva+One&display=swap");
                @import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&display=swap");

                .logo {
                    font-family: "Yeseva One", cursive;
                }
                .plus {
                    vertical-align: 3px;
                }
            `}</style>
            <div className="flex items-center max-w-7xl mx-auto px-4 py-4 flex justify-between h-16 relative">
                <div className="flex items-center flex-1 justify-center md:justify-start">
                    <div className="flexspace-x-7 text-lg md:mr-5 text-gray-700 relative">
                        <Link href={Routes.Home()}>
                            <a className="logo text-2xl">
                                VIVA<span className="plus">+</span>
                            </a>
                        </Link>
                    </div>
                    <div className="flex hidden sm:flex text-gray-700">
                        <LeftNavLink href={Routes.QuestionsStartPage()}>Take the quiz!</LeftNavLink>
                        <LeftNavLink href={Routes.AllProductsPage()}>Shop All</LeftNavLink>
                        <LeftNavLink href={""}>Learn More</LeftNavLink>
                    </div>
                </div>
                <div className="hidden sm:flex">
                    <Link href={""}>
                        <FontAwesomeIcon className="w-5 mx-2 cursor-pointer text-gray-700" icon={faUser} />
                    </Link>
                    <Link href={""}>
                        <FontAwesomeIcon className="w-6 mx-2 cursor-pointer text-gray-700" icon={faShoppingCart} />
                    </Link>
                </div>
                <div className="sm:hidden absolute right-4">
                    <div className="">
                        <div className="cursor-pointer" tabIndex={0} onFocus={open}>
                            <FontAwesomeIcon className="w-6 text-black z-50" icon={expanded ? faTimes : faBars} />
                        </div>
                        <div
                            className={`${
                                expanded ? "flex" : "hidden"
                            } flex-col bg-black p-4 whitespace-nowrap left-0 right-0 top-0 shadow fixed`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="cursor-pointer" tabIndex={0} onFocus={close}>
                                <FontAwesomeIcon
                                    className={`ml-auto w-6 text-gray-200 z-50 right-4`}
                                    icon={expanded ? faTimes : faBars}
                                />
                            </div>
                            <ul className="flex flex-col items-center" onClick={close}>
                                <li className="p-4 cursor-pointer text-gray-200 font-semibold">
                                    <Link href={Routes.Home()}>Take the quiz</Link>
                                </li>
                                <li className="p-4 cursor-pointer text-gray-200 font-semibold">
                                    <Link href={Routes.AllProductsPage()}>Shop All</Link>
                                </li>
                                <li className="p-4 cursor-pointer text-gray-200 font-semibold">
                                    <Link href={Routes.Home()}>Learn about VIVA+</Link>
                                </li>
                                <hr />
                                {currentUser ? (
                                    <>
                                        <li className="p-4 cursor-pointer text-gray-200 font-semibold">
                                            <Link href={""}>My Account</Link>
                                        </li>
                                        <li className="p-4 cursor-pointer text-gray-200 font-semibold">
                                            <button
                                                onClick={async () => {
                                                    await logoutMutation();
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="p-4 cursor-pointer text-gray-200 font-semibold">
                                            <Link href={Routes.LoginPage()}>Login</Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function Footer({ href = "" }: { href?: any }) {
    const ListItem = ({ className, children }: { className?: string; children: any }) => {
        return (
            <>
                <Link href={href}>
                    <ul className={`list-item ${className} mb-3 cursor-pointer text-lg`}>{children}</ul>
                </Link>
            </>
        );
    };

    return (
        <>
            <style jsx scoped>{`
                .logo {
                    font-family: "Yeseva One", cursive;
                }
                .list-title {
                    font-family: "Jost", sans-serif;
                    font-weight: 500;
                }
                .list-item {
                    font-family: "Nunito", sans-serif;
                }
            `}</style>
            <section className="bg-[#221f20] mt-24 flex-shrink-0">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 pt-16 pb-10">
                        <div className="mx-auto md:ml-0 mb-8 md:mb-0">
                            <ul className="text-white list-none text-center md:text-left">
                                <h4 className="list-title text-2xl mb-2 text-gray-300">LEARN MORE</h4>
                                <ListItem>Link 1</ListItem>
                                <ListItem>Link 2</ListItem>
                                <ListItem>Link 3</ListItem>
                                <ListItem>Link 4</ListItem>
                            </ul>
                        </div>
                        <div className="mx-auto md:ml-0 mb-8 md:mb-0">
                            <ul className="text-white list-none text-center md:text-left">
                                <h4 className="list-title text-2xl mb-3 text-gray-300">SUPPORT</h4>
                                <ListItem>Link 1</ListItem>
                                <ListItem>Link 2</ListItem>
                                <ListItem>Link 3</ListItem>
                            </ul>
                        </div>
                        <div className="mx-auto" />
                        <div className="mx-auto md:mr-0 md:ml-auto">
                            <p className="list-title text-2xl mb-3 text-gray-200">SOCIALS</p>
                            <div className="flex">
                                <FontAwesomeIcon className="w-6 text-gray-200 cursor-pointer" icon={faTwitter} />
                                <FontAwesomeIcon className="w-6 text-gray-200 ml-3 cursor-pointer" icon={faTiktok} />
                                <FontAwesomeIcon className="w-6 text-gray-200 ml-3 cursor-pointer" icon={faInstagram} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 border-gray-400 border-t-2 py-10 text-center md:text-left">
                        <Link href={Routes.Home()}>
                            <a className="logo text-2xl text-gray-50">
                                VIVA<span className="plus">+</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

const Layout: BlitzLayout<{ title?: string; footer?: boolean }> = ({ title, footer = true, children }) => {
    return (
        <>
            <Head>
                <title>{title || "VivaWebsite"}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Suspense fallback={<p>Loading..</p>}>
                <Navbar />
            </Suspense>
            <div className="flex-1">{children}</div>

            {footer && <Footer />}
        </>
    );
};

export default Layout;
