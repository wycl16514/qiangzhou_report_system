import Header from "../../components/header"
import { Box } from '@mui/material'
const DashBoard = () => {
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard"></Header>
            </Box>
        </Box>
    )
}

export default DashBoard;