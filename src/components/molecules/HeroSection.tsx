import { useAnimate } from "framer-motion";
import { MouseEventHandler, ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowDownCircle } from "react-icons/fi";

export const HeroSection = () => {
    return (
        <MouseImageTrail
            renderImageBuffer={50}
            rotationRange={25}
            images={[
                "https://ongpng.com/wp-content/uploads/2023/04/3-10.png",
                "https://ongpng.com/wp-content/uploads/2023/04/1-10.png",
                "https://ongpng.com/wp-content/uploads/2023/04/6solana-logo-1046x878-2.png"
            ]}
        >
            <section className="h-screen bg-slate-200">
                <Copy />
                <WatermarkWrapper />
            </section>
        </MouseImageTrail>
    );
};

const Copy = () => {
    return (
        <div className="absolute bottom-0 left-0 right-0 z-40">
            <div className="flex items-end justify-between p-4 mx-auto max-w-7xl md:p-8">
                <div>
                    <h1 className="mb-6 max-w-4xl text-6xl font-black leading-[1.1] text-slate-900 md:text-8xl">
                        Welcome to <span className="text-indigo-500">CoinTracker</span>.
                    </h1>
                    <p className="max-w-xl text-slate-700 md:text-lg">
                        Monitor market trends, price fluctuations, and trading volumes with our intuitive charts and graphs. Identify opportunities for growth and potential risks to make data-driven investment decisions.
                    </p>
                </div>
                <FiArrowDownCircle className="hidden text-8xl text-slate-500 md:block" />
            </div>
        </div>
    );
};

const WatermarkWrapper = () => {
    return (
        <>
            <Watermark text="Blockchain Secure" />
            <Watermark text="Verified by Blockchain" reverse />
            <Watermark text="Blockchain Integrity" />
            <Watermark text="Protected by Blockchain" reverse />
            <Watermark text="Immutable Blockchain" />
            <Watermark text="Trust in Blockchain" reverse />
            <Watermark text="Blockchain Transparency" />
            <Watermark text="Blockchain Verified" reverse />
        </>
    );
};

const Watermark = ({ reverse, text }: { reverse?: boolean; text: string }) => (
    <div className="flex overflow-hidden -translate-y-12 select-none">
        <TranslateWrapper reverse={reverse}>
            <span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-300">
                {text}
            </span>
        </TranslateWrapper>
        <TranslateWrapper reverse={reverse}>
            <span className="ml-48 w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-300">
                {text}
            </span>
        </TranslateWrapper>
    </div>
);

const TranslateWrapper = ({
    children,
    reverse,
}: {
    children: ReactNode;
    reverse?: boolean;
}) => {
    return (
        <motion.div
            initial={{ translateX: reverse ? "-100%" : "0%" }}
            animate={{ translateX: reverse ? "0%" : "-100%" }}
            transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
            className="flex"
        >
            {children}
        </motion.div>
    );
};

const MouseImageTrail = ({
    children,
    images,
    renderImageBuffer,
    rotationRange,
}: {
    children: ReactNode;
    images: string[];
    renderImageBuffer: number;
    rotationRange: number;
}) => {
    const [scope, animate] = useAnimate();

    const lastRenderPosition = useRef({ x: 0, y: 0 });
    const imageRenderCount = useRef(0);

    const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
        const { clientX, clientY } = e;

        const distance = calculateDistance(
            clientX,
            clientY,
            lastRenderPosition.current.x,
            lastRenderPosition.current.y
        );

        if (distance >= renderImageBuffer) {
            lastRenderPosition.current.x = clientX;
            lastRenderPosition.current.y = clientY;

            renderNextImage();
        }
    };

    const calculateDistance = (
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ) => {
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;

        // Using the Pythagorean theorem to calculate the distance
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        return distance;
    };

    const renderNextImage = () => {
        const imageIndex = imageRenderCount.current % images.length;
        const selector = `[data-mouse-move-index="${imageIndex}"]`;

        const el = document.querySelector(selector) as HTMLElement;

        el.style.top = `${lastRenderPosition.current.y}px`;
        el.style.left = `${lastRenderPosition.current.x}px`;
        el.style.zIndex = imageRenderCount.current.toString();

        const rotation = Math.random() * rotationRange;

        animate(
            selector,
            {
                opacity: [0, 1],
                transform: [
                    `translate(-50%, -25%) scale(0.5) ${imageIndex % 2
                        ? `rotate(${rotation}deg)`
                        : `rotate(-${rotation}deg)`
                    }`,
                    `translate(-50%, -50%) scale(1) ${imageIndex % 2
                        ? `rotate(-${rotation}deg)`
                        : `rotate(${rotation}deg)`
                    }`,
                ],
            },
            { type: "spring", damping: 15, stiffness: 200 }
        );

        animate(
            selector,
            {
                opacity: [1, 0],
            },
            { ease: "linear", duration: 0.5, delay: 1 }
        );

        imageRenderCount.current = imageRenderCount.current + 1;
    };

    return (
        <div
            ref={scope}
            className="relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {children}

            {images.map((img, index) => (
                <img
                    className="absolute top-0 left-0 object-cover w-auto border-2 opacity-0 pointer-events-none h-36 rounded-xl border-slate-900 bg-slate-800"
                    src={img}
                    alt={`Mouse move image ${index}`}
                    key={index}
                    data-mouse-move-index={index}
                />
            ))}
        </div>
    );
};