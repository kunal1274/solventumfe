import React from "react";
import { Link } from "react-router-dom";



const HomePage = () => {
  const routes = [
    { path: "/Json", label: "JSON Analysis(Alpha WIP)" },
    { path: "/logob", label: "Log Outbound(Alpha WIP)" },
    { path: "/logib", label: "Log Inbound(Alpha WIP)" },
    { path: "/logobib", label: "Log Outbound vs Inbound(Beta TESTING)" },
    { path: "/logbulk", label: "Log Bulk Processing(Alpha WIP)" },
    { path: "/jsonbulk", label: "JSON Bulk Analysis(Alpha WIP)" },
    { path: "/tickets", label: "Tickets(Alpha WIP)" },
    { path: "/ticketsanalysis", label: "Tickets Analysis(Alpha WIP)" },
    { path: "/mulesoft", label: "Mulesoft Integration(Alpha WIP)" },
  ];

  return (
    <div className="h-screen bg-gray-50 flex justify-center items-center pt-10">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full mx-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Welcome to Solventum Task Management
        </h1>
        <p className="text-center text-gray-600 mb-8">
          <span className="font-semibold">Note:</span> This site is restricted to
          <span className="text-blue-600 font-semibold"> Solventum </span> related tasks only.
        </p>
        <ul className="space-y-4">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                className="block px-6 py-3 text-lg font-medium text-gray-800 bg-gray-100 rounded-md shadow hover:bg-blue-600 hover:text-white transition-all"
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};



const HomePageV2 = () => {
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
    <div className="min-h-screen max-w-3xl bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Welcome to Solventum Task Management
        </h1>
        <p className="text-center text-gray-600 mb-8">
          <span className="font-semibold">Note:</span> This site is restricted to 
          <span className="text-blue-600 font-semibold"> Solventum </span> related tasks only.
        </p>
        <ul className="space-y-4">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                className="block px-6 py-3 text-lg font-medium text-gray-800 bg-gray-100 rounded-md shadow hover:bg-blue-600 hover:text-white transition-all"
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
