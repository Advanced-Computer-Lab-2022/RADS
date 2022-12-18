// import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const TraineeCreditOptions =(props)=>{
    const{
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const traineeId = params.get('traineeId');
    const [trainee,setTrainee] = useState([]);
    const [traineeCards,setTraineeCards] = useState([]);
    const [checkedCard,setCheckedCard] = useState(null);
    const [html,setHtml] = useState('');
    const [button,setButton] = useState(false);
    const [noCreditCard,setNoCreditCard] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchTrainee = async () => {
            const response = await fetch(`/trainee/${traineeId}`);
            const json = await response.json();
            if(response.ok){
                setTrainee(json);
                setTraineeCards(json.creditCards);
            }
        }
        fetchTrainee();
    }, [])

    const registerCourse = async () =>{
        let courseGrade = 0;
        const info = {courseId,courseGrade};
        const response = await fetch(`/trainee/register/${traineeId}`,{
            method:'POST',
            body: JSON.stringify(info),
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        if(response.ok){
            setHtml('Purchase was done successfully !');
            setButton(true);
            // navigate(`/traineeform?traineeId=${traineeId}`);
        }  
    } 
    const handleSubmit = (e) =>{
        e.preventDefault() //prevent form submission
        if(checkedCard === null){
            setNoCreditCard("You need to enter select a payment method.");
        }
        else{
        registerCourse();
        }
    }   

    
return(
    <div>
        <form onSubmit={handleSubmit}>
        <div className='Cards'>
        {traineeCards && traineeCards.map((card,index)=>(
          <div>
          <fieldset id = {card._id}>
          <p><strong>Card {index+1} information:</strong></p>
          <p>Name on card: {card.cardName}</p>
          <p>Card Number: {card.cardNumber}</p>
          <p>Card Expiry Date: {card.cardExpiryDate}</p>
          <label><input id = {`first${index}`} type = 'radio' value = {card._id} name = {card.cardName} checked = {checkedCard === card._id} onChange={e=>{setCheckedCard(e.target.value)}}/>Select</label>
          </fieldset>
          </div>    
       ))}
       <button id= "pay">Purchase</button>
       <p><strong>{html}</strong></p>
        </div>
        </form>
        <p><strong>{noCreditCard}</strong></p>
        {button === true ?( <button onClick={() => window.location.href=`/traineeform?traineeId=${traineeId}`} >View your courses</button>) : (<p></p>)}
        <button id= "newcard" onClick={() => window.location.href=`/traineecredit?courseId=${courseId}&traineeId=${traineeId}`}>Add new credit/debit card</button>
    </div>
)
}


export default TraineeCreditOptions;