
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
import React from 'react';
import App3plSoObVsIbBulk from "./App3plSoObVsIbBulk";

import AppTicketAnalysis from "./AppTicketAnalysis";
import AppJsonAnalysisBulk from "./App3plJsonAnalysis/AppJsonAnalysisBulk";
import NotFound404 from "./NotFound404";
import HomePage from "./HomePage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to display fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an external service
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '1px solid red', color: 'red' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

const router = createBrowserRouter([
    {
      path: "/",
      element: <ErrorBoundary>
        <HomePage/>
        </ErrorBoundary>,
    },
    {
      path:"/Json",
      element:<ErrorBoundary><AppJsonAnalysis/></ErrorBoundary>
  },
  {
    path:"/logob",
    element:
    <ErrorBoundary>
      <App3plSoOutbound/>
    </ErrorBoundary>
    
  },
  {
    path:"/logib",
    element:<ErrorBoundary><App3plSoInbound/></ErrorBoundary>
  },
  {
    path:"/logobib",
    element:
    <ErrorBoundary><App3plSoObVsIb/></ErrorBoundary>
  },
  {
    path:"/logbulk",
    element:<ErrorBoundary>
      <App3plSoObVsIbBulk/>
    </ErrorBoundary>
  },
  {
    path:"/jsonbulk",
    element:<ErrorBoundary>
      <AppJsonAnalysisBulk/>
    </ErrorBoundary>
  },
    {
        path :"/tickets",
        element : <ErrorBoundary><AppTicket/></ErrorBoundary>
    },
    {
      path :"/ticketsanalysis",
      element : <ErrorBoundary><AppTicketAnalysis/></ErrorBoundary>
  },

    {
        path :"/mulesoft",
        element : <ErrorBoundary><AppMulesoft/></ErrorBoundary>
    },
    {
      path:"*",
      element:<ErrorBoundary>
        <NotFound404/>
      </ErrorBoundary>
    }
  ]);

export default router;