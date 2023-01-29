import { React, useRef, useState } from 'react'
import { Grid, Paper, TextField, Button } from "@material-ui/core"
import { Avatar } from '@mui/material'
import LockOpenOutlined from '@mui/icons-material/LockOpenOutlined'
import { sha256 } from 'js-sha256'
import axios from 'axios'
import LoginService from "../../services/loginServices"
import { red } from '@mui/material/colors'

const Login = () => {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '2em auto' }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const buttonStyle = { marginTop: '2em' }
    const phoneValueRef = useRef('')
    const passwordRef = useRef('')
    const [display, setDisplay] = useState('block')
    const [showErr, setShowErr] = useState('none')
    const style = { display: display }
    const errStyle = { display: showErr, color: 'red' }
    Login.setDisplay = setDisplay
    Login.setShowErr = setShowErr
    return (
        <Grid style={style}>
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
                <h3 style={errStyle}>登陆错误，请确认密码是否正确或者联系管理员</h3>
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

const userLogin = async (phone, password) => {
    const loginServiceInstance = LoginService.getInstance()
    Login.setShowErr('none')
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
        console.log('login result: ', result)
        if (result.status === 200) {
            loginServiceInstance.setLoginInfo(result.data)
            Login.setDisplay('none')
        } else {
            console.log('login err: ', result.status)
            Login.setShowErr('block')
        }

        console.log(result)
    } catch (e) {
        Login.setShowErr('block')
        console.log('post err: ', e)
    }


}

export default Login;