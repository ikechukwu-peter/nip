import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UILoader } from "./components/loaders";
import { DashboardLayout } from "./layout";
import { Login, Verify } from "./pages/auth";
import { Account, MyLinks, Shorten, Link } from "./pages/dashboard";
import { PageError } from "./pages/error";
import { Home } from "./pages/landing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <PageError />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <PageError />,
    },
    {
      path: "/verify/:url",
      element: <Verify />,
      errorElement: <PageError />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      errorElement: <PageError />,
      children: [
        {
          path: "/dashboard",
          element: <Account />,
        },
        {
          path: "/dashboard/shorten",
          element: <Shorten />,
        },
        { path: "/dashboard/mylinks", element: <MyLinks /> },
        { path: "/dashboard/:id", element: <Link /> },
      ],
    },
  ]);
  return (
    <div className="h-[100vh] w-[100vw]">
      <Suspense fallback={<UILoader />}>
        <RouterProvider router={router} fallbackElement={<UILoader />} />
      </Suspense>
    </div>
  );
}

export default App;
