// import axios from 'axios';
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
const TraineeCreditOptions = (props) => {
  const { rateVal, currencyVal, token } = props;
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("courseId");
  const traineeId = params.get("traineeId");
  const [course, setCourse] = useState([]);
  const [trainee, setTrainee] = useState([]);
  const [traineeCards, setTraineeCards] = useState([]);
  const [checkedCard, setCheckedCard] = useState(null);
  const [html, setHtml] = useState("");
  const [html2, setHtml2] = useState("");
  const [button, setButton] = useState(false);
  const [noCreditCard, setNoCreditCard] = useState("");
  const [purchased, setPurchased] = useState(false);
  const navigate = useNavigate();
  const todayDate = new Date();

  useEffect(() => {
    const fetchTrainee = () => {
      axios
        .get(`/trainee/${traineeId}`)
        .then((res) => {
          setTrainee(res.data);
          setTraineeCards(res.data.creditCards);
          fetchCourse();
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchTrainee();
  }, []);

  const fetchCourse = () => {
    axios
      .get(`/course/${courseId}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateInstructorBalance = async (priceVal) => {
    let balanceValue = priceVal - priceVal * 0.1;
    let info = { balanceValue };
    console.log("here");
    axios
      .post(`/instructor/updatebalance/${course.instructor}`, info)
      .then((res) => {
        console.log("updated balance", res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateBalance = async (priceVal) => {
    let balanceValue = priceVal;
    axios
      .post(`/trainee/updatebalance/${traineeId}`, { balanceValue })
      .then((res) => {
        console.log("updated balance", res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const registerCourse = async () => {
    let courseGrade = 0;
    let courseProgress = 0;
    const info = { courseId, courseGrade, courseProgress };
    axios
      .post(`/trainee/register/${traineeId}`, info)
      .then((res) => {
        setHtml("Purchase was done successfully !");
        setButton(true);
      })
      .catch((error) => {
        setHtml("You already bought the course");
        console.error(error);
      });
  };

  const checkExpiryDate = async (id) => {
    let creditCardId = id;
    const body = { creditCardId };
    axios
      .post(`/trainee/findcreditcard/${traineeId}`, body)
      .then((res) => {
          const newDate = new Date(res.data);
          if (newDate >= todayDate) {
            registerCourse();
            updateInstructorBalance(course.price)
            setPurchased(true);
          } else {
            setHtml("Cannot perform purschase, The Card is Expired");
          }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    console.log(checkedCard);
    e.preventDefault(); //prevent form submission
    if (checkedCard === null) {
      setNoCreditCard("You need to enter select a payment method.");
    } else if (checkedCard === "balance" && !purchased) {
      if (trainee.balance >= course.price) {
        registerCourse();
        let finalPrice = course.price * -1;
        updateBalance(finalPrice);
        updateInstructorBalance(-1 * finalPrice);
        setPurchased(true);
      } else {
        setHtml2(`You dont have enought money in the balance!`);
      }
    } else if (
      checkedCard !== "balance" &&
      checkedCard !== null &&
      !purchased
    ) {
      checkExpiryDate(checkedCard);
    } else {
      setHtml("You already bought the course");
    }
  };

  const getDateAttributes = (date) => {
    let newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.toLocaleString("en-us", { month: "long" });
    let result = `${year}, ${month}`;
    return result;
  };

  const removeCard = async (value) => {
    let creditCardId = value;
    let body = { creditCardId };
    axios
      .post(`/trainee/deletecard/${traineeId}`, body)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box>
      <h1>
        <strong>Select a payment method:</strong>
      </h1>
      <Box>
        <p>
          <strong>Course Information:</strong>
        </p>
        <p>Course name: {course.courseTitle} </p>
        <p>
          Price: {Math.ceil(course.price * rateVal)} {currencyVal}{" "}
        </p>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box className="Cards">
          {traineeCards &&
            traineeCards.map((card, index) => (
              <Box>
                <fieldset id={card._id}>
                  <p>
                    <strong>Card {index + 1} information:</strong>
                  </p>
                  <p>Name on card: {card.cardName}</p>
                  <p>Card Number: {card.cardNumber}</p>
                  <p>
                    Card Expiry Date: {getDateAttributes(card.cardExpiryDate)}
                  </p>
                  {card.cardExpiryDate &&
                  new Date(card.cardExpiryDate) >= todayDate ? (
                    <p></p>
                  ) : (
                    <p>Card Expired</p>
                  )}
                  <label>
                    <input
                      id={`first${index}`}
                      type="radio"
                      value={card._id}
                      name={card.cardName}
                      checked={checkedCard === card._id}
                      onChange={(e) => {
                        setCheckedCard(e.target.value);
                      }}
                    />
                    Select
                  </label>
                  <br />
                  <Button
                    variant="contained"
                    value={card._id}
                    onClick={(e) => removeCard(e.target.value)}
                  >
                    Remove
                  </Button>
                </fieldset>
              </Box>
            ))}
          <fieldset>
            <p>
              Current Balance: {Math.ceil(trainee.balance * rateVal)}{" "}
              {currencyVal}
            </p>
            <label>
              <input
                id="balance-pay"
                type="radio"
                value="balance"
                name="balance"
                checked={checkedCard === "balance"}
                onChange={(e) => {
                  setCheckedCard(e.target.value);
                }}
              />
              Select
            </label>
          </fieldset>
          <Button variant="contained" id="pay" type="submit">
            Purchase
          </Button>
          <p>
            <strong>{html}</strong>
          </p>
          <p>
            <strong>{html2}</strong>
          </p>
        </Box>
      </form>
      <p>
        <strong>{noCreditCard}</strong>
      </p>
      {button === true ? (
        <Button
          variant="contained"
          onClick={() =>
            (window.location.href = `/traineeform?traineeId=${traineeId}`)
          }
        >
          View your courses
        </Button>
      ) : (
        <p></p>
      )}
      <Button
        variant="contained"
        id="newcard"
        onClick={() =>
          (window.location.href = `/traineecredit?courseId=${courseId}&traineeId=${traineeId}`)
        }
      >
        Add new credit/debit card
      </Button>
    </Box>
  );
};

export default TraineeCreditOptions;
