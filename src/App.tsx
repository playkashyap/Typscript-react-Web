
import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import 'react-toastify/dist/ReactToastify.css';
// import React from "react";
// import PublicRoute from "./publicRoutes";

function App() {

  // const [loggedIn, setLoggedIn] = React.useState(false);

  // React.useEffect(() => {
  //   if (localStorage.getItem('token') === null) {
  //     setLoggedIn(false);
  //   } else if (localStorage.getItem('token') !== null) {
  //     setLoggedIn(true);
  //   }
  // }, []);

  return (
    <>
      {/* {loggedIn ?  */}
      <RouterProvider router={Router} />
      {/* : <RouterProvider router={PublicRoute} />} */}
    </>
  );
}

export default App
