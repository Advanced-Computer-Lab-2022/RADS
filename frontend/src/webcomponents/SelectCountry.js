import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';

const SelectCountry = ({ handleSelection}) => {
    
    
    return ( 
        //{/* <div>{`rate value: ${rateValue !== null ? `'${rateValue}'` : '1'}`}</div> */}
        <div className="page-element">
            <Autocomplete
                id="country-select"
                className="page-element"
                onChange={(event, inputValue) => {
                    if (inputValue !== null) {
                        if(['Belarus', 'Ecuador', 'Guatemala', 'Guinea-Bissau', 'Latvia', 'Lithuania', 'Madagascar', 'Mauritania', 'Myanmar', 'Palestine', 'Venezuela', 'Zimbabwe'].includes(inputValue.country)){
                            handleSelection("USD");
                        }   
                        else{
                            handleSelection(inputValue.currency_code);
                        }
                    }
                    console.log(event);
                }}
                sx={{ width: 150 }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.country}
                renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {/* <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.country.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.country.toLowerCase()}.png 2x`}
                    alt=""
                    /> */}
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
     );
}

export default SelectCountry;


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

const countriesFlags = [
  {
    country: "Ascension Island",
    code: "AC",
    emoji: "🇦🇨",
    unicode: "U+1F1E6 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg",
  },
  {
    country: "Andorra",
    code: "AD",
    emoji: "🇦🇩",
    unicode: "U+1F1E6 U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AD.svg",
  },
  {
    country: "United Arab Emirates",
    code: "AE",
    emoji: "🇦🇪",
    unicode: "U+1F1E6 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg",
  },
  {
    country: "Afghanistan",
    code: "AF",
    emoji: "🇦🇫",
    unicode: "U+1F1E6 U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg",
  },
  {
    country: "Antigua & Barbuda",
    code: "AG",
    emoji: "🇦🇬",
    unicode: "U+1F1E6 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AG.svg",
  },
  {
    country: "Anguilla",
    code: "AI",
    emoji: "🇦🇮",
    unicode: "U+1F1E6 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AI.svg",
  },
  {
    country: "Albania",
    code: "AL",
    emoji: "🇦🇱",
    unicode: "U+1F1E6 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AL.svg",
  },
  {
    country: "Armenia",
    code: "AM",
    emoji: "🇦🇲",
    unicode: "U+1F1E6 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AM.svg",
  },
  {
    country: "Angola",
    code: "AO",
    emoji: "🇦🇴",
    unicode: "U+1F1E6 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AO.svg",
  },
  {
    country: "Antarctica",
    code: "AQ",
    emoji: "🇦🇶",
    unicode: "U+1F1E6 U+1F1F6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AQ.svg",
  },
  {
    country: "Argentina",
    code: "AR",
    emoji: "🇦🇷",
    unicode: "U+1F1E6 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AR.svg",
  },
  {
    country: "American Samoa",
    code: "AS",
    emoji: "🇦🇸",
    unicode: "U+1F1E6 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AS.svg",
  },
  {
    country: "Austria",
    code: "AT",
    emoji: "🇦🇹",
    unicode: "U+1F1E6 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AT.svg",
  },
  {
    country: "Australia",
    code: "AU",
    emoji: "🇦🇺",
    unicode: "U+1F1E6 U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AU.svg",
  },
  {
    country: "Aruba",
    code: "AW",
    emoji: "🇦🇼",
    unicode: "U+1F1E6 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AW.svg",
  },
  {
    country: "Åland Islands",
    code: "AX",
    emoji: "🇦🇽",
    unicode: "U+1F1E6 U+1F1FD",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AX.svg",
  },
  {
    country: "Azerbaijan",
    code: "AZ",
    emoji: "🇦🇿",
    unicode: "U+1F1E6 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AZ.svg",
  },
  {
    country: "Bosnia & Herzegovina",
    code: "BA",
    emoji: "🇧🇦",
    unicode: "U+1F1E7 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BA.svg",
  },
  {
    country: "Barbados",
    code: "BB",
    emoji: "🇧🇧",
    unicode: "U+1F1E7 U+1F1E7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BB.svg",
  },
  {
    country: "Bangladesh",
    code: "BD",
    emoji: "🇧🇩",
    unicode: "U+1F1E7 U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BD.svg",
  },
  {
    country: "Belgium",
    code: "BE",
    emoji: "🇧🇪",
    unicode: "U+1F1E7 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BE.svg",
  },
  {
    country: "Burkina Faso",
    code: "BF",
    emoji: "🇧🇫",
    unicode: "U+1F1E7 U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BF.svg",
  },
  {
    country: "Bulgaria",
    code: "BG",
    emoji: "🇧🇬",
    unicode: "U+1F1E7 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BG.svg",
  },
  {
    country: "Bahrain",
    code: "BH",
    emoji: "🇧🇭",
    unicode: "U+1F1E7 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BH.svg",
  },
  {
    country: "Burundi",
    code: "BI",
    emoji: "🇧🇮",
    unicode: "U+1F1E7 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BI.svg",
  },
  {
    country: "Benin",
    code: "BJ",
    emoji: "🇧🇯",
    unicode: "U+1F1E7 U+1F1EF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BJ.svg",
  },
  {
    country: "St. Barthélemy",
    code: "BL",
    emoji: "🇧🇱",
    unicode: "U+1F1E7 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BL.svg",
  },
  {
    country: "Bermuda",
    code: "BM",
    emoji: "🇧🇲",
    unicode: "U+1F1E7 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BM.svg",
  },
  {
    country: "Brunei",
    code: "BN",
    emoji: "🇧🇳",
    unicode: "U+1F1E7 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BN.svg",
  },
  {
    country: "Bolivia",
    code: "BO",
    emoji: "🇧🇴",
    unicode: "U+1F1E7 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BO.svg",
  },
  {
    country: "Caribbean Netherlands",
    code: "BQ",
    emoji: "🇧🇶",
    unicode: "U+1F1E7 U+1F1F6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BQ.svg",
  },
  {
    country: "Brazil",
    code: "BR",
    emoji: "🇧🇷",
    unicode: "U+1F1E7 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BR.svg",
  },
  {
    country: "Bahamas",
    code: "BS",
    emoji: "🇧🇸",
    unicode: "U+1F1E7 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BS.svg",
  },
  {
    country: "Bhutan",
    code: "BT",
    emoji: "🇧🇹",
    unicode: "U+1F1E7 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BT.svg",
  },
  {
    country: "Bouvet Island",
    code: "BV",
    emoji: "🇧🇻",
    unicode: "U+1F1E7 U+1F1FB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BV.svg",
  },
  {
    country: "Botswana",
    code: "BW",
    emoji: "🇧🇼",
    unicode: "U+1F1E7 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BW.svg",
  },
  {
    country: "Belarus",
    code: "BY",
    emoji: "🇧🇾",
    unicode: "U+1F1E7 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BY.svg",
  },
  {
    country: "Belize",
    code: "BZ",
    emoji: "🇧🇿",
    unicode: "U+1F1E7 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BZ.svg",
  },
  {
    country: "Canada",
    code: "CA",
    emoji: "🇨🇦",
    unicode: "U+1F1E8 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CA.svg",
  },
  {
    country: "Cocos (Keeling) Islands",
    code: "CC",
    emoji: "🇨🇨",
    unicode: "U+1F1E8 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CC.svg",
  },
  {
    country: "Congo - Kinshasa",
    code: "CD",
    emoji: "🇨🇩",
    unicode: "U+1F1E8 U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CD.svg",
  },
  {
    country: "Central African Republic",
    code: "CF",
    emoji: "🇨🇫",
    unicode: "U+1F1E8 U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CF.svg",
  },
  {
    country: "Congo - Brazzaville",
    code: "CG",
    emoji: "🇨🇬",
    unicode: "U+1F1E8 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CG.svg",
  },
  {
    country: "Switzerland",
    code: "CH",
    emoji: "🇨🇭",
    unicode: "U+1F1E8 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CH.svg",
  },
  {
    country: "Côte d’Ivoire",
    code: "CI",
    emoji: "🇨🇮",
    unicode: "U+1F1E8 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CI.svg",
  },
  {
    country: "Cook Islands",
    code: "CK",
    emoji: "🇨🇰",
    unicode: "U+1F1E8 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CK.svg",
  },
  {
    country: "Chile",
    code: "CL",
    emoji: "🇨🇱",
    unicode: "U+1F1E8 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CL.svg",
  },
  {
    country: "Cameroon",
    code: "CM",
    emoji: "🇨🇲",
    unicode: "U+1F1E8 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CM.svg",
  },
  {
    country: "China",
    code: "CN",
    emoji: "🇨🇳",
    unicode: "U+1F1E8 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CN.svg",
  },
  {
    country: "Colombia",
    code: "CO",
    emoji: "🇨🇴",
    unicode: "U+1F1E8 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CO.svg",
  },
  {
    country: "Clipperton Island",
    code: "CP",
    emoji: "🇨🇵",
    unicode: "U+1F1E8 U+1F1F5",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CP.svg",
  },
  {
    country: "Costa Rica",
    code: "CR",
    emoji: "🇨🇷",
    unicode: "U+1F1E8 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CR.svg",
  },
  {
    country: "Cuba",
    code: "CU",
    emoji: "🇨🇺",
    unicode: "U+1F1E8 U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CU.svg",
  },
  {
    country: "Cape Verde",
    code: "CV",
    emoji: "🇨🇻",
    unicode: "U+1F1E8 U+1F1FB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CV.svg",
  },
  {
    country: "Curaçao",
    code: "CW",
    emoji: "🇨🇼",
    unicode: "U+1F1E8 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CW.svg",
  },
  {
    country: "Christmas Island",
    code: "CX",
    emoji: "🇨🇽",
    unicode: "U+1F1E8 U+1F1FD",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CX.svg",
  },
  {
    country: "Cyprus",
    code: "CY",
    emoji: "🇨🇾",
    unicode: "U+1F1E8 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CY.svg",
  },
  {
    country: "Czechia",
    code: "CZ",
    emoji: "🇨🇿",
    unicode: "U+1F1E8 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CZ.svg",
  },
  {
    country: "Germany",
    code: "DE",
    emoji: "🇩🇪",
    unicode: "U+1F1E9 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DE.svg",
  },
  {
    country: "Diego Garcia",
    code: "DG",
    emoji: "🇩🇬",
    unicode: "U+1F1E9 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DG.svg",
  },
  {
    country: "Djibouti",
    code: "DJ",
    emoji: "🇩🇯",
    unicode: "U+1F1E9 U+1F1EF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DJ.svg",
  },
  {
    country: "Denmark",
    code: "DK",
    emoji: "🇩🇰",
    unicode: "U+1F1E9 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DK.svg",
  },
  {
    country: "Dominica",
    code: "DM",
    emoji: "🇩🇲",
    unicode: "U+1F1E9 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DM.svg",
  },
  {
    country: "Dominican Republic",
    code: "DO",
    emoji: "🇩🇴",
    unicode: "U+1F1E9 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DO.svg",
  },
  {
    country: "Algeria",
    code: "DZ",
    emoji: "🇩🇿",
    unicode: "U+1F1E9 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DZ.svg",
  },
  {
    country: "Ceuta & Melilla",
    code: "EA",
    emoji: "🇪🇦",
    unicode: "U+1F1EA U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EA.svg",
  },
  {
    country: "Ecuador",
    code: "EC",
    emoji: "🇪🇨",
    unicode: "U+1F1EA U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EC.svg",
  },
  {
    country: "Estonia",
    code: "EE",
    emoji: "🇪🇪",
    unicode: "U+1F1EA U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EE.svg",
  },
  {
    country: "Egypt",
    code: "EG",
    emoji: "🇪🇬",
    unicode: "U+1F1EA U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EG.svg",
  },
  {
    country: "Western Sahara",
    code: "EH",
    emoji: "🇪🇭",
    unicode: "U+1F1EA U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EH.svg",
  },
  {
    country: "Eritrea",
    code: "ER",
    emoji: "🇪🇷",
    unicode: "U+1F1EA U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ER.svg",
  },
  {
    country: "Spain",
    code: "ES",
    emoji: "🇪🇸",
    unicode: "U+1F1EA U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ES.svg",
  },
  {
    country: "Ethiopia",
    code: "ET",
    emoji: "🇪🇹",
    unicode: "U+1F1EA U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ET.svg",
  },
  {
    country: "European Union",
    code: "EU",
    emoji: "🇪🇺",
    unicode: "U+1F1EA U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EU.svg",
  },
  {
    country: "Finland",
    code: "FI",
    emoji: "🇫🇮",
    unicode: "U+1F1EB U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FI.svg",
  },
  {
    country: "Fiji",
    code: "FJ",
    emoji: "🇫🇯",
    unicode: "U+1F1EB U+1F1EF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FJ.svg",
  },
  {
    country: "Falkland Islands",
    code: "FK",
    emoji: "🇫🇰",
    unicode: "U+1F1EB U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FK.svg",
  },
  {
    country: "Micronesia",
    code: "FM",
    emoji: "🇫🇲",
    unicode: "U+1F1EB U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FM.svg",
  },
  {
    country: "Faroe Islands",
    code: "FO",
    emoji: "🇫🇴",
    unicode: "U+1F1EB U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FO.svg",
  },
  {
    country: "France",
    code: "FR",
    emoji: "🇫🇷",
    unicode: "U+1F1EB U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FR.svg",
  },
  {
    country: "Gabon",
    code: "GA",
    emoji: "🇬🇦",
    unicode: "U+1F1EC U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GA.svg",
  },
  {
    country: "United Kingdom",
    code: "GB",
    emoji: "🇬🇧",
    unicode: "U+1F1EC U+1F1E7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg",
  },
  {
    country: "Grenada",
    code: "GD",
    emoji: "🇬🇩",
    unicode: "U+1F1EC U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GD.svg",
  },
  {
    country: "Georgia",
    code: "GE",
    emoji: "🇬🇪",
    unicode: "U+1F1EC U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GE.svg",
  },
  {
    country: "French Guiana",
    code: "GF",
    emoji: "🇬🇫",
    unicode: "U+1F1EC U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GF.svg",
  },
  {
    country: "Guernsey",
    code: "GG",
    emoji: "🇬🇬",
    unicode: "U+1F1EC U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GG.svg",
  },
  {
    country: "Ghana",
    code: "GH",
    emoji: "🇬🇭",
    unicode: "U+1F1EC U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GH.svg",
  },
  {
    country: "Gibraltar",
    code: "GI",
    emoji: "🇬🇮",
    unicode: "U+1F1EC U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GI.svg",
  },
  {
    country: "Greenland",
    code: "GL",
    emoji: "🇬🇱",
    unicode: "U+1F1EC U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GL.svg",
  },
  {
    country: "Gambia",
    code: "GM",
    emoji: "🇬🇲",
    unicode: "U+1F1EC U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GM.svg",
  },
  {
    country: "Guinea",
    code: "GN",
    emoji: "🇬🇳",
    unicode: "U+1F1EC U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GN.svg",
  },
  {
    country: "Guadeloupe",
    code: "GP",
    emoji: "🇬🇵",
    unicode: "U+1F1EC U+1F1F5",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GP.svg",
  },
  {
    country: "Equatorial Guinea",
    code: "GQ",
    emoji: "🇬🇶",
    unicode: "U+1F1EC U+1F1F6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GQ.svg",
  },
  {
    country: "Greece",
    code: "GR",
    emoji: "🇬🇷",
    unicode: "U+1F1EC U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GR.svg",
  },
  {
    country: "South Georgia & South Sandwich Islands",
    code: "GS",
    emoji: "🇬🇸",
    unicode: "U+1F1EC U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GS.svg",
  },
  {
    country: "Guatemala",
    code: "GT",
    emoji: "🇬🇹",
    unicode: "U+1F1EC U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GT.svg",
  },
  {
    country: "Guam",
    code: "GU",
    emoji: "🇬🇺",
    unicode: "U+1F1EC U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GU.svg",
  },
  {
    country: "Guinea-Bissau",
    code: "GW",
    emoji: "🇬🇼",
    unicode: "U+1F1EC U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GW.svg",
  },
  {
    country: "Guyana",
    code: "GY",
    emoji: "🇬🇾",
    unicode: "U+1F1EC U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GY.svg",
  },
  {
    country: "Hong Kong SAR China",
    code: "HK",
    emoji: "🇭🇰",
    unicode: "U+1F1ED U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HK.svg",
  },
  {
    country: "Heard & McDonald Islands",
    code: "HM",
    emoji: "🇭🇲",
    unicode: "U+1F1ED U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HM.svg",
  },
  {
    country: "Honduras",
    code: "HN",
    emoji: "🇭🇳",
    unicode: "U+1F1ED U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HN.svg",
  },
  {
    country: "Croatia",
    code: "HR",
    emoji: "🇭🇷",
    unicode: "U+1F1ED U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HR.svg",
  },
  {
    country: "Haiti",
    code: "HT",
    emoji: "🇭🇹",
    unicode: "U+1F1ED U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HT.svg",
  },
  {
    country: "Hungary",
    code: "HU",
    emoji: "🇭🇺",
    unicode: "U+1F1ED U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HU.svg",
  },
  {
    country: "Canary Islands",
    code: "IC",
    emoji: "🇮🇨",
    unicode: "U+1F1EE U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IC.svg",
  },
  {
    country: "Indonesia",
    code: "ID",
    emoji: "🇮🇩",
    unicode: "U+1F1EE U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ID.svg",
  },
  {
    country: "Ireland",
    code: "IE",
    emoji: "🇮🇪",
    unicode: "U+1F1EE U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IE.svg",
  },
  {
    country: "Israel",
    code: "IL",
    emoji: "🇮🇱",
    unicode: "U+1F1EE U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IL.svg",
  },
  {
    country: "Isle of Man",
    code: "IM",
    emoji: "🇮🇲",
    unicode: "U+1F1EE U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IM.svg",
  },
  {
    country: "India",
    code: "IN",
    emoji: "🇮🇳",
    unicode: "U+1F1EE U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg",
  },
  {
    country: "British Indian Ocean Territory",
    code: "IO",
    emoji: "🇮🇴",
    unicode: "U+1F1EE U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IO.svg",
  },
  {
    country: "Iraq",
    code: "IQ",
    emoji: "🇮🇶",
    unicode: "U+1F1EE U+1F1F6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IQ.svg",
  },
  {
    country: "Iran",
    code: "IR",
    emoji: "🇮🇷",
    unicode: "U+1F1EE U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IR.svg",
  },
  {
    country: "Iceland",
    code: "IS",
    emoji: "🇮🇸",
    unicode: "U+1F1EE U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IS.svg",
  },
  {
    country: "Italy",
    code: "IT",
    emoji: "🇮🇹",
    unicode: "U+1F1EE U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IT.svg",
  },
  {
    country: "Jersey",
    code: "JE",
    emoji: "🇯🇪",
    unicode: "U+1F1EF U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JE.svg",
  },
  {
    country: "Jamaica",
    code: "JM",
    emoji: "🇯🇲",
    unicode: "U+1F1EF U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JM.svg",
  },
  {
    country: "Jordan",
    code: "JO",
    emoji: "🇯🇴",
    unicode: "U+1F1EF U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JO.svg",
  },
  {
    country: "Japan",
    code: "JP",
    emoji: "🇯🇵",
    unicode: "U+1F1EF U+1F1F5",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JP.svg",
  },
  {
    country: "Kenya",
    code: "KE",
    emoji: "🇰🇪",
    unicode: "U+1F1F0 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KE.svg",
  },
  {
    country: "Kyrgyzstan",
    code: "KG",
    emoji: "🇰🇬",
    unicode: "U+1F1F0 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KG.svg",
  },
  {
    country: "Cambodia",
    code: "KH",
    emoji: "🇰🇭",
    unicode: "U+1F1F0 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KH.svg",
  },
  {
    country: "Kiribati",
    code: "KI",
    emoji: "🇰🇮",
    unicode: "U+1F1F0 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KI.svg",
  },
  {
    country: "Comoros",
    code: "KM",
    emoji: "🇰🇲",
    unicode: "U+1F1F0 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KM.svg",
  },
  {
    country: "St. Kitts & Nevis",
    code: "KN",
    emoji: "🇰🇳",
    unicode: "U+1F1F0 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KN.svg",
  },
  {
    country: "North Korea",
    code: "KP",
    emoji: "🇰🇵",
    unicode: "U+1F1F0 U+1F1F5",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KP.svg",
  },
  {
    country: "South Korea",
    code: "KR",
    emoji: "🇰🇷",
    unicode: "U+1F1F0 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KR.svg",
  },
  {
    country: "Kuwait",
    code: "KW",
    emoji: "🇰🇼",
    unicode: "U+1F1F0 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KW.svg",
  },
  {
    country: "Cayman Islands",
    code: "KY",
    emoji: "🇰🇾",
    unicode: "U+1F1F0 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KY.svg",
  },
  {
    country: "Kazakhstan",
    code: "KZ",
    emoji: "🇰🇿",
    unicode: "U+1F1F0 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KZ.svg",
  },
  {
    country: "Laos",
    code: "LA",
    emoji: "🇱🇦",
    unicode: "U+1F1F1 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LA.svg",
  },
  {
    country: "Lebanon",
    code: "LB",
    emoji: "🇱🇧",
    unicode: "U+1F1F1 U+1F1E7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LB.svg",
  },
  {
    country: "St. Lucia",
    code: "LC",
    emoji: "🇱🇨",
    unicode: "U+1F1F1 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LC.svg",
  },
  {
    country: "Liechtenstein",
    code: "LI",
    emoji: "🇱🇮",
    unicode: "U+1F1F1 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LI.svg",
  },
  {
    country: "Sri Lanka",
    code: "LK",
    emoji: "🇱🇰",
    unicode: "U+1F1F1 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LK.svg",
  },
  {
    country: "Liberia",
    code: "LR",
    emoji: "🇱🇷",
    unicode: "U+1F1F1 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LR.svg",
  },
  {
    country: "Lesotho",
    code: "LS",
    emoji: "🇱🇸",
    unicode: "U+1F1F1 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LS.svg",
  },
  {
    country: "Lithuania",
    code: "LT",
    emoji: "🇱🇹",
    unicode: "U+1F1F1 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LT.svg",
  },
  {
    country: "Luxembourg",
    code: "LU",
    emoji: "🇱🇺",
    unicode: "U+1F1F1 U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LU.svg",
  },
  {
    country: "Latvia",
    code: "LV",
    emoji: "🇱🇻",
    unicode: "U+1F1F1 U+1F1FB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LV.svg",
  },
  {
    country: "Libya",
    code: "LY",
    emoji: "🇱🇾",
    unicode: "U+1F1F1 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LY.svg",
  },
  {
    country: "Morocco",
    code: "MA",
    emoji: "🇲🇦",
    unicode: "U+1F1F2 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MA.svg",
  },
  {
    country: "Monaco",
    code: "MC",
    emoji: "🇲🇨",
    unicode: "U+1F1F2 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MC.svg",
  },
  {
    country: "Moldova",
    code: "MD",
    emoji: "🇲🇩",
    unicode: "U+1F1F2 U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MD.svg",
  },
  {
    country: "Montenegro",
    code: "ME",
    emoji: "🇲🇪",
    unicode: "U+1F1F2 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ME.svg",
  },
  {
    country: "St. Martin",
    code: "MF",
    emoji: "🇲🇫",
    unicode: "U+1F1F2 U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MF.svg",
  },
  {
    country: "Madagascar",
    code: "MG",
    emoji: "🇲🇬",
    unicode: "U+1F1F2 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MG.svg",
  },
  {
    country: "Marshall Islands",
    code: "MH",
    emoji: "🇲🇭",
    unicode: "U+1F1F2 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MH.svg",
  },
  {
    country: "North Macedonia",
    code: "MK",
    emoji: "🇲🇰",
    unicode: "U+1F1F2 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MK.svg",
  },
  {
    country: "Mali",
    code: "ML",
    emoji: "🇲🇱",
    unicode: "U+1F1F2 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ML.svg",
  },
  {
    country: "Myanmar (Burma)",
    code: "MM",
    emoji: "🇲🇲",
    unicode: "U+1F1F2 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MM.svg",
  },
  {
    country: "Mongolia",
    code: "MN",
    emoji: "🇲🇳",
    unicode: "U+1F1F2 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MN.svg",
  },
  {
    country: "Macao SAR China",
    code: "MO",
    emoji: "🇲🇴",
    unicode: "U+1F1F2 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MO.svg",
  },
  {
    country: "Northern Mariana Islands",
    code: "MP",
    emoji: "🇲🇵",
    unicode: "U+1F1F2 U+1F1F5",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MP.svg",
  },
  {
    country: "Martinique",
    code: "MQ",
    emoji: "🇲🇶",
    unicode: "U+1F1F2 U+1F1F6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MQ.svg",
  },
  {
    country: "Mauritania",
    code: "MR",
    emoji: "🇲🇷",
    unicode: "U+1F1F2 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MR.svg",
  },
  {
    country: "Montserrat",
    code: "MS",
    emoji: "🇲🇸",
    unicode: "U+1F1F2 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MS.svg",
  },
  {
    country: "Malta",
    code: "MT",
    emoji: "🇲🇹",
    unicode: "U+1F1F2 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MT.svg",
  },
  {
    country: "Mauritius",
    code: "MU",
    emoji: "🇲🇺",
    unicode: "U+1F1F2 U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MU.svg",
  },
  {
    country: "Maldives",
    code: "MV",
    emoji: "🇲🇻",
    unicode: "U+1F1F2 U+1F1FB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MV.svg",
  },
  {
    country: "Malawi",
    code: "MW",
    emoji: "🇲🇼",
    unicode: "U+1F1F2 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MW.svg",
  },
  {
    country: "Mexico",
    code: "MX",
    emoji: "🇲🇽",
    unicode: "U+1F1F2 U+1F1FD",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MX.svg",
  },
  {
    country: "Malaysia",
    code: "MY",
    emoji: "🇲🇾",
    unicode: "U+1F1F2 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MY.svg",
  },
  {
    country: "Mozambique",
    code: "MZ",
    emoji: "🇲🇿",
    unicode: "U+1F1F2 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MZ.svg",
  },
  {
    country: "Namibia",
    code: "NA",
    emoji: "🇳🇦",
    unicode: "U+1F1F3 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NA.svg",
  },
  {
    country: "New Caledonia",
    code: "NC",
    emoji: "🇳🇨",
    unicode: "U+1F1F3 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NC.svg",
  },
  {
    country: "Niger",
    code: "NE",
    emoji: "🇳🇪",
    unicode: "U+1F1F3 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NE.svg",
  },
  {
    country: "Norfolk Island",
    code: "NF",
    emoji: "🇳🇫",
    unicode: "U+1F1F3 U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NF.svg",
  },
  {
    country: "Nigeria",
    code: "NG",
    emoji: "🇳🇬",
    unicode: "U+1F1F3 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NG.svg",
  },
  {
    country: "Nicaragua",
    code: "NI",
    emoji: "🇳🇮",
    unicode: "U+1F1F3 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NI.svg",
  },
  {
    country: "Netherlands",
    code: "NL",
    emoji: "🇳🇱",
    unicode: "U+1F1F3 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NL.svg",
  },
  {
    country: "Norway",
    code: "NO",
    emoji: "🇳🇴",
    unicode: "U+1F1F3 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NO.svg",
  },
  {
    country: "Nepal",
    code: "NP",
    emoji: "🇳🇵",
    unicode: "U+1F1F3 U+1F1F5",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NP.svg",
  },
  {
    country: "Nauru",
    code: "NR",
    emoji: "🇳🇷",
    unicode: "U+1F1F3 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NR.svg",
  },
  {
    country: "Niue",
    code: "NU",
    emoji: "🇳🇺",
    unicode: "U+1F1F3 U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NU.svg",
  },
  {
    country: "New Zealand",
    code: "NZ",
    emoji: "🇳🇿",
    unicode: "U+1F1F3 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NZ.svg",
  },
  {
    country: "Oman",
    code: "OM",
    emoji: "🇴🇲",
    unicode: "U+1F1F4 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/OM.svg",
  },
  {
    country: "Panama",
    code: "PA",
    emoji: "🇵🇦",
    unicode: "U+1F1F5 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PA.svg",
  },
  {
    country: "Peru",
    code: "PE",
    emoji: "🇵🇪",
    unicode: "U+1F1F5 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PE.svg",
  },
  {
    country: "French Polynesia",
    code: "PF",
    emoji: "🇵🇫",
    unicode: "U+1F1F5 U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PF.svg",
  },
  {
    country: "Papua New Guinea",
    code: "PG",
    emoji: "🇵🇬",
    unicode: "U+1F1F5 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PG.svg",
  },
  {
    country: "Philippines",
    code: "PH",
    emoji: "🇵🇭",
    unicode: "U+1F1F5 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PH.svg",
  },
  {
    country: "Pakistan",
    code: "PK",
    emoji: "🇵🇰",
    unicode: "U+1F1F5 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PK.svg",
  },
  {
    country: "Poland",
    code: "PL",
    emoji: "🇵🇱",
    unicode: "U+1F1F5 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PL.svg",
  },
  {
    country: "St. Pierre & Miquelon",
    code: "PM",
    emoji: "🇵🇲",
    unicode: "U+1F1F5 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PM.svg",
  },
  {
    country: "Pitcairn Islands",
    code: "PN",
    emoji: "🇵🇳",
    unicode: "U+1F1F5 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PN.svg",
  },
  {
    country: "Puerto Rico",
    code: "PR",
    emoji: "🇵🇷",
    unicode: "U+1F1F5 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PR.svg",
  },
  {
    country: "Palestinian Territories",
    code: "PS",
    emoji: "🇵🇸",
    unicode: "U+1F1F5 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PS.svg",
  },
  {
    country: "Portugal",
    code: "PT",
    emoji: "🇵🇹",
    unicode: "U+1F1F5 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PT.svg",
  },
  {
    country: "Palau",
    code: "PW",
    emoji: "🇵🇼",
    unicode: "U+1F1F5 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PW.svg",
  },
  {
    country: "Paraguay",
    code: "PY",
    emoji: "🇵🇾",
    unicode: "U+1F1F5 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PY.svg",
  },
  {
    country: "Qatar",
    code: "QA",
    emoji: "🇶🇦",
    unicode: "U+1F1F6 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/QA.svg",
  },
  {
    country: "Réunion",
    code: "RE",
    emoji: "🇷🇪",
    unicode: "U+1F1F7 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RE.svg",
  },
  {
    country: "Romania",
    code: "RO",
    emoji: "🇷🇴",
    unicode: "U+1F1F7 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RO.svg",
  },
  {
    country: "Serbia",
    code: "RS",
    emoji: "🇷🇸",
    unicode: "U+1F1F7 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RS.svg",
  },
  {
    country: "Russia",
    code: "RU",
    emoji: "🇷🇺",
    unicode: "U+1F1F7 U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RU.svg",
  },
  {
    country: "Rwanda",
    code: "RW",
    emoji: "🇷🇼",
    unicode: "U+1F1F7 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RW.svg",
  },
  {
    country: "Saudi Arabia",
    code: "SA",
    emoji: "🇸🇦",
    unicode: "U+1F1F8 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SA.svg",
  },
  {
    country: "Solomon Islands",
    code: "SB",
    emoji: "🇸🇧",
    unicode: "U+1F1F8 U+1F1E7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SB.svg",
  },
  {
    country: "Seychelles",
    code: "SC",
    emoji: "🇸🇨",
    unicode: "U+1F1F8 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SC.svg",
  },
  {
    country: "Sudan",
    code: "SD",
    emoji: "🇸🇩",
    unicode: "U+1F1F8 U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SD.svg",
  },
  {
    country: "Sweden",
    code: "SE",
    emoji: "🇸🇪",
    unicode: "U+1F1F8 U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SE.svg",
  },
  {
    country: "Singapore",
    code: "SG",
    emoji: "🇸🇬",
    unicode: "U+1F1F8 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SG.svg",
  },
  {
    country: "St. Helena",
    code: "SH",
    emoji: "🇸🇭",
    unicode: "U+1F1F8 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SH.svg",
  },
  {
    country: "Slovenia",
    code: "SI",
    emoji: "🇸🇮",
    unicode: "U+1F1F8 U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SI.svg",
  },
  {
    country: "Svalbard & Jan Mayen",
    code: "SJ",
    emoji: "🇸🇯",
    unicode: "U+1F1F8 U+1F1EF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SJ.svg",
  },
  {
    country: "Slovakia",
    code: "SK",
    emoji: "🇸🇰",
    unicode: "U+1F1F8 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SK.svg",
  },
  {
    country: "Sierra Leone",
    code: "SL",
    emoji: "🇸🇱",
    unicode: "U+1F1F8 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SL.svg",
  },
  {
    country: "San Marino",
    code: "SM",
    emoji: "🇸🇲",
    unicode: "U+1F1F8 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SM.svg",
  },
  {
    country: "Senegal",
    code: "SN",
    emoji: "🇸🇳",
    unicode: "U+1F1F8 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SN.svg",
  },
  {
    country: "Somalia",
    code: "SO",
    emoji: "🇸🇴",
    unicode: "U+1F1F8 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SO.svg",
  },
  {
    country: "Suriname",
    code: "SR",
    emoji: "🇸🇷",
    unicode: "U+1F1F8 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SR.svg",
  },
  {
    country: "South Sudan",
    code: "SS",
    emoji: "🇸🇸",
    unicode: "U+1F1F8 U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SS.svg",
  },
  {
    country: "São Tomé & Príncipe",
    code: "ST",
    emoji: "🇸🇹",
    unicode: "U+1F1F8 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ST.svg",
  },
  {
    country: "El Salvador",
    code: "SV",
    emoji: "🇸🇻",
    unicode: "U+1F1F8 U+1F1FB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SV.svg",
  },
  {
    country: "Sint Maarten",
    code: "SX",
    emoji: "🇸🇽",
    unicode: "U+1F1F8 U+1F1FD",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SX.svg",
  },
  {
    country: "Syria",
    code: "SY",
    emoji: "🇸🇾",
    unicode: "U+1F1F8 U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SY.svg",
  },
  {
    country: "Eswatini",
    code: "SZ",
    emoji: "🇸🇿",
    unicode: "U+1F1F8 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SZ.svg",
  },
  {
    country: "Tristan da Cunha",
    code: "TA",
    emoji: "🇹🇦",
    unicode: "U+1F1F9 U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TA.svg",
  },
  {
    country: "Turks & Caicos Islands",
    code: "TC",
    emoji: "🇹🇨",
    unicode: "U+1F1F9 U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TC.svg",
  },
  {
    country: "Chad",
    code: "TD",
    emoji: "🇹🇩",
    unicode: "U+1F1F9 U+1F1E9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TD.svg",
  },
  {
    country: "French Southern Territories",
    code: "TF",
    emoji: "🇹🇫",
    unicode: "U+1F1F9 U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TF.svg",
  },
  {
    country: "Togo",
    code: "TG",
    emoji: "🇹🇬",
    unicode: "U+1F1F9 U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TG.svg",
  },
  {
    country: "Thailand",
    code: "TH",
    emoji: "🇹🇭",
    unicode: "U+1F1F9 U+1F1ED",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TH.svg",
  },
  {
    country: "Tajikistan",
    code: "TJ",
    emoji: "🇹🇯",
    unicode: "U+1F1F9 U+1F1EF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TJ.svg",
  },
  {
    country: "Tokelau",
    code: "TK",
    emoji: "🇹🇰",
    unicode: "U+1F1F9 U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TK.svg",
  },
  {
    country: "Timor-Leste",
    code: "TL",
    emoji: "🇹🇱",
    unicode: "U+1F1F9 U+1F1F1",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TL.svg",
  },
  {
    country: "Turkmenistan",
    code: "TM",
    emoji: "🇹🇲",
    unicode: "U+1F1F9 U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TM.svg",
  },
  {
    country: "Tunisia",
    code: "TN",
    emoji: "🇹🇳",
    unicode: "U+1F1F9 U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TN.svg",
  },
  {
    country: "Tonga",
    code: "TO",
    emoji: "🇹🇴",
    unicode: "U+1F1F9 U+1F1F4",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TO.svg",
  },
  {
    country: "Turkey",
    code: "TR",
    emoji: "🇹🇷",
    unicode: "U+1F1F9 U+1F1F7",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TR.svg",
  },
  {
    country: "Trinidad & Tobago",
    code: "TT",
    emoji: "🇹🇹",
    unicode: "U+1F1F9 U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TT.svg",
  },
  {
    country: "Tuvalu",
    code: "TV",
    emoji: "🇹🇻",
    unicode: "U+1F1F9 U+1F1FB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TV.svg",
  },
  {
    country: "Taiwan",
    code: "TW",
    emoji: "🇹🇼",
    unicode: "U+1F1F9 U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TW.svg",
  },
  {
    country: "Tanzania",
    code: "TZ",
    emoji: "🇹🇿",
    unicode: "U+1F1F9 U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TZ.svg",
  },
  {
    country: "Ukraine",
    code: "UA",
    emoji: "🇺🇦",
    unicode: "U+1F1FA U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UA.svg",
  },
  {
    country: "Uganda",
    code: "UG",
    emoji: "🇺🇬",
    unicode: "U+1F1FA U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UG.svg",
  },
  {
    country: "U.S. Outlying Islands",
    code: "UM",
    emoji: "🇺🇲",
    unicode: "U+1F1FA U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UM.svg",
  },
  {
    country: "United Nations",
    code: "UN",
    emoji: "🇺🇳",
    unicode: "U+1F1FA U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UN.svg",
  },
  {
    country: "United States",
    code: "US",
    emoji: "🇺🇸",
    unicode: "U+1F1FA U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg",
  },
  {
    country: "Uruguay",
    code: "UY",
    emoji: "🇺🇾",
    unicode: "U+1F1FA U+1F1FE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UY.svg",
  },
  {
    country: "Uzbekistan",
    code: "UZ",
    emoji: "🇺🇿",
    unicode: "U+1F1FA U+1F1FF",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UZ.svg",
  },
  {
    country: "Vatican City",
    code: "VA",
    emoji: "🇻🇦",
    unicode: "U+1F1FB U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VA.svg",
  },
  {
    country: "St. Vincent & Grenadines",
    code: "VC",
    emoji: "🇻🇨",
    unicode: "U+1F1FB U+1F1E8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VC.svg",
  },
  {
    country: "Venezuela",
    code: "VE",
    emoji: "🇻🇪",
    unicode: "U+1F1FB U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VE.svg",
  },
  {
    country: "British Virgin Islands",
    code: "VG",
    emoji: "🇻🇬",
    unicode: "U+1F1FB U+1F1EC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VG.svg",
  },
  {
    country: "U.S. Virgin Islands",
    code: "VI",
    emoji: "🇻🇮",
    unicode: "U+1F1FB U+1F1EE",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VI.svg",
  },
  {
    country: "Vietnam",
    code: "VN",
    emoji: "🇻🇳",
    unicode: "U+1F1FB U+1F1F3",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VN.svg",
  },
  {
    country: "Vanuatu",
    code: "VU",
    emoji: "🇻🇺",
    unicode: "U+1F1FB U+1F1FA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VU.svg",
  },
  {
    country: "Wallis & Futuna",
    code: "WF",
    emoji: "🇼🇫",
    unicode: "U+1F1FC U+1F1EB",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WF.svg",
  },
  {
    country: "Samoa",
    code: "WS",
    emoji: "🇼🇸",
    unicode: "U+1F1FC U+1F1F8",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WS.svg",
  },
  {
    country: "Kosovo",
    code: "XK",
    emoji: "🇽🇰",
    unicode: "U+1F1FD U+1F1F0",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/XK.svg",
  },
  {
    country: "Yemen",
    code: "YE",
    emoji: "🇾🇪",
    unicode: "U+1F1FE U+1F1EA",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YE.svg",
  },
  {
    country: "Mayotte",
    code: "YT",
    emoji: "🇾🇹",
    unicode: "U+1F1FE U+1F1F9",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YT.svg",
  },
  {
    country: "South Africa",
    code: "ZA",
    emoji: "🇿🇦",
    unicode: "U+1F1FF U+1F1E6",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZA.svg",
  },
  {
    country: "Zambia",
    code: "ZM",
    emoji: "🇿🇲",
    unicode: "U+1F1FF U+1F1F2",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZM.svg",
  },
  {
    country: "Zimbabwe",
    code: "ZW",
    emoji: "🇿🇼",
    unicode: "U+1F1FF U+1F1FC",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZW.svg",
  },
  {
    country: "England",
    code: "ENGLAND",
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    unicode: "U+1F3F4 U+E0067 U+E0062 U+E0065 U+E006E U+E0067 U+E007F",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ENGLAND.svg",
  },
  {
    country: "Scotland",
    code: "SCOTLAND",
    emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    unicode: "U+1F3F4 U+E0067 U+E0062 U+E0073 U+E0063 U+E0074 U+E007F",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SCOTLAND.svg",
  },
  {
    country: "Wales",
    code: "WALES",
    emoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    unicode: "U+1F3F4 U+E0067 U+E0062 U+E0077 U+E006C U+E0073 U+E007F",
    image:
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WALES.svg",
  },
];