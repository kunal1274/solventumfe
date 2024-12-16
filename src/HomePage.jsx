import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePageV1 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const routes = [
    { path: "/Json", label: "JSON Analysis" },
    { path: "/logob", label: "Log Outbound" },
    { path: "/logib", label: "Log Inbound" },
    { path: "/logobib", label: "Log Outbound vs Inbound" },
    { path: "/logbulk", label: "Log Bulk Processing" },
    { path: "/jsonbulk", label: "JSON Bulk Analysis" },
    { path: "/tickets", label: "Tickets" },
    { path: "/ticketsanalysis", label: "Tickets Analysis" },
    { path: "/mulesoft", label: "Mulesoft Integration" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-white h-full shadow-lg transition-all duration-300 overflow-hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-gray-700">Solventum</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                className="block px-4 py-2 text-gray-600 hover:bg-blue-500 hover:text-white rounded-md"
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            ☰
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to Solventum Dashboard
          </h1>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">
            Select an option from the sidebar
          </h2>
          <p className="text-gray-600">
            This area will load dynamic content when you navigate using the
            sidebar.
          </p>
        </div>
      </div>
    </div>
  );
};



const HomePageV2 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const routes = [
    { path: "/Json", label: "JSON Analysis", tag: "α" },
    { path: "/logob", label: "Log Outbound", tag: "α" },
    { path: "/logib", label: "Log Inbound", tag: "α" },
    { path: "/logobib", label: "Log Outbound vs Inbound", tag: "β" },
    { path: "/logbulk", label: "Log Bulk Processing", tag: "α" },
    { path: "/jsonbulk", label: "JSON Bulk Analysis", tag: "α" },
    { path: "/tickets", label: "Tickets", tag: "α" },
    { path: "/ticketsanalysis", label: "Tickets Analysis", tag: "α" },
    { path: "/mulesoft", label: "Mulesoft Integration",tag: "α"},
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-white h-full shadow-lg transition-all duration-300 overflow-hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-gray-700">Solventum</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                className="block px-4 py-2 text-gray-600 hover:bg-blue-500 hover:text-white rounded-md flex justify-between"
              >
                <span>{route.label}</span>
                {/* Superscript for Alpha/Beta */}
                {route.tag && (
                  <sup className="text-xs text-gray-500 font-semibold">
                    {route.tag}
                  </sup>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            ☰
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to Solventum Dashboard
          </h1>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">
            Select an option from the sidebar
          </h2>
          <p className="text-gray-600">
            This area will load dynamic content when you navigate using the
            sidebar.
          </p>
        </div>
      </div>
    </div>
  );
};



const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const routes = [
    { path: "/Json", label: "JSON Analysis", tag: "α", color: "text-red-500" },
    { path: "/logob", label: "Log Outbound", tag: "β", color: "text-blue-500" },
    { path: "/logib", label: "Log Inbound", tag: "β", color: "text-blue-500" },
    { path: "/logobib", label: "Log Outbound vs Inbound", tag: "Go", color: "text-green-500" },
    { path: "/logbulk", label: "Log Bulk Processing", tag: "α", color: "text-red-500" },
    { path: "/jsonbulk", label: "JSON Bulk Analysis", tag: "α", color: "text-red-500" },
    { path: "/tickets", label: "Tickets", tag: "α", color: "text-red-500"  },
    { path: "/ticketsanalysis", label: "Tickets Analysis", tag: "α", color: "text-red-500" },
    { path: "/mulesoft", label: "Mulesoft Integration", tag: "α", color: "text-red-500"  },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-white h-full shadow-lg transition-all duration-300 overflow-hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-gray-700">Solventum</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>
        {/* <ul className="mt-4 space-y-2">
          {routes.map((route) => (
            <li key={route.path} className="relative">
              <Link
                to={route.path}
                className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded-md flex items-center"
              >
                <span>{route.label}</span>
                
                {route.tag && (
                  <span
                    className={`absolute top-0 right-2 text-xs font-bold ${route.color}`}
                  >
                    {route.tag}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul> */}
        <ul className="mt-4 space-y-2">
  {routes.map((route) => (
    <li key={route.path}>
      <Link
        to={route.path}
        className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded-md flex items-center"
      >
        <span className="relative">
          {route.label}
          {/* Superscript for Alpha/Beta/Go */}
          {route.tag && (
            <span
              className={`ml-1 align-top text-xs font-bold ${route.color}`}
              style={{ transform: "translateY(-0.25rem)" }} // Adjust superscript position
            >
              {route.tag}
            </span>
          )}
        </span>
      </Link>
    </li>
  ))}
</ul>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            ☰
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to Solventum Dashboard
          </h1>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">
            Select an option from the sidebar
          </h2>
          <p className="text-gray-600">
            This area will load dynamic content when you navigate using the
            sidebar.
          </p>
        </div>
      </div>
    </div>
  );
};







export default HomePage;
