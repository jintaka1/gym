import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserCRUD from "./pages/UserCRUD";
import Rooms from "./pages/Rooms";
import Activities from "./pages/activities";
import Blogposts from "./pages/Blogposts";
import ClassCRUD from "./pages/Classes";
import BookingCRUD from "./pages/Bookings";
import ClassBooking from "./pages/BookingsCV";
import MemberActivities from "./pages/ActivitiesCV";
import MemberBlogposts from "./pages/BlogpostsCV";
import SignUp from "./pages/SignUp";
import { AccessControlRoute } from "./components/AccessControl";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/users",
    element: (
      <AccessControlRoute allowedRoles={["admin"]}>
        {" "}
        <UserCRUD />
      </AccessControlRoute>
    ),
  },
  {
    path: "/rooms",
    element: (
      <AccessControlRoute allowedRoles={["admin"]}>
        {" "}
        <Rooms />
      </AccessControlRoute>
    ),
  },
  {
    path: "/activities",
    element: (
      <AccessControlRoute
        allowedRoles={["admin", "trainer"]}
      >
        {" "}
        <Activities />
      </AccessControlRoute>
    ),
  },
  ,
  {
    path: "/blogposts",
    element: <Blogposts />,
  },
  {
    path: "/classes",
    element: (
      <AccessControlRoute
        allowedRoles={["admin", "trainer"]}
      >
        {" "}
        <ClassCRUD />
      </AccessControlRoute>
    ),
  },
  {
    path: "/bookings",
    element: (
      <AccessControlRoute
        allowedRoles={["admin", "trainer"]}
      >
        {" "}
        <BookingCRUD />
      </AccessControlRoute>
    ),
  },
  {
    path: "/classbooking",
    element: <ClassBooking />,
  },
  {
    path: "/memberactivities",
    element: <MemberActivities />,
  },
  {
    path: "/memberblogposts",
    element: <MemberBlogposts />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/accesscontrol",
    element: <AccessControlRoute />,
  },
]);

export default router;
