//code is just a skeleton
import { useState } from "react";
const AdminLoginForm = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const admin = {userName,password};
        const response = await fetch("/Admin/login", {
            method: "POST",
            body: JSON.stringify(admin),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },

        })
        const json= await response.json();
        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setUserName('');
            setPassword('');
            setError(null);
            console.log("Admin Logged in", json);
            //redirect to admin page

        }

    }
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h3>Admin: Insert Your Information</h3>
            <label>Username:</label>
            <input type="text" onChange={(e) => setUserName(e.target.value)}
            value={userName}
            />
            <label>Password:</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            <button>Submit</button>
            {error && <div className error>{error}</div>}
        </form>
    )
}
export default AdminLoginForm;