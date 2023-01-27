import { React, useRef } from 'react'
import { Grid, Paper, TextField, Button } from "@material-ui/core"
import { Avatar } from '@mui/material'
import LockOpenOutlined from '@mui/icons-material/LockOpenOutlined'
import { sha256 } from 'js-sha256'
import axios from 'axios'
const userLogin = async (phone, password) => {
    console.log('phone: ', phone)
    console.log('password111: ', password)
    const config = {
        method: 'post',
        url: process.env.REACT_APP_LOGIN_URL,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        data: {
            phone,
            passwordHash: sha256(password)
        }
    }
    try {
        const result = await axios(config)


        console.log(result)
    } catch (e) {
        console.log('post err: ', e)
    }


}

const Login = () => {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '2em auto' }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const buttonStyle = { marginTop: '2em' }
    const phoneValueRef = useRef('')
    const passwordRef = useRef('')
    console.log('passwordref: ', passwordRef)
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOpenOutlined /></Avatar>
                    <h2>登录</h2>
                </Grid>
                <TextField label="电话" placeholder='输入您的电话'
                    fullWidth required inputRef={phoneValueRef}></TextField>
                <TextField label="密码" placeholder='输入您的密码' type="password"
                    fullWidth required
                    inputRef={passwordRef}
                ></TextField>
                <Button style={buttonStyle}
                    type="submit" color="primary"
                    fullWidth variant="contained"
                    onClick={() => userLogin(
                        phoneValueRef.current.value,
                        passwordRef.current.value,
                    )}>登录</Button>
            </Paper>
        </Grid >
    )
}

export default Login;