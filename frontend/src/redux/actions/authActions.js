import axios from 'axios';
import { ERRORS, SET_USER } from '../types';
import jwt_decode from 'jwt-decode'
import { setAuth } from '../../util/setAuth';

export const SignUpAction = (form, navigate) => dispatch => {
    axios.post('/signup', form)
        .then(res => {
            navigate('/contract')
            dispatch({
                type: ERRORS,
                payload: {}
            })
        })
        .catch(err => {
            dispatch({
                type: ERRORS,
                payload: err.response.data
            })
        })
}

export const verify = (id, navigate) => {
    axios.patch(`/instructor/changeInfo/${id}`, { verified: true })
        .then(res => {
            console.log(res.data)
            navigate('/contract')
        }).catch(err => {
            console.error(err)
        })
}

export const LogInAction = (form, navigate) => dispatch => {
    axios.post('/login', form)
        .then(res => {
            const { token } = res.data
            localStorage.setItem('jwt', token)
            const decode = jwt_decode(token)
            dispatch(setUser(decode))
            setAuth(token)
            if (decode.role === 'INSTRUCTOR' && decode.verified === false) {
                verify(decode.id, navigate)
            } else {
                navigate('/home')
            }
        })
        .catch(err => {
            dispatch({
                type: ERRORS,
                payload: err.response.data
            })
        })
}

export const Logout = () => dispatch => {
    localStorage.removeItem('jwt')
    dispatch({
        type: SET_USER,
        payload: {}
    })
}

export const setUser = (decode) => ({
    type: SET_USER,
    payload: decode
})