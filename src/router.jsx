import App from "./App";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MulesoftLog from "./MulesoftLogResizing";
import AppMulesoft from "./AppMulesoft";

const router = createBrowserRouter([
    {
      path: "/",
      element: <div
      className="m-40 p-4 flex "
      >This is restricted to Solventum related tasks only</div>,
    },
    {
        path :"/tickets",
        element : <App/>
    },
    {
        path :"/mulesoft",
        element : <AppMulesoft/>
    }
  ]);

export default router;