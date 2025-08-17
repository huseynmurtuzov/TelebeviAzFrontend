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

  export default function App() {
    return (
      <div>
        <BrowserRouter>
        <NotificationProvider>
          <GlobalStatus/>
        <Routes>
          <Route path={"/"} element={<Homepage/>}/>
          <Route path={"/search"} element={<RentalListings/>}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/register"} element={<Register/>}/>
          <Route path={"/rent-details/:id"} element={<RentalDetail/>}/>
          <Route path={"/profile"} element={<Profile/>}/>
          <Route path={"/verifyEmail"} element={<VerificationCode/>}/>
        </Routes>
        </NotificationProvider>
        
        </BrowserRouter>
      </div>
    )
  }
