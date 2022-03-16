import { BlitzPage, Image } from "blitz";
import Layout from "app/core/layouts/Layout";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const testimonials: {
    picture: string;
    name: string;
    rating: number;
    review: string;
}[] = [
    {
        picture: "/profile-picture-1.webp",
        name: "Medousa Dakila",
        rating: 4,
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        picture: "/profile-picture-1.webp",
        name: "Reilly Alana",
        rating: 4,
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        picture: "/profile-picture-1.webp",
        name: "Hilary Lexie",
        rating: 5,
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        picture: "/profile-picture-1.webp",
        name: "Hilary Lexie",
        rating: 5,
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
];

function TestimonialCard({
    active,
    picture,
    name,
    rating,
    review,
    onMouseOver,
}: {
    active: boolean;
    picture: string;
    name: string;
    rating: number;
    review: string;
    onMouseOver: any;
}) {
    return (
        <>
            <style jsx scoped>{`
                .name {
                    font-family: "Jost", sans-serif;
                }
                .review-text {
                    font-family: "Nunito", sans-serif;
                }
            `}</style>
            <div
                className={`p-8 bg-white shadow-md rounded-lg transition-all duration-400 cursor-pointer ${
                    active ? "md:scale-105 md:shadow-xl" : ""
                }`}
                onMouseOver={onMouseOver}
            >
                <div className="flex flex-col">
                    <div
                        className="rounded-full w-20 h-20 bg-cover bg-center border-4 border-double border-white shadow-lg"
                        style={{
                            backgroundImage: `url(${picture})`,
                        }}
                    />
                    <p className="name my-4 text-lg font-semibold">{name}</p>
                    <div className="flex">
                        {[...Array(5)].map((_, index) => (
                            <FontAwesomeIcon
                                className={`${index < rating ? "text-yellow-300" : "text-gray-200"} w-5`}
                                key={index}
                                icon={faStar}
                            />
                        ))}
                    </div>
                    <p className="review-text mt-6 text-[#636363]">&ldquo;{review}&rdquo;</p>
                </div>
            </div>
        </>
    );
}

function Testimonials() {
    const [active, setActive] = useState(0);
    const [manual, setManual] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            if (manual) {
                return;
            }
            setActive(active == 3 ? 0 : active + 1);
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, [manual, active]);

    const onMouseOver = (index: number) => {
        setManual(true);
        setActive(index);
    };
    const onMouseOut = () => {
        setManual(false);
    };

    return (
        <>
            <style jsx>{`
                .section-header {
                    font-family: "Jost", sans-serif;
                }
            `}</style>
            <section className="max-w-7xl mx-auto my-20">
                <div className="flex flex-col items-center">
                    <h3 className="section-header text-2xl md:text-5xl mb-20">
                        Don&apos;t listen to us, listen to them.
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-7 p-4 md:p-0" onMouseOut={() => setManual(false)}>
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            onMouseOver={() => onMouseOver(index)}
                            active={active == index}
                            key={index}
                            picture={testimonial.picture}
                            name={testimonial.name}
                            rating={testimonial.rating}
                            review={testimonial.review}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

const Home: BlitzPage = () => {
    return (
        <>
            <style jsx>{`
                @keyframes loadZoom {
                    0% {
                        transform: scale(1);
                    }
                    100% {
                        transform: scale(1.15);
                    }
                }
                .header-image {
                    animation: 0.3s ease-out 0s 1 loadZoom;
                    animation-fill-mode: forwards;
                }
                .header-title {
                    font-family: "Yeseva One", cursive;
                }
                .plus {
                    vertical-align: 20px;
                }
            `}</style>
            <header className="header bg-cover bg-center max-w-7xl mx-auto pb-20">
                <div className="flex justify-between py-10">
                    <div className="header-title flex-1 flex">
                        <div className="flex flex-col justify-center md:pr-16 px-10 md:px-0">
                            <h1 className="hidden md:block text-7xl mb-16">
                                VIVA<span className="plus">+</span> SUPPLEMENTS
                            </h1>
                            <p className="text-xl">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden hidden md:block">
                        <img
                            className="w-full max-w-none transition-transform header-image"
                            src="/header-splash.jpeg"
                            alt="supplements"
                        />
                    </div>
                </div>
            </header>
            <Testimonials />
        </>
    );
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;
