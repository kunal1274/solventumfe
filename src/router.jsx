
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MulesoftLog from "./MulesoftLogResizing";
import AppMulesoft from "./AppMulesoft";
import AppTicket from "./AppTicket";
import AppMulesoftAnalysis from "./App3plSoOutbound";
import App3plSoOutbound from "./App3plSoOutbound";
import App3plSoInbound from "./App3plSoInbound";
import AppComparison from "./App3plSoObVsIb";
import App3plSoObVsIb from "./App3plSoObVsIb";
import AppJsonAnalysis from "./AppJsonAnalysis";

const router = createBrowserRouter([
    {
      path: "/",
      element: <div
      className="m-40 p-4 flex "
      >This is restricted to Solventum related tasks only</div>,
    },
    {
      path:"/Json",
      element:<AppJsonAnalysis/>
  },
  {
    path:"/log3plsoob",
    element:<App3plSoOutbound/>
  },
  {
    path:"/log3plsoib",
    element:<App3plSoInbound/>
  },
  {
    path:"/log3plsoobvsib",
    element:<App3plSoObVsIb/>
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