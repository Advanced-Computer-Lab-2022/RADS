import { useState } from "react"


const InstructorUpdateEmail = () => {

    const [email,setEmail] = useState('');

    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const instructor = {email};

        const response = await fetch('/Instructor/changeInfo/635afde192426ef4e8a9e165',{
            method:'PATCH',
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


            setEmail('');
        
            setError(null);
            console.log("Info Changed", json);
            
            //refresh page on successful submission
            window.location.reload();
        }
    }    

    return (
        <form className="change-info" onSubmit={handleSubmit}>
            <h3>Change Your Email</h3>
           
            <label>Email:</label>
            <input type="text" onChange={(e) =>  setEmail(e.target.value)}
            value= {email}
            />

 
            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default InstructorUpdateEmail;