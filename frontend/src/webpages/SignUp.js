import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, Navigate } from 'react-router-dom';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Advanced-Computer-Lab-2022/RADS">
                RADS
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const [html, setHtml] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        let userName = data.get('userName');
        let firstName = data.get('firstName');
        let lastName = data.get('lastName');
        let email = data.get('email');
        let gender = data.get('gender');
        let role = "TRAINEE";
        let password = data.get('password');
        let confirm = data.get('confirm');
        let body = { userName, firstName, lastName, email, gender, role, password, confirm };
        const response = await fetch(`/signup`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            console.log("Signed up successfully !!");
            navigate("/contract");
        }
        else{
            if(!json.firstName && !json.lastName && !json.email && !json.password && !json.confirm){
                setHtml(json.userName);
            }
            if(!json.userName && !json.lastName && !json.email && !json.password && !json.confirm){
                setHtml(json.firstName);
            }
            if(!json.firstName && !json.userName && !json.email && !json.password && !json.confirm){
                setHtml(json.lastName);
            }
            if(!json.firstName && !json.lastName && !json.userName && !json.password && !json.confirm){
                setHtml(json.email);
            }
            if(!json.firstName && !json.lastName && !json.userName && !json.email && !json.confirm){
                setHtml(json.password);
            }
            if(!json.firstName && !json.lastName && !json.email && !json.password && !json.userName){
                setHtml(json.confirm);
            }
             console.log(json);
        }
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="userName"
                                        label="User Name"
                                        name="userName"
                                        autoComplete="userName"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirm"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirm"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <FormLabel id="gender-radio">Gender:</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="gender-radio"
                                            defaultValue="female"
                                            name="gender"
                                        >
                                            <FormControlLabel control={<Radio value="female" />} label="Female" />
                                            <FormControlLabel control={<Radio value="male" />} label="Male" />
                                            <FormControlLabel control={<Radio value="other" />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href='/login' variant="body2">
                                        Already have an account? Log in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
            <p><strong>{html}</strong></p>
        </div>
    );
}