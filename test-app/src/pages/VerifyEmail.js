import { useState } from "react";
import API from "../services/api";

function VerifyEmail(){

const [email,setEmail]=useState("");
const [code,setCode]=useState("");

const handleVerify = async (e)=>{

e.preventDefault();

await API.post("/auth/verify-email",{
email,
code
});

alert("Email verified successfully");

};

return(

<form onSubmit={handleVerify}>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
placeholder="Verification Code"
onChange={(e)=>setCode(e.target.value)}
/>

<button>Verify Email</button>

</form>

)

}

export default VerifyEmail;