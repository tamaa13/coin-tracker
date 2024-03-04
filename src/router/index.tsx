import { createBrowserRouter } from "react-router-dom";
import Layouts from "../components/layouts";
import Home from "../pages/Home";
import Slug from "../pages/Slug";

const router = createBrowserRouter([
    {
        path: "",
        element: <Layouts />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/page/:pageNumber",
                element: <Home />,
            },
            {
                path: "/:slug",
                element: <Slug />,
            },
        ],
    },
]);


export default router;