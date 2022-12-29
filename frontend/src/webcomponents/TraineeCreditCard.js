// import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/material';
const TraineeCreditCard = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const traineeId = params.get('traineeId');
    const [course, setCourse] = useState([]);
    const [trainee, setTrainee] = useState([]);
    const [traineeCourses, setTraineeCourses] = useState([]);
    const [cardName, setCardName] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [cardExpiryDate, setCardExpiryDate] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrainee = async () => {
            axios
                .get(`/trainee/${traineeId}`)
                .then((res) => {
                    setTrainee(res.data);
                    setTraineeCourses(res.data.courses);
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        fetchTrainee();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault() //prevent form submission
        const newCreditCard = { cardName, cardNumber, cardExpiryDate, cardCVV };
        axios
            .post(`/trainee/addcredit/${traineeId}`, newCreditCard)
            .then((res) => {
                console.log("New credit card added", res.data);
                navigate(`/traineeoptions?courseId=${courseId}&traineeId=${traineeId}`);
            })
            .catch((error) => {
                console.error(error)
            })
    }


    return (
        <Box>
            <p><strong>Add a credit or debit card </strong></p>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    Name on card:
                    <input className="inputCard" type="text" name="user" id="user" placeholder='ex: Nada Ashraf' value={cardName} onChange={(e) => { setCardName(e.target.value) }} required />
                    <br />
                    Card Number:
                    <input id="creditdigits" className="inputCard" type="tel" pattern="[0-9]*{16}" maxLength="16" name="creditCard1" inputMode='numeric' placeholder="1111-2222-3333-4444" value={cardNumber} onChange={(e) => { setCardNumber(e.target.value) }} required />
                    <br />
                    Card Expiry:
                    {/* <input name="inputCard"  id="expiry" type="text" placeholder="MM/YYYY" onChange={(e)=>{setExpiryDate(e.target.value)}}/> */}
                    <input className="inputCard" name="expiry" id="expiry" type="month" value={cardExpiryDate} onChange={(e) => { setCardExpiryDate(e.target.value) }} required />
                    <br />
                    CVV:
                    <input className="inputCard" type="text" pattern="[0-9]*{3}" maxLength="3" name="cvv" inputMode='numeric' value={cardCVV} onChange={(e) => { setCardCVV(e.target.value) }} placeholder="XXX" required />
                </fieldset>
                <button>Add</button>
            </form>
        </Box>
    )
}


export default TraineeCreditCard;