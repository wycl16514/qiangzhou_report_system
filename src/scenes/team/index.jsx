import { Box, Typography, useTheme } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { mockDataTeam } from "../../data/mockData"
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"
import LockOpenSettingsOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import SecuritySettingsOutlinedIcon from "@mui/icons-material/SecurityOutlined"
import Header from "../../components/header"
import axios from 'axios'
import LoginService from "../../services/loginServices"
import { useState, useEffect } from 'react'

const getTeamData = async () => {
    const teamData = { error: 0, data: null }

    const loginInfo = LoginService.getInstance().getLoginInfo()
    console.log("team view login info: ", loginInfo)
    if (loginInfo === null) {
        console.log('get team data err, no login info')
        teamData['error'] = LoginService.ERR_NO_LOGIN_INFO
        return teamData
    }

    const config = {
        method: 'post',
        url: process.env.REACT_APP_TEAM_DATA_URL,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'authorization': loginInfo.accessToken
        },
        data: {
            phone: loginInfo.teamMember.phone_number,
        }
    }

    console.log("team manage url: ", process.env.REACT_APP_TEAM_DATA_URL)
    try {
        const result = await axios(config)
        if (result.status === 403) {
            console.log('get team data err, token invalid')
            teamData['error'] = LoginService.ERR_LOGIN_TOKEN_INVALID
            return teamData
        }

        teamData['data'] = result.data.teamData
    } catch (e) {
        console.log("axio err: ", e)
    }

    return teamData
}

const Team = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    useEffect(() => {
        async function fetchData() {
            const teamData = await getTeamData()
            console.log('getting team data: ', teamData)
        }
        fetchData()
    }, []);

    const columns = [{
        field: "id", headerName: "ID"
    },
    {
        field: "name", headerName: "姓名", flex: 1, cellClassName: "name-column--cell"
    },
    {
        field: "age", headerName: "年龄", type: "number", headerAlign: "left", align: "left"
    },
    {
        field: "phone", headerName: "电话", flex: 1,
    },
    {
        field: "email", headerName: "邮件", flex: 1,
    },
    {
        field: "access", headerName: "接入权限", flex: 1, renderCell: ({ row: { access } }) => {
            return (
                <Box width="60%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={
                        access === "admin" ? colors.greenAccent[600] : colors.greenAccent[700]
                    }
                    borderRadius="4px"
                >
                    {access === "admin" && <AdminPanelSettingsOutlinedIcon></AdminPanelSettingsOutlinedIcon>}
                    {access === "Manager" && <LockOpenSettingsOutlinedIcon></LockOpenSettingsOutlinedIcon>}
                    {access === "user" && <SecuritySettingsOutlinedIcon></SecuritySettingsOutlinedIcon>}
                    <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        access
                    </Typography>
                </Box >
            )
        }
    }
    ]
    return (
        <Box>
            <Header title="管理员" subtitle="管理员信息设置"></Header>
            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    broderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.bluecAccent[700],
                    borderBottom: "none"
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400]
                },
                "&. .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.bluecAccent[700]
                }
            }}>
                <DataGrid rows={mockDataTeam} columns={columns}>

                </DataGrid>
            </Box>
        </Box >
    )
}

export default Team;

