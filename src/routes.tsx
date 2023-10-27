import { createBrowserRouter } from "react-router-dom";
import AboutMe from "./Components/about/about";
import Contact from "./Components/contact/contsct";
import Landing from "./Components/landingPage/landing";

const Router = createBrowserRouter([
    { 
        path: "/", 
        element: <Landing/>
    },
    {
        path: "/about",
        element: <AboutMe/>
    },
    {
        path: "/contact",
        element: <Contact/>
    }
]);

export default Router;