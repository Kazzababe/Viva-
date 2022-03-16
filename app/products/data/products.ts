// Not sure if this is what you want or if we want more specific types rather than just strings.
export type Product = {
    name: string;
    price: number;
    contents: string[];
    description: string;
    image: string;
    subscribable: boolean;
};

export const Products: Product[] = [
    {
        name: "The nerd package",
        price: 420.69,
        contents: [
            "Package of Yu-gi-oh cards.",
            '"Ordinary Differential Equations: From Calculus to Dynamical Systems" by Virginia Noonburg.',
            "Denim jeans with suspenders.",
            "Anti-anti-acne cream.",
        ],
        description:
            "A package of supplements intended to bring out your inner nerd. Love having sexual intercourse? Well neither do we and this package is perfect for you. It'll lower your libido to near-zero, increase the pitch of your voice, and give you a new found love for collectible card games.",
        image: "/products/demo.png",
        subscribable: true,
    },
    {
        name: "Package 1",
        price: 1,
        contents: [""],
        description: "Test package 1",
        image: "/products/demo.png",
        subscribable: true,
    },
    {
        name: "Package 2",
        price: 1,
        contents: [""],
        description: "Test package 2",
        image: "/products/demo.png",
        subscribable: true,
    },
    {
        name: "Package 3",
        price: 1,
        contents: [""],
        description: "Test package 3",
        image: "/products/demo.png",
        subscribable: true,
    },
    {
        name: "Package 4",
        price: 1,
        contents: [""],
        description: "Test package 4",
        image: "/products/demo.png",
        subscribable: true,
    },
];
