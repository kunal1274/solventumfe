import App from "./App";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MulesoftLog from "./MulesoftLogResizing";
import AppMulesoft from "./AppMulesoft";
import AppTicket from "./AppTicket";

const router = createBrowserRouter([
    {
      path: "/",
      element: <div
      className="m-40 p-4 flex "
      >This is restricted to Solventum related tasks only</div>,
    },
    {
      path:"/Json",
      element:<App/>
  },
    {
        path :"/tickets",
        element : <AppTicket/>
    },
    {
        path :"/mulesoft",
        element : <AppMulesoft/>
    }
  ]);

export default router;