import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import Flights from "./pages/Flights";
import Bookings from "./pages/Bookings";

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/register" element={<Register/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/verify" element={<VerifyEmail/>}/>
<Route path="/flights" element={<Flights/>}/>
<Route path="/bookings" element={<Bookings/>}/>

</Routes>

</BrowserRouter>

)

}

export default App;