import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './webcomponents/Navbar';
import InstructorLobby from './webpages/InstructorLobby';
import TraineeLobby from './webpages/TraineeLobby';
import Contract from './webpages/Contract';
import Home from './webpages/Home';
import Admin from './webpages/Admin';
import CorpTraineeLobby from './webpages/CorpTraineeLobby';
//import TraineeLobby from './webpages/TraineeLobby';
import CourseView from './webcomponents/CourseView';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import InstructorRating from './webcomponents/InstructorRating';
import CorpTraineeView from './webcomponents/CorpTraineeView';
import CorpTraineeForm from './webcomponents/CorpTraineeForm';
import CorpTraineeSolve from './webcomponents/CorpTraineeSolve';
import TraineeView from './webcomponents/TraineeView';
import TraineeForm from './webcomponents/TraineeForm';
import TraineeRating from './webcomponents/TraineeRating';
import TraineeSolve from './webcomponents/TraineeSolve';
import InstructorForgotPass from './webcomponents/InstructorForgotPass';
import TraineeForgotPass from './webcomponents/TraineeForgotPass';
import TraineeCreditCard from './webcomponents/TraineeCreditCard';
import TraineeCreditOptions from './webcomponents/TraineeCreditOptions';
import TraineeCourse from './webcomponents/TraineeCourse';
import TraineeExam from './webcomponents/TraineeExam';
import AdminRefund from './webcomponents/AdminRefund';
import AdminAccess from './webcomponents/AdminAccess';
import AdminReports from './webcomponents/AdminReports';
import TraineeSubmitRefund from './webcomponents/TraineeSubmitRefund';
import CorpTraineeExam from './webcomponents/CorpTraineeExam';
import CorpTraineeSubmitAccess from './webcomponents/CorpTraineeSubmitAccess';
import CorpTraineeCourse from './webcomponents/CorpTraineeCourse';
import CorpTraineeRating from './webcomponents/CorpTraineeRating';
import SignUp from './webpages/SignUp';
import LogIn from './webpages/LogIn';
import NotFound from './webpages/NotFound';
import NoAccess from './webpages/NoAccess';
import AdminRouter from './webcomponents/AdminRouter'
import TraineeRouter from './webcomponents/TraineeRouter';
import CorpTraineeRouter from './webcomponents/CorpTraineeRouter';
import InstructorRouter from './webcomponents/InstructorRouter';
import ForceRedirect from './webcomponents/ForceRedirect';
import { Logout, setUser } from './redux/actions/authActions';
import { setAuth } from './util/setAuth';
import store from './redux/store';
import jwt_decode from 'jwt-decode'
import { useSelector } from 'react-redux';

if(window.localStorage.jwt){
  const decode = jwt_decode(window.localStorage.jwt)
  store.dispatch(setUser(decode))
  setAuth(window.localStorage.jwt)
  const currentDate = Date.now / 1000
  if(decode.exp >  currentDate){
   store.dispatch(Logout())
  }
}

function App() {
  const url = 'https://api.exchangerate.host/convert?from=USD&to=';
  const [rateValue, setRateValue] = useState(1);
  const [inputValue, setInputValue] = useState("USD");
  const auth = useSelector(state => state.auth)
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role
  }

  const fetchCurrencyRate = async (val) => {
    console.log("Val", val);
    const response = await fetch(url + val);
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      setRateValue(json.result);
      console.log(json.result);
    }
  }
  return (
    <div className="App">
      <BrowserRouter>
        <div className="bg-light" style={{ height: "100vh" }}>
          <Navbar user={user} />
          <div className="home-lobby">
            Welcome to RADS Online Course Provider
            <div>
              {/* <div>{`rate value: ${rateValue !== null ? `'${rateValue}'` : '1'}`}</div> */}
              <br />
              <Autocomplete
                id="country-select-demo"
                onChange={(event, inputValue) => {
                  setInputValue(inputValue.currency_code);
                  fetchCurrencyRate(inputValue.currency_code);
                }}
                sx={{ width: 300 }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.country}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.country}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className='webpages'>
            <Routes>

              <Route
                path="/noaccess"
                element={<NoAccess rateVal={rateValue} currencyVal={inputValue} />}
              />

              <Route
                path="/traineeoptions"
                element={
                  <TraineeRouter user={user}>
                    <TraineeCreditOptions rateVal={rateValue} currencyVal={inputValue}  token={window.localStorage.jwt} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/corptraineecourse"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeCourse rateVal={rateValue} currencyVal={inputValue} />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineexam"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeExam rateVal={rateValue} currencyVal={inputValue} />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineesubmitaccess"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeSubmitAccess rateVal={rateValue} currencyVal={inputValue} />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/traineesubmitrefund"
                element={
                  <TraineeRouter user={user}>
                    <TraineeSubmitRefund rateVal={rateValue} currencyVal={inputValue} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/adminreports"
                element={
                  <AdminRouter user={user}>
                    <AdminReports rateVal={rateValue} currencyVal={inputValue} />
                  </AdminRouter>
                }
              />

              <Route
                path="/adminrefunds"
                element={
                  <AdminRouter user={user}>
                    <AdminRefund rateVal={rateValue} currencyVal={inputValue} />
                  </AdminRouter>
                }
              />

              <Route
                path="/adminaccess"
                element={
                  <AdminRouter user={user}>
                    <AdminAccess rateVal={rateValue} currencyVal={inputValue} />
                  </AdminRouter>
                }
              />

              <Route
                path="/traineeoptions"
                element={
                  <TraineeRouter user={user}>
                    <TraineeCreditOptions rateVal={rateValue} currencyVal={inputValue} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineexam"
                element={
                  <TraineeRouter user={user}>
                    <TraineeExam rateVal={rateValue} currencyVal={inputValue} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineecourse"
                element={
                  <TraineeRouter user={user}>
                    <TraineeCourse rateVal={rateValue} currencyVal={inputValue} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineecredit"
                element={
                  <TraineeRouter user={user}>
                    <TraineeCreditCard rateVal={rateValue} currencyVal={inputValue} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/forgotpassinstructor/:id"
                element={
                  <InstructorRouter user={user}>
                    <InstructorForgotPass ateVal={rateValue} currencyVal={inputValue} />
                  </InstructorRouter>
                }
              />

              <Route
                path="/forgotpasstrainee/:id"
                element={
                  <TraineeRouter user={user}>
                    <TraineeForgotPass rateVal={rateValue} currencyVal={inputValue} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/instructorrating"
                element={
                  <InstructorRouter user={user}>
                    <InstructorRating rateVal={rateValue} currencyVal={inputValue} />
                  </InstructorRouter>
                }
              />

              <Route
                path="/corptraineerating"
                element={<CorpTraineeRouter user={user}>
                  <CorpTraineeRating rateVal={rateValue} currencyVal={inputValue} />
                </CorpTraineeRouter>
                }
              />

              <Route
                path="/traineesolve"
                element={
                  <TraineeRouter user={user}>
                    <TraineeSolve rateVal={rateValue} currencyVal={inputValue} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/corptraineesolve"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeSolve rateVal={rateValue} currencyVal={inputValue} />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/traineerate"
                element={
                  <TraineeRouter user={user}>
                    <TraineeRating rateVal={rateValue} currencyVal={inputValue} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineeview"
                element={
                  <TraineeRouter user={user}>
                    <TraineeView rateVal={rateValue} currencyVal={inputValue} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineeform"
                element={
                  <TraineeRouter user={user}>
                    <TraineeForm rateVal={rateValue} currencyVal={inputValue} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/instructorlobby"
                element={
                  <InstructorRouter user={user}>
                    <InstructorLobby rateVal={rateValue} currencyVal={inputValue} />
                  </InstructorRouter>
                }
              />

              <Route
                path="/adminlobby"
                element={
                  <AdminRouter user={user}>
                    <Admin rateVal={rateValue} currencyVal={inputValue} />
                  </AdminRouter>
                }
              />

              <Route path="/filter"
                element={<CourseView rateVal={rateValue} currencyVal={inputValue} />}
              />

              <Route
                path="/corptraineeview"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeView rateVal={rateValue} currencyVal={inputValue} />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineelobby"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeLobby rateVal={rateValue} currencyVal={inputValue} />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineeform"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeForm rateVal={rateValue} currencyVal={inputValue} />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/traineelobby"
                element={
                  <TraineeRouter user={user}>
                    <TraineeLobby rateVal={rateValue} currencyVal={inputValue} token = {window.localStorage.jwt} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/"
                element={
                  <Home rateVal={rateValue} currencyVal={inputValue} />}
              />

              <Route
                path="/home"
                element={
                  <Home rateVal={rateValue} currencyVal={inputValue} />}
              />

              <Route
                path="/login"
                element={
                  <ForceRedirect user={user}>
                    <LogIn rateVal={rateValue} currencyVal={inputValue} />
                  </ForceRedirect>
                }
              />

              <Route
                path="/signup"
                element={
                  <ForceRedirect user={user}>
                    <SignUp rateVal={rateValue} currencyVal={inputValue} />
                  </ForceRedirect>
                }
              />

              <Route
                path="/contract"
                element={<Contract rateVal={rateValue} currencyVal={inputValue} />}
              />

              <Route
                path="*"
                element={<NotFound rateVal={rateValue} currencyVal={inputValue} />}
              />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

const countries = [{
  country: "Afghanistan",
  currency_code: "AFN"
},
{
  country: "Albania",
  currency_code: "ALL"
},
{
  country: "Algeria",
  currency_code: "DZD"
},
{
  country: "American Samoa",
  currency_code: "USD"
},
{
  country: "Andorra",
  currency_code: "EUR"
},
{
  country: "Angola",
  currency_code: "AOA"
},
{
  country: "Anguilla",
  currency_code: "XCD"
},
{
  country: "Antarctica",
  currency_code: "XCD"
},
{
  country: "Antigua and Barbuda",
  currency_code: "XCD"
},
{
  country: "Argentina",
  currency_code: "ARS"
},
{
  country: "Armenia",
  currency_code: "AMD"
},
{
  country: "Aruba",
  currency_code: "AWG"
},
{
  country: "Australia",
  currency_code: "AUD"
},
{
  country: "Austria",
  currency_code: "EUR"
},
{
  country: "Azerbaijan",
  currency_code: "AZN"
},
{
  country: "Bahamas",
  currency_code: "BSD"
},
{
  country: "Bahrain",
  currency_code: "BHD"
},
{
  country: "Bangladesh",
  currency_code: "BDT"
},
{
  country: "Barbados",
  currency_code: "BBD"
},
{
  country: "Belarus",
  currency_code: "BYR"
},
{
  country: "Belgium",
  currency_code: "EUR"
},
{
  country: "Belize",
  currency_code: "BZD"
},
{
  country: "Benin",
  currency_code: "XOF"
},
{
  country: "Bermuda",
  currency_code: "BMD"
},
{
  country: "Bhutan",
  currency_code: "BTN"
},
{
  country: "Bolivia",
  currency_code: "BOB"
},
{
  country: "Bosnia and Herzegovina",
  currency_code: "BAM"
},
{
  country: "Botswana",
  currency_code: "BWP"
},
{
  country: "Bouvet Island",
  currency_code: "NOK"
},
{
  country: "Brazil",
  currency_code: "BRL"
},
{
  country: "British Indian Ocean Territory",
  currency_code: "USD"
},
{
  country: "Brunei",
  currency_code: "BND"
},
{
  country: "Bulgaria",
  currency_code: "BGN"
},
{
  country: "Burkina Faso",
  currency_code: "XOF"
},
{
  country: "Burundi",
  currency_code: "BIF"
},
{
  country: "Cambodia",
  currency_code: "KHR"
},
{
  country: "Cameroon",
  currency_code: "XAF"
},
{
  country: "Canada",
  currency_code: "CAD"
},
{
  country: "Cape Verde",
  currency_code: "CVE"
},
{
  country: "Cayman Islands",
  currency_code: "KYD"
},
{
  country: "Central African Republic",
  currency_code: "XAF"
},
{
  country: "Chad",
  currency_code: "XAF"
},
{
  country: "Chile",
  currency_code: "CLP"
},
{
  country: "China",
  currency_code: "CNY"
},
{
  country: "Christmas Island",
  currency_code: "AUD"
},
{
  country: "Cocos (Keeling) Islands",
  currency_code: "AUD"
},
{
  country: "Colombia",
  currency_code: "COP"
},
{
  country: "Comoros",
  currency_code: "KMF"
},
{
  country: "Congo",
  currency_code: "XAF"
},
{
  country: "Cook Islands",
  currency_code: "NZD"
},
{
  country: "Costa Rica",
  currency_code: "CRC"
},
{
  country: "Croatia",
  currency_code: "HRK"
},
{
  country: "Cuba",
  currency_code: "CUP"
},
{
  country: "Cyprus",
  currency_code: "EUR"
},
{
  country: "Czech Republic",
  currency_code: "CZK"
},
{
  country: "Denmark",
  currency_code: "DKK"
},
{
  country: "Djibouti",
  currency_code: "DJF"
},
{
  country: "Dominica",
  currency_code: "XCD"
},
{
  country: "Dominican Republic",
  currency_code: "DOP"
},
{
  country: "East Timor",
  currency_code: "USD"
},
{
  country: "Ecuador",
  currency_code: "ECS"
},
{
  country: "Egypt",
  currency_code: "EGP"
},
{
  country: "El Salvador",
  currency_code: "SVC"
},
{
  country: "England",
  currency_code: "GBP"
},
{
  country: "Equatorial Guinea",
  currency_code: "XAF"
},
{
  country: "Eritrea",
  currency_code: "ERN"
},
{
  country: "Estonia",
  currency_code: "EUR"
},
{
  country: "Ethiopia",
  currency_code: "ETB"
},
{
  country: "Falkland Islands",
  currency_code: "FKP"
},
{
  country: "Faroe Islands",
  currency_code: "DKK"
},
{
  country: "Fiji Islands",
  currency_code: "FJD"
},
{
  country: "Finland",
  currency_code: "EUR"
},
{
  country: "France",
  currency_code: "EUR"
},
{
  country: "French Guiana",
  currency_code: "EUR"
},
{
  country: "French Polynesia",
  currency_code: "XPF"
},
{
  country: "French Southern territories",
  currency_code: "EUR"
},
{
  country: "Gabon",
  currency_code: "XAF"
},
{
  country: "Gambia",
  currency_code: "GMD"
},
{
  country: "Georgia",
  currency_code: "GEL"
},
{
  country: "Germany",
  currency_code: "EUR"
},
{
  country: "Ghana",
  currency_code: "GHS"
},
{
  country: "Gibraltar",
  currency_code: "GIP"
},
{
  country: "Greece",
  currency_code: "EUR"
},
{
  country: "Greenland",
  currency_code: "DKK"
},
{
  country: "Grenada",
  currency_code: "XCD"
},
{
  country: "Guadeloupe",
  currency_code: "EUR"
},
{
  country: "Guam",
  currency_code: "USD"
},
{
  country: "Guatemala",
  currency_code: "QTQ"
},
{
  country: "Guinea",
  currency_code: "GNF"
},
{
  country: "Guinea-Bissau",
  currency_code: "CFA"
},
{
  country: "Guyana",
  currency_code: "GYD"
},
{
  country: "Haiti",
  currency_code: "HTG"
},
{
  country: "Heard Island and McDonald Islands",
  currency_code: "AUD"
},
{
  country: "Holy See (Vatican City State)",
  currency_code: "EUR"
},
{
  country: "Honduras",
  currency_code: "HNL"
},
{
  country: "Hong Kong",
  currency_code: "HKD"
},
{
  country: "Hungary",
  currency_code: "HUF"
},
{
  country: "Iceland",
  currency_code: "ISK"
},
{
  country: "India",
  currency_code: "INR"
},
{
  country: "Indonesia",
  currency_code: "IDR"
},
{
  country: "Iran",
  currency_code: "IRR"
},
{
  country: "Iraq",
  currency_code: "IQD"
},
{
  country: "Ireland",
  currency_code: "EUR"
},
{
  country: "Israel",
  currency_code: "ILS"
},
{
  country: "Italy",
  currency_code: "EUR"
},
{
  country: "Ivory Coast",
  currency_code: "XOF"
},
{
  country: "Jamaica",
  currency_code: "JMD"
},
{
  country: "Japan",
  currency_code: "JPY"
},
{
  country: "Jordan",
  currency_code: "JOD"
},
{
  country: "Kazakhstan",
  currency_code: "KZT"
},
{
  country: "Kenya",
  currency_code: "KES"
},
{
  country: "Kiribati",
  currency_code: "AUD"
},
{
  country: "Kuwait",
  currency_code: "KWD"
},
{
  country: "Kyrgyzstan",
  currency_code: "KGS"
},
{
  country: "Laos",
  currency_code: "LAK"
},
{
  country: "Latvia",
  currency_code: "LVL"
},
{
  country: "Lebanon",
  currency_code: "LBP"
},
{
  country: "Lesotho",
  currency_code: "LSL"
},
{
  country: "Liberia",
  currency_code: "LRD"
},
{
  country: "Libyan Arab Jamahiriya",
  currency_code: "LYD"
},
{
  country: "Liechtenstein",
  currency_code: "CHF"
},
{
  country: "Lithuania",
  currency_code: "LTL"
},
{
  country: "Luxembourg",
  currency_code: "EUR"
},
{
  country: "Macao",
  currency_code: "MOP"
},
{
  country: "North Macedonia",
  currency_code: "MKD"
},
{
  country: "Madagascar",
  currency_code: "MGF"
},
{
  country: "Malawi",
  currency_code: "MWK"
},
{
  country: "Malaysia",
  currency_code: "MYR"
},
{
  country: "Maldives",
  currency_code: "MVR"
},
{
  country: "Mali",
  currency_code: "XOF"
},
{
  country: "Malta",
  currency_code: "EUR"
},
{
  country: "Marshall Islands",
  currency_code: "USD"
},
{
  country: "Martinique",
  currency_code: "EUR"
},
{
  country: "Mauritania",
  currency_code: "MRO"
},
{
  country: "Mauritius",
  currency_code: "MUR"
},
{
  country: "Mayotte",
  currency_code: "EUR"
},
{
  country: "Mexico",
  currency_code: "MXN"
},
{
  country: "Micronesia, Federated States of",
  currency_code: "USD"
},
{
  country: "Moldova",
  currency_code: "MDL"
},
{
  country: "Monaco",
  currency_code: "EUR"
},
{
  country: "Mongolia",
  currency_code: "MNT"
},
{
  country: "Montserrat",
  currency_code: "XCD"
},
{
  country: "Morocco",
  currency_code: "MAD"
},
{
  country: "Mozambique",
  currency_code: "MZN"
},
{
  country: "Myanmar",
  currency_code: "MMR"
},
{
  country: "Namibia",
  currency_code: "NAD"
},
{
  country: "Nauru",
  currency_code: "AUD"
},
{
  country: "Nepal",
  currency_code: "NPR"
},
{
  country: "Netherlands",
  currency_code: "EUR"
},
{
  country: "Netherlands Antilles",
  currency_code: "ANG"
},
{
  country: "New Caledonia",
  currency_code: "XPF"
},
{
  country: "New Zealand",
  currency_code: "NZD"
},
{
  country: "Nicaragua",
  currency_code: "NIO"
},
{
  country: "Niger",
  currency_code: "XOF"
},
{
  country: "Nigeria",
  currency_code: "NGN"
},
{
  country: "Niue",
  currency_code: "NZD"
},
{
  country: "Norfolk Island",
  currency_code: "AUD"
},
{
  country: "North Korea",
  currency_code: "KPW"
},
{
  country: "Northern Ireland",
  currency_code: "GBP"
},
{
  country: "Northern Mariana Islands",
  currency_code: "USD"
},
{
  country: "Norway",
  currency_code: "NOK"
},
{
  country: "Oman",
  currency_code: "OMR"
},
{
  country: "Pakistan",
  currency_code: "PKR"
},
{
  country: "Palau",
  currency_code: "USD"
},
{
  country: "Palestine",
  currency_code: null
},
{
  country: "Panama",
  currency_code: "PAB"
},
{
  country: "Papua New Guinea",
  currency_code: "PGK"
},
{
  country: "Paraguay",
  currency_code: "PYG"
},
{
  country: "Peru",
  currency_code: "PEN"
},
{
  country: "Philippines",
  currency_code: "PHP"
},
{
  country: "Pitcairn",
  currency_code: "NZD"
},
{
  country: "Poland",
  currency_code: "PLN"
},
{
  country: "Portugal",
  currency_code: "EUR"
},
{
  country: "Puerto Rico",
  currency_code: "USD"
},
{
  country: "Qatar",
  currency_code: "QAR"
},
{
  country: "Reunion",
  currency_code: "EUR"
},
{
  country: "Romania",
  currency_code: "RON"
},
{
  country: "Russian Federation",
  currency_code: "RUB"
},
{
  country: "Rwanda",
  currency_code: "RWF"
},
{
  country: "Saint Helena",
  currency_code: "SHP"
},
{
  country: "Saint Kitts and Nevis",
  currency_code: "XCD"
},
{
  country: "Saint Lucia",
  currency_code: "XCD"
},
{
  country: "Saint Pierre and Miquelon",
  currency_code: "EUR"
},
{
  country: "Saint Vincent and the Grenadines",
  currency_code: "XCD"
},
{
  country: "Samoa",
  currency_code: "WST"
},
{
  country: "San Marino",
  currency_code: "EUR"
},
{
  country: "Sao Tome and Principe",
  currency_code: "STD"
},
{
  country: "Saudi Arabia",
  currency_code: "SAR"
},
{
  country: "Scotland",
  currency_code: "GBP"
},
{
  country: "Senegal",
  currency_code: "XOF"
},
{
  country: "Serbia",
  currency_code: "RSD"
},
{
  country: "Seychelles",
  currency_code: "SCR"
},
{
  country: "Sierra Leone",
  currency_code: "SLL"
},
{
  country: "Singapore",
  currency_code: "SGD"
},
{
  country: "Slovakia",
  currency_code: "EUR"
},
{
  country: "Slovenia",
  currency_code: "EUR"
},
{
  country: "Solomon Islands",
  currency_code: "SBD"
},
{
  country: "Somalia",
  currency_code: "SOS"
},
{
  country: "South Africa",
  currency_code: "ZAR"
},
{
  country: "South Georgia and the South Sandwich Islands",
  currency_code: "GBP"
},
{
  country: "South Korea",
  currency_code: "KRW"
},
{
  country: "South Sudan",
  currency_code: "SSP"
},
{
  country: "Spain",
  currency_code: "EUR"
},
{
  country: "Sri Lanka",
  currency_code: "LKR"
},
{
  country: "Sudan",
  currency_code: "SDG"
},
{
  country: "Suriname",
  currency_code: "SRD"
},
{
  country: "Svalbard and Jan Mayen",
  currency_code: "NOK"
},
{
  country: "Swaziland",
  currency_code: "SZL"
},
{
  country: "Sweden",
  currency_code: "SEK"
},
{
  country: "Switzerland",
  currency_code: "CHF"
},
{
  country: "Syria",
  currency_code: "SYP"
},
{
  country: "Tajikistan",
  currency_code: "TJS"
},
{
  country: "Tanzania",
  currency_code: "TZS"
},
{
  country: "Thailand",
  currency_code: "THB"
},
{
  country: "The Democratic Republic of Congo",
  currency_code: "CDF"
},
{
  country: "Togo",
  currency_code: "XOF"
},
{
  country: "Tokelau",
  currency_code: "NZD"
},
{
  country: "Tonga",
  currency_code: "TOP"
},
{
  country: "Trinidad and Tobago",
  currency_code: "TTD"
},
{
  country: "Tunisia",
  currency_code: "TND"
},
{
  country: "Turkey",
  currency_code: "TRY"
},
{
  country: "Turkmenistan",
  currency_code: "TMT"
},
{
  country: "Turks and Caicos Islands",
  currency_code: "USD"
},
{
  country: "Tuvalu",
  currency_code: "AUD"
},
{
  country: "Uganda",
  currency_code: "UGX"
},
{
  country: "Ukraine",
  currency_code: "UAH"
},
{
  country: "United Arab Emirates",
  currency_code: "AED"
},
{
  country: "United Kingdom",
  currency_code: "GBP"
},
{
  country: "United States",
  currency_code: "USD"
},
{
  country: "United States Minor Outlying Islands",
  currency_code: "USD"
},
{
  country: "Uruguay",
  currency_code: "UYU"
},
{
  country: "Uzbekistan",
  currency_code: "UZS"
},
{
  country: "Vanuatu",
  currency_code: "VUV"
},
{
  country: "Venezuela",
  currency_code: "VEF"
},
{
  country: "Vietnam",
  currency_code: "VND"
},
{
  country: "Virgin Islands, British",
  currency_code: "USD"
},
{
  country: "Virgin Islands, U.S.",
  currency_code: "USD"
},
{
  country: "Wales",
  currency_code: "GBP"
},
{
  country: "Wallis and Futuna",
  currency_code: "XPF"
},
{
  country: "Western Sahara",
  currency_code: "MAD"
},
{
  country: "Yemen",
  currency_code: "YER"
},
{
  country: "Zambia",
  currency_code: "ZMW"
},
{
  country: "Zimbabwe",
  currency_code: "ZWD"
},
];
export default App;