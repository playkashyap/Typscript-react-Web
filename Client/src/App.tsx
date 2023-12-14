
import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App
