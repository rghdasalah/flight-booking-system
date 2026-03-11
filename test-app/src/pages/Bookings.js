import { useEffect, useState } from "react";
import API from "../services/api";

function Bookings(){

const [bookings,setBookings]=useState([]);

const loadBookings = async ()=>{

const res = await API.get("/bookings");

setBookings(res.data);

};

useEffect(()=>{

loadBookings();

},[]);

return(

<div>

<h2>My Bookings</h2>

{bookings.map((b)=>(

<div key={b._id}
style={{border:"1px solid gray",margin:"10px",padding:"10px"}}>

<p>Flight: {b.flight.flightNumber}</p>
<p>From: {b.flight.from}</p>
<p>To: {b.flight.to}</p>
<p>Total Price: {b.totalPrice}</p>

</div>

))}

</div>

)

}

export default Bookings;