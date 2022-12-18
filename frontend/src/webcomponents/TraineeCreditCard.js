// import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const TraineeCreditCard =(props)=>{
    const{
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const traineeId = params.get('traineeId');
    const [course,setCourse] = useState([]);
    const [trainee,setTrainee] = useState([]);
    const [traineeCourses,setTraineeCourses] = useState([]);
    const [cardName,setCardName ] = useState("");
    const [cardCVV,setCardCVV ] = useState("");
    const [cardExpiryDate,setCardExpiryDate ] = useState("");
    const [cardNumber,setCardNumber ] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchTrainee = async () => {
            const response = await fetch(`/trainee/${traineeId}`);
            const json = await response.json();
            if(response.ok){
                setTrainee(json);
                setTraineeCourses(json.courses);
            }
        } 
       fetchTrainee();
    }, [])


    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        const newCreditCard = { cardName,cardNumber,cardExpiryDate,cardCVV};
        console.log(newCreditCard)
        const response = await fetch(`/trainee/addcredit/${traineeId}`,{
            method:'POST',
            body: JSON.stringify(newCreditCard),
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if(!response.ok){
            console.log("Erro occured", json);
        }
        if(response.ok){    
            console.log("New credit card added", json);
            navigate(`/traineeoptions?courseId=${courseId}&traineeId=${traineeId}`);
            //refresh page on successful submission
            //window.location.reload();
        }
    }   

    
return(
    <div>
        <p><strong>Add a credit or debit card </strong></p>
        <form onSubmit={handleSubmit}>
            <fieldset>
        Name on card:
        <input className="inputCard" type="text" name="user" id="user" placeholder='ex: Nick Jones' value={cardName} onChange={(e)=>{setCardName(e.target.value)}} required/>
        <br />
        Card Number:
        <input id="creditdigits" className="inputCard"  type="tel" pattern="[0-9]*{16}" maxLength="16" name="creditCard1" inputMode='numeric' placeholder="1111-2222-3333-4444" value={cardNumber} onChange={(e)=>{setCardNumber(e.target.value)}} required/>
        <br />
        Card Expiry:
        {/* <input name="inputCard"  id="expiry" type="text" placeholder="MM/YYYY" onChange={(e)=>{setExpiryDate(e.target.value)}}/> */}
        <input className="inputCard" name="expiry" id="expiry" type="month" value={cardExpiryDate} onChange={(e)=>{setCardExpiryDate(e.target.value)}} required/>
        <br />
        CVV:
        <input className="inputCard"  type="text" pattern="[0-9]*{3}" maxLength="3" name="cvv" inputMode='numeric' value = {cardCVV} onChange={(e)=>{setCardCVV(e.target.value)}} placeholder="XXX" required/>
        </fieldset>
        <button>Add</button>
        </form>
    </div>
)
}


export default TraineeCreditCard;