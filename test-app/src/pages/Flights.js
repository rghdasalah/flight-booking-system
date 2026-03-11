import { useEffect, useState } from "react";
import API from "../services/api";

function Flights(){

const [flights,setFlights]=useState([]);

const loadFlights = async ()=>{

const res = await API.get("/flights");

setFlights(res.data);

};

useEffect(()=>{

loadFlights();

},[]);

const bookFlight = async (flightId)=>{

await API.post("/bookings",{
flightId,
numberOfSeats:1
});

alert("Flight booked successfully");

};

return(

<div>

<h2>Flights</h2>

{flights.map((flight)=>(

<div key={flight._id}
style={{border:"1px solid gray",margin:"10px",padding:"10px"}}>

<p>Flight: {flight.flightNumber}</p>
<p>From: {flight.from}</p>
<p>To: {flight.to}</p>
<p>Price: {flight.price}</p>
<p>Seats Available: {flight.availableSeats}</p>

<button onClick={()=>bookFlight(flight._id)}>
Book Flight
</button>

</div>

))}

</div>

)

}

export default Flights;