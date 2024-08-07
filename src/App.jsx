import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Book from "./pages/Book";
import YourBookshelf from "./pages/YourBookshelf";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/books",
          element: <Books />,
        },
        {
          path: "/:activePath/:id",
          element: <Book />,
        },
        {
          path: "/your_bookshelf",
          element: <YourBookshelf />,
        },
        {
          path: "/settings/:tab?",
          element: <Settings />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
