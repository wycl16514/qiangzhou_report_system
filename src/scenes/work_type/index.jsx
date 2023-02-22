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

        this.workClass = React.createRef()
        this.projects = React.createRef()
        this.firstTrainChecked = false
        this.secondTrainChecked = false
    }

    componentDidMount = () => {
        this.getWorkTypeRecords()
    }

    handleSubmit = async () => {
        const projectTypes = []
        if (this.firstTrainChecked) {
            projectTypes.push("初训")
        }
        if (this.secondTrainChecked) {
            projectTypes.push("复训")
        }

        console.log("ref obj: ", this.workClass)

        const addWorkType = {
            kind: this.workClass.current.value,
            projects: this.projects.current.value,
            types: projectTypes.toString(),
        }

        const config = {
            method: 'post',
            url: process.env.REACT_APP_ADD_WORK_TYPE_URL,
            headers: {
                'Access-Control-Allow-Origin': '*',
                //'authorization': loginInfo.accessToken
            },
            data: addWorkType,
        }

        try {
            console.log("add work type")
            const result = await axios(config)
            if (result.status === 200) {
                this.state.currentWorkTypes.push(addWorkType)
                this.setState(this.state)
            }
        } catch (e) {
            console.log("axio err: ", e)
        }
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

    firstTrainSelect = (e) => {
        console.log('first train select')
        this.firstTrainChecked = e.target.checked
    }

    secondTrainSelect = (e) => {
        console.log('second train select')
        this.secondTrainChecked = e.target.checked
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
            url: process.env.REACT_APP_GET_WORK_TYPE_URL,
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
                <form>
                    <Grid p={2} container wrap='nowrap' alignItems="center" justify="center" direction="row">
                        <Grid item>
                            <TextField
                                required
                                id="worktype-required"
                                label="作业类别"
                                defaultValue=""
                                placeholder="设置作业类别名称"
                                variant="filled"
                                inputRef={this.workClass}
                            />

                            <TextField
                                style={{ marginLeft: "1rem", width: "15rem" }}
                                required
                                id="workcontent-required"
                                label="操作项目"
                                defaultValue=""
                                placeholder="多个操作项目内容请用‘,’隔开"
                                variant="filled"
                                inputRef={this.projects}
                            />
                        </Grid>
                        <Grid item style={{ marginLeft: "1rem" }}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox name="firstTrainning" />} label="初训"
                                    onChange={this.firstTrainSelect} />
                                <FormControlLabel control={<Checkbox name="secondTrainning" />} label="复训"
                                    onChange={this.secondTrainSelect}
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item>
                            <Button variant="contained" color="primary" style={{
                                backgroundColor: "green",
                                margin: "5px"
                            }}
                                onClick={this.handleSubmit}
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