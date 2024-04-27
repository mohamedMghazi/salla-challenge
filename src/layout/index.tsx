import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PATHS } from "./routes";

const Layout: FC = () => {
    const routes = createBrowserRouter(PATHS);

    return (
        <RouterProvider router={routes} />
    );
}

export default Layout;
