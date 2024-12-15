
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
    element:
    <ErrorBoundary>
      <App3plSoOutbound/>
    </ErrorBoundary>
    
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