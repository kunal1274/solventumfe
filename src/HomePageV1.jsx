import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
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
    <div className="m-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome to Solventum Task Management
      </h1>
      <h2>
      This site is restricted to Solventum related tasks only
      </h2>
      <ul className="space-y-4">
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className="block px-4 py-2 text-lg font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 hover:text-blue-800"
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
