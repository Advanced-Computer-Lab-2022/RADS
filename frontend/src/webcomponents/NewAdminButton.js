import { useState } from "react"

const NewAdminButton = () => {
    
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const admin = {firstName,lastName};
        const response = await fetch('/Admin/addAdmin',{
            method:'POST',
            body: JSON.stringify(admin),
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
            setError(null);
            console.log("New Admin Posted", json);
            
            //refresh page on successful submission
            window.location.reload();
        }
    }    

    return (
        <form className="create-admin" onSubmit={handleSubmit}>
            <label>First name:</label>
            <input type="text" onChange={(e) => setFirstName(e.target.value)}
            value= {firstName}
            />

            <label>Last name:</label>
            <input type="text" onChange={(e) => setLastName(e.target.value)}
            value= {lastName}
            />
            <button>Create Admin</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default NewAdminButton;