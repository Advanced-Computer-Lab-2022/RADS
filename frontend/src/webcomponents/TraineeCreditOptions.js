// import axios from 'axios';
import { useState, useEffect } from 'react';
import { json, useNavigate } from 'react-router-dom';
const TraineeCreditOptions = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const traineeId = params.get('traineeId');
    const [course, setCourse] = useState([]);
    const [trainee, setTrainee] = useState([]);
    const [traineeCards, setTraineeCards] = useState([]);
    const [checkedCard, setCheckedCard] = useState(null)
    const [html, setHtml] = useState('');
    const [html2, setHtml2] = useState('');
    const [button, setButton] = useState(false);
    const [noCreditCard, setNoCreditCard] = useState('');
    const [purchased, setPurchased] = useState(false);
    const navigate = useNavigate();
    const todayDate = new Date();
    useEffect(() => {
        const fetchTrainee = async () => {
            const response = await fetch(`/trainee/${traineeId}`);
            const json = await response.json();
            if (response.ok) {
                setTrainee(json);
                setTraineeCards(json.creditCards);
                fetchCourse();
            }
        }
        fetchTrainee();
    }, [])

    const fetchCourse = async () => {
        const response = await fetch(`/course/${courseId}`);
        const json = await response.json();
        if (response.ok) {
            setCourse(json);
        }
    }

    const updateBalance = async (priceVal) => {
        let balanceValue = priceVal;
        const info = { balanceValue };
        const response = await fetch(`/trainee/updatebalance/${traineeId}`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            console.log("updated balance");
        }
    }

    const registerCourse = async () => {
        let courseGrade = 0;
        let courseProgress = 0;
        const info = { courseId, courseGrade, courseProgress };
        const response = await fetch(`/trainee/register/${traineeId}`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            setHtml('Purchase was done successfully !');
            setButton(true);
            // navigate(`/traineeform?traineeId=${traineeId}`);
        }

        else if (!response.ok && json.message === 'already in db') {
            setHtml('You already bought the course');
        }
    }


    const checkExpiryDate = async (id) => {
        let creditCardId = id;
        const body = { creditCardId };
        const response = await fetch(`/trainee/findcreditcard/${traineeId}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            const newDate = new Date(json);
            if (newDate >= todayDate) {
                registerCourse();
                setPurchased(true);
            }
            else {
                setHtml("Cannot perform purschase, The Card is Expired")
            }
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault() //prevent form submission
        if (checkedCard === null) {
            setNoCreditCard("You need to enter select a payment method.");
        }
        else if (checkedCard === "balance" && !purchased) {
            if (trainee.balance >= course.price) {
                registerCourse();
                let price = (course.price * -1);
                updateBalance(price);
                setPurchased(true);
            }
            else {
                setHtml2(`You dont have enought money in the balance!`);
            }
        }
        else if (checkedCard !== "balance" && checkedCard !== null && !purchased) {
           checkExpiryDate(checkedCard);            
        }
        else {
            setHtml('You already bought the course');
        }
    }

    const getDateAttributes = (date) => {
        let newDate = new Date(date);
        let year = newDate.getFullYear();
        let month = newDate.toLocaleString('en-us', { month: 'long' });;
        let result = `${year}, ${month}`;
        return result
    }

    const removeCard = async (value) =>{
        let creditCardId = value;
        let body = {creditCardId};
        const response = await fetch(`/trainee/deletecard/${traineeId}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            window.location.reload();
        }
    }


    return (
        <div>
            <h1><strong>Select a payment method:</strong></h1>
            <div>
                <p><strong>Course Information:</strong></p>
                <p>Course name: {course.courseTitle} </p>
                <p>Price: {Math.ceil(course.price * rateVal)} {currencyVal} </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='Cards'>
                    {traineeCards && traineeCards.map((card, index) => (
                        <div>
                            <fieldset id={card._id}>
                                <p><strong>Card {index + 1} information:</strong></p>
                                <p>Name on card: {card.cardName}</p>
                                <p>Card Number: {card.cardNumber}</p>
                                <p>Card Expiry Date: {getDateAttributes(card.cardExpiryDate)}</p>
                                {card.cardExpiryDate && new Date(card.cardExpiryDate) >= todayDate ? (<p></p>) : (<p>Card Expired</p>)}
                                <label><input id={`first${index}`} type='radio' value={card._id} name={card.cardName} checked={checkedCard === card._id} onChange={e => { setCheckedCard(e.target.value) }} />Select</label>
                                <br/>
                                <button value={card._id} onClick={(e)=>removeCard(e.target.value)}>Remove</button>
                            </fieldset>
                        </div>
                    ))}
                    <fieldset>
                        <p>Current Balance: {Math.ceil(trainee.balance * rateVal)} {currencyVal}</p>
                        <label><input id='balance-pay' type='radio' value="balance" name="balance" checked={checkedCard === "balance"} onChange={e => { setCheckedCard(e.target.value) }} />Select</label>
                    </fieldset>
                    <button id="pay">Purchase</button>
                    <p><strong>{html}</strong></p>
                    <p><strong>{html2}</strong></p>
                </div>
            </form>
            <p><strong>{noCreditCard}</strong></p>
            {button === true ? (<button onClick={() => window.location.href = `/traineeform?traineeId=${traineeId}`} >View your courses</button>) : (<p></p>)}
            <button id="newcard" onClick={() => window.location.href = `/traineecredit?courseId=${courseId}&traineeId=${traineeId}`}>Add new credit/debit card</button>
        </div>
    )
}


export default TraineeCreditOptions;