
  import "./App.css"
  import Homepage from "./components/homepage"
  import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
  import RentalListings from "./components/rental-listings"
import Login from "./components/login"
import Register from "./components/register"
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
import VerifyAccount from "./components/verifyAccount"
import ForgotPassword from "./components/forgotPassword"
import ForgotPasswordVerificationCode from "./components/ForgotPasswordVerificationCode"
import ChangePassword from "./components/ChangePassword"

  export default function App() {
    return (
      <div>
        <p>Saytda təmir işləri gedir!</p>
        {/* <BrowserRouter>
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
          <Route path={"/forgotPassword"} element={
            <PublicRoute>
              <ForgotPassword/>
            </PublicRoute>
          }/>
          <Route path={"/verifyAccount"} element={
            <PublicRoute>
              <VerifyAccount/>
            </PublicRoute>
          }/>
          <Route path={"/sendForgotPasswordVerification"} element={
            <PublicRoute>
              <ForgotPasswordVerificationCode/>
            </PublicRoute>
          }/>
          <Route path={"/changePassword"} element={
            <PublicRoute>
              <ChangePassword/>
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
        </BrowserRouter> */}
      </div>
    )
  }
