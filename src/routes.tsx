import { createBrowserRouter } from "react-router-dom";
import AboutMe from "./Components/about/about";
import Contact from "./Components/contact/contsct";
import Landing from "./Components/landingPage/landing";
import Layout from "./Components/layout";
import Error from "./Components/notfound/error";
import Login from "./Components/login/login";

const Router = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Landing /> },
            { path: "about", element: <AboutMe /> },
            { path: "contact", element: <Contact /> }
        ]
    },
    {
        path: "/Login",
        element: <Login />,
        errorElement: <Error />,
    },
    {
        path: "*",
        element: <Error />
    }
]);

export default Router;