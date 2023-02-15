import React from 'react'
import {
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    InputLabel,
    FormControlLabel,
    TextField,
    MenuItem,
    Select,
    FormGroup,
    Checkbox,
    Button
} from '@mui/material';

import { Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import LoginService from "../../services/loginServices"

class WorkTypeSetting extends React.Component {
    constructor() {
        super()
        this.state = {
            currentWorkTypes: []
        }

    }

    componentDidMount = () => {
        this.getWorkTypeRecords()
    }

    handleSubmit = () => {

    }

    getWorkTypeRecords = async () => {
        console.log('call getWorkTypeRecords')
        const config = this.getWorkTypeUrlConfig()
        if (config) {
            const records = await axios(config)
            console.log("get work type records: ", records)
            this.state.currentWorkTypes = records.data
            this.setState(this.state)
        }
    }

    getWorkTypeUrlConfig = () => {
        const loginInfo = LoginService.getInstance().getLoginInfo()
        console.log("work type view login info: ", loginInfo)
        if (loginInfo === null) {
            console.log('get work type err, no login info')
            return null
        }

        const config = {
            method: 'get',
            url: process.env.REACT_APP_TEAM_WORK_TYPE_URL,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'authorization': loginInfo.accessToken
            },
        }

        return config
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Grid p={2} container wrap='nowrap' alignItems="center" justify="center" direction="row">
                        <Grid item>
                            <TextField
                                required
                                id="worktype-required"
                                label="作业类别"
                                defaultValue=""
                                placeholder="设置作业类别名称"
                                variant="filled"
                            />

                            <TextField
                                style={{ marginLeft: "1rem", width: "15rem" }}
                                required
                                id="workcontent-required"
                                label="操作项目"
                                defaultValue=""
                                placeholder="多个操作项目内容请用‘,’隔开"
                                variant="filled"
                            />
                        </Grid>
                        <Grid item style={{ marginLeft: "1rem" }}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox name="firstTrainning" />} label="初训" />
                                <FormControlLabel control={<Checkbox name="secondTrainning" />} label="复训" />
                            </FormGroup>
                        </Grid>

                        <Grid item>
                            <Button variant="contained" color="primary" type="submit" style={{
                                backgroundColor: "green",
                                margin: "5px"
                            }}
                            >
                                添加<AddIcon></AddIcon>
                            </Button>
                        </Grid>
                    </Grid >
                </form >

                {
                    this.state.currentWorkTypes.map(function (record, i) {
                        console.log("record projects:", record.projects.split(','))
                        return (
                            <Grid p={2} container wrap='nowrap' alignItems="center" justify="center" direction="row">
                                <Grid item >
                                    <TextField label="作业类别"
                                        defaultValue={record.kind}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item style={{ marginLeft: "1rem" }}>
                                    <FormGroup >
                                        {record.projects.split(',').map(function (project, i) {
                                            return (
                                                <FormControlLabel disabled control={<Checkbox defaultChecked />} label={project} />
                                            )
                                        })}
                                    </FormGroup>
                                </Grid>
                                <Grid item style={{ marginLeft: "1rem" }}>
                                    <FormGroup >
                                        {record.types.split(',').map(function (type, i) {
                                            return (
                                                <FormControlLabel disabled control={<Checkbox defaultChecked />} label={type} />
                                            )
                                        })}
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        )
                    })
                }

            </div>
        )
    }
}

export default WorkTypeSetting