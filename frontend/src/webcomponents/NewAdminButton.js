import { useState } from "react"

const NewAdminButton = () => {
    
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        

        const response = await fetch('/Admin/addAdmin',{
            method:'POST',
            body: null,
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
            setError(null);
            console.log("New Admin Posted", json);
            
            //refresh page on successful submission
            window.location.reload();
        }
    }    

    return (
        <form className="create-admin" onSubmit={handleSubmit}>
            
            <button>Create Admin</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default NewAdminButton;