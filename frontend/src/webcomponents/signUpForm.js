import { useState } from "react";
const SignUpForm = () => {
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const trainee = {userName,firstName,lastName,email,gender,password};
        const response = await fetch("/Trainee/signup", {
            method: "POST",
            body: JSON.stringify(trainee),
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
            setFirstName('');
            setLastName('');
            setEmail('');
            setGender('');
            setPassword('');
            setError(null);
            console.log("New Trainee Added", json);
            //redirect to login page

        }

    }
    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h3>Trainee: Insert Your Information</h3>
            <label>Username:</label>
            <input type="text" onChange={(e) => setUserName(e.target.value)}
            value={userName}
            />
            <label>First name:</label>
            <input type="text" onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            />
            <label>Last name:</label>
            <input type="text" onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            />
            <label>Email:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
            <label>Gender:</label>
            <input type="text" onChange={(e) => setGender(e.target.value)}
            value={gender}
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
export default SignUpForm;