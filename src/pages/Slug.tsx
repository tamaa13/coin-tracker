import { Link, useParams } from "react-router-dom"
import useStore from "../../store"
import { useEffect } from "react"
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatCurrency } from "../../utils/helper/formatCurrency"
import { Loaders } from "../components/atoms/Loaders";

const Slug = () => {
    const { slug } = useParams()
    const { fetchSlug, loadingSlug } = useStore()

    useEffect(() => {
        fetchSlug(slug)
    }, [slug])

    return (
        <>
            {loadingSlug ? <Loaders /> :
                <div className="flex justify-between gap-5 p-40">
                    <CardDetail />
                    <div>
                        <TableMarket />
                    </div>
                </div>
            }
        </>
    )
}

export default Slug

const CardDetail = () => {
    return (
        <TiltCard />
    );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = () => {
    const { listSlug } = useStore()
    const ref = useRef<HTMLDivElement | null>(null);

    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rY = mouseX / width - HALF_ROTATION_RANGE;
        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;

        setRotateX(rX);
        setRotateY(rY);
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
            }}
            animate={{
                rotateX,
                rotateY,
            }}
            className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute grid bg-white shadow-lg inset-4 place-content-center rounded-xl"
            >
                <div style={{
                    transform: "translateZ(50px)",
                }} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-2xl font-bold">
                            <img src={listSlug?.image?.small} alt={listSlug?.name} className="" />
                            <span>{listSlug?.localization?.en ? listSlug?.localization?.en : 'N/A'}</span>
                        </div>
                        <div className="flex gap-2 mb-2 text-xl font-bold">
                            <span>{formatCurrency(listSlug?.market_data?.current_price?.usd)}</span> <span>({listSlug?.market_data?.price_change_percentage_24h?.toFixed(1) ? listSlug?.market_data?.price_change_percentage_24h?.toFixed(1) : 'N/A'}%)</span>
                        </div>
                        <div className="flex justify-between gap-10 text-xs">
                            Market Cap <span>{formatCurrency(listSlug?.market_data?.market_cap?.usd ? listSlug?.market_data?.market_cap?.usd : 'N/A')}</span>
                        </div>
                        <div className="flex justify-between gap-10 text-xs">
                            FDV <span>{formatCurrency(listSlug?.market_data?.fully_diluted_valuation?.usd ? listSlug?.market_data?.fully_diluted_valuation?.usd : 'N/A')}</span>
                        </div>
                        <div className="flex justify-between gap-10 text-xs">
                            Circulating Supply <span>{formatCurrency(listSlug?.market_data?.circulating_supply ? listSlug?.market_data?.circulating_supply : 'N/A')}</span>
                        </div>
                        <div className="flex justify-between gap-10 text-xs">
                            Total Supply <span>{listSlug?.market_data?.total_supply ? listSlug?.market_data?.total_supply : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between gap-10 text-xs">
                            Max Supply <span>{listSlug?.market_data?.max_supply ? listSlug?.market_data?.max_supply : 'N/A'}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 pt-2 text-center">
                        <span className="text-xs font-bold">Contract Address</span>
                        <div className="flex justify-between gap-10 text-xs font-bold">
                            <span className="flex justify-center">{listSlug?.contract_address?.slice(0, 25) + "..." ? listSlug?.contract_address?.slice(0, 25) + "..." : 'N/A'}</span>
                        </div>
                        <button onClick={() => navigator.clipboard.writeText(listSlug?.contract_address)} className="rounded-2xl border-2 border-dashed border-black bg-white p-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


const TableMarket = () => {
    const { listSlug } = useStore();
    const [pageNumber, setPageNumber] = useState(1);
    const dataPerPage = 10;

    const handlePrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(listSlug?.tickers.length / dataPerPage);
        if (pageNumber < totalPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const renderTickers = () => {
        const startIndex = (pageNumber - 1) * dataPerPage;
        const endIndex = Math.min(startIndex + dataPerPage, listSlug?.tickers.length);

        return listSlug?.tickers.slice(startIndex, endIndex).map((el: any, idx: number) => (
            <tr key={idx}>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="font-bold text-gray-900 whitespace-no-wrap">
                        {el?.market?.name}
                    </p>
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap ">
                        {el?.base}/{el?.target}
                    </p>
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {formatCurrency(el.last)}
                    </p>
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {el?.bid_ask_spread_percentage.toFixed(2)}%
                    </p>
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {el.volume}%
                    </p>
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <Link className="text-blue-500 cursor-pointer" to={el?.trade_url}>{el?.trade_url?.toString().slice(0, 20)}</Link>
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <div className={`h-5 w-5 rounded-full ${el?.trust_score === 'green' ? 'bg-green-600' : 'bg-red-600'}`} />
                </td>
            </tr>
        ));
    };

    return (
        <div className="inline-block w-full overflow-hidden rounded-lg shadow">
            <table className="w-full leading-normal drop-shadow-md">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >Market</th>
                        <th
                            scope="col"
                            className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                            Pair
                        </th>
                        <th
                            scope="col"
                            className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                            Price
                        </th>
                        <th
                            scope="col"
                            className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                            Spread
                        </th>
                        <th
                            scope="col"
                            className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                            Volume
                        </th>
                        <th
                            scope="col"
                            className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                            Link
                        </th>
                        <th
                            scope="col"
                            className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                            Trust Score
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderTickers()}
                </tbody>
            </table>
            <div className="flex items-center justify-center gap-2 px-5 py-5 bg-white">
                <button
                    className={`rounded-2xl border-2 border-dashed border-black bg-white p-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none ${pageNumber === 1 ? 'hidden' : ''}`}
                    onClick={handlePrevPage}
                >
                    Prev
                </button>
                <button
                    className={`rounded-2xl border-2 border-dashed border-black bg-white p-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none ${(pageNumber * dataPerPage) >= listSlug?.tickers.length ? 'hidden' : ''}`}
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};