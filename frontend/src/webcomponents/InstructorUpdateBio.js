import { useState } from "react"


const InstructorUpdateBio = () => {


    const [bio, setBio] = useState('');
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const instructor = {bio};

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


            setBio('');
        
            setError(null);
            console.log("Info Changed", json);
            
            //refresh page on successful submission
            window.location.reload();
        }
    }    

    return (
        <form className="change-info" onSubmit={handleSubmit}>
            <h3>Change Your Bio</h3>
           

            <label>Bio:</label>
            <input type="text" onChange={(e) => setBio(e.target.value)}
            value= {bio}
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default InstructorUpdateBio;