import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { HeroSection } from "../components/molecules/HeroSection";
import Table from "../components/atoms/Table";
import useStore from "../../store";
import { Loaders } from "../components/atoms/Loaders";

const Home = () => {
    const { pageNumber = 1 } = useParams();
    const { fetchData, loading } = useStore();

    useEffect(() => {
        fetchData(pageNumber || 1);
    }, [pageNumber]);

    return (
        <>
            <HeroSection />
            {loading ? <Loaders /> : <Table />}
        </>
    );
};

export default Home;
