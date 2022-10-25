import { useState } from "react"

const InstructorForm = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [password,setPassword] = useState('');
    const [country,setCountry] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [address,setAddress] = useState('');
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const instructor = {firstName,lastName,password,country,phoneNumber,address};
        
        const response = await fetch('/Instructor/add',{
            method:'POST',
            body: JSON.stringify(instructor),
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        
        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){    
            setFirstName('');
            setLastName('');  
            setPassword('');
            setCountry('');
            setPhoneNumber('');
            setAddress('');
            setError(null);
            console.log("New Instructor Added", json);
        }
    }    

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Insert Your Information</h3>
           
            <label>First name:</label>
            <input type="text" onChange={(e) => setFirstName(e.target.value)}
            value= {firstName}
            />

            <label>Last name:</label>
            <input type="text" onChange={(e) => setLastName(e.target.value)}
            value= {lastName}
            />

            <label>Password:</label>
            <input type="number" onChange={(e) => setPassword(e.target.value)}
            value= {password}
            />

            <label>Country:</label>
            <input type="text" onChange={(e) => setCountry(e.target.value)}
            value= {country}
            />

            <label>Phone Number:</label>
            <input type="number" onChange={(e) => setPhoneNumber(e.target.value)}
            value= {phoneNumber}
            />

            <label>Address:</label>
            <input type="text" onChange={(e) => setAddress(e.target.value)}
            value= {address}
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default InstructorForm;