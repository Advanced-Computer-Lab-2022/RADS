import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from "axios";
import WalletIcon from '@mui/icons-material/Wallet';



const InstructorMonthly = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'long' });
    const params = new URLSearchParams(window.location.search);
    const instructorId = params.get('instructorId');
    const [instructor, setInstructor] = useState([]);
    const [html, setHtml] = useState('');

    useEffect(() => {
        const fetchInstructor = async () => {
            axios
                .get(`/instructor/${instructorId}`)
                .then((res) => {
                    setInstructor(res.data);
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        fetchInstructor();
    }, [])


    return (
        <Box>
            <Box>
                <Box sx={{
                    width: 200,
                    height: 100,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}>
                    <p><strong>Monthly Earned money in {month}</strong></p>
                    <p>{Math.ceil(instructor.monthlyBalance*rateVal)} {currencyVal}</p>
                </Box>
                <Box>
                  <p><strong>Total Balance</strong></p>
                    <p>{Math.ceil(instructor.balance*rateVal)} {currencyVal}</p>
                </Box>
            </Box>
        </Box>
    )
}

export default InstructorMonthly;