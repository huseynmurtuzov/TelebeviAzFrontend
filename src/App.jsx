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

  export default function App() {
    return (
      <div>
        <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Homepage/>}/>
          <Route path={"/search"} element={<RentalListings/>}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/register"} element={<Register/>}/>
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
