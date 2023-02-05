import React from 'react'
import {
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
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

class WorkTypeSetting extends React.Component {
    constructor() {
        super()
    }

    handleSubmit = () => {

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Grid container wrap='nowrap' alignItems="center" justify="center" direction="row">
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
                    <Grid ite style={{ marginLeft: "1rem" }}>
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

        )
    }
}

export default WorkTypeSetting