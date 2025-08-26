  import Navigation from "../src/components/navigation"
  import Hero from "../src/components/hero"
  import WhyTelebevi from "../src/components/why-telebevi"
  import BestChoice from "../src/components/best-choice"
  import HowItWorks from "../src/components/how-it-works"
  import SimpleEffective from "../src/components/simple-effective"
  import Footer from "../src/components/footer"
  import "./App.css"
  import Homepage from "./components/homepage"
  import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
  import RentalListings from "./components/rental-listings"
import Login from "./components/login"
import Register from "./components/register"
import RentalDetail from "./components/rental-detail"
import Profile from "./components/profile"
import VerificationCode from "./components/VerificationCode"
import { NotificationProvider } from "./components/context/NotificationContext"
import GlobalStatus from "./components/context/GlobalStatus"
import { PublicRoute } from "./components/PublicRoute"
import { PrivateRoute } from "./components/PrivateRoute"
import ListingDetail from "./components/ListingDetail"
import CreateListing from "./components/CreateListing"
import AcceptAllCookies from "./components/AcceptAllCookies"
import TermsOfUse from "./components/TermsOfUse"
import UserProfileEdit from "./components/UserProfileEdit"
import UpdateListingComponent from "./components/UpdateListingComponent"
console.log("ENV::", process.env);

  export default function App() {
    return (
      <div>
        <BrowserRouter>
        <NotificationProvider>
          <GlobalStatus/>
        <Routes>
          <Route path={"/"} element={<Homepage/>}/>
          <Route path={"/listings"} element={<RentalListings/>}/>
          <Route path={"/login"} element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }/>
          <Route path={"/register"} element={
            <PublicRoute>
              <Register/>
            </PublicRoute>
          }/>
          <Route path={"/rent-details/:id"} element={<ListingDetail/>}/>
          <Route path={"/profile"} element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }/>
          <Route path={"/createListing"} element={
            <PrivateRoute>
              <CreateListing/>
            </PrivateRoute>
          }/>
          <Route path={"/editProfile"} element={
            <PrivateRoute>
              <UserProfileEdit/>
            </PrivateRoute>
          }/>
          <Route path={"/updateListing/:id"} element={
            <PrivateRoute>
              <UpdateListingComponent/>
            </PrivateRoute>
          }/>
          <Route path={"/verifyEmail"} element={<VerificationCode/>}/>
          <Route path={"/termsOfUse"} element={<TermsOfUse/>}/>
        </Routes>
        </NotificationProvider>
        <AcceptAllCookies />
        </BrowserRouter>
      </div>
    )
  }
