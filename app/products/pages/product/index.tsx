import Layout from "../../../core/layouts/Layout";
import { BlitzPage } from "blitz";
import { Product, Products } from "../../data/products";
import { useRef, useState } from "react";

function ProductCell({ product }: { product: Product }) {
    const [transform, setTransform] = useState([0, 0])
    const lastRan = useRef(Date.now())

    const onMouseMove = (e) => {
        const now = Date.now()

        if (now - lastRan.current <= 10) {
            return
        }
        lastRan.current = now

        const bounds = e.target.getBoundingClientRect()

        const left = (e.clientX - bounds.left) / bounds.width
        const top = (e.clientY - bounds.top) / bounds.height

        setTransform([left * 100, top * 100])
    };
    const formatPrice = (price: number) => {
        return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)
    };

    return (
        <>
            <style jsx scoped>{`
                .product-title {
                    font-family: "Nunito", sans-serif;
                    font-weight: 600;
                    text-transform: uppercase;
                }
                .product-category {
                    font-family: "Jost", sans-serif;
                }
            `}</style>
            <div className="bg-white rounded-md p-4 shadow-lg box-content">
                <div className="overflow-hidden rounded-md cursor-pointer" onMouseMove={onMouseMove}>
                    <img
                        className="hover:scale-[1.2] transition-transform duration-200"
                        alt={product.name}
                        src={product.image}
                        style={{
                            transformOrigin: `${transform[0]}% ${transform[1]}%`,
                        }}
                    />
                </div>
                <div className="py-2">
                    <p className="product-category uppercase text-gray-600 text-sm">Vitamin</p>
                    <h4 className="product-title text-gray-800 text-lg">{product.name}</h4>
                </div>
                <div className="">
                    <div className="">
                        <p className="text-gray-700 text-xl">{formatPrice(product.price)}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

function ProductGrid({ products }: { products: Product[] }) {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 xl:p-0 md:gap-6">
                {products.map((product: Product, index) => (
                    <ProductCell key={index} product={product} />
                ))}
            </div>
        </>
    );
}

const AllProductsPage: BlitzPage = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto mt-24">
                <ProductGrid products={Products} />
            </div>
        </>
    );
};

AllProductsPage.suppressFirstRenderFlicker = true;
AllProductsPage.getLayout = (page) => <Layout title="All products">{page}</Layout>;

export default AllProductsPage;
