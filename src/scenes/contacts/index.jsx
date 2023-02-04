import { Box, Tooltip } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { mockDataContacts } from "../../data/mockData"

import Header from "../../components/header"
import axios from 'axios'
import LoginService from "../../services/loginServices"
import { useState, useEffect } from 'react'
import { useTheme } from "@emotion/react"

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

const Contacts = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "nationality",
            headerName: "民族",
            flex: 0.2,
        },
        {
            field: "idCard",
            headerName: "身份证号",
            flex: 2,
        },
        {
            field: "address",
            headerName: "地址",
            flex: 2,
            renderCell: (params: any) => (
                <Tooltip title={params.value} >
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: "education",
            headerName: "文化程度",
            flex: 0.5,
        },
        {
            field: "phone",
            headerName: "电话",
            flex: 2,
        },
        {
            field: "workPlace",
            headerName: "工作单位",
            flex: 2,
        },
        {
            field: "quality",
            headerName: "资格类型",
            flex: 1,
        },

        {
            field: "workClass",
            headerName: "作业类别",
            flex: 1,
        },
        {
            field: "project",
            headerName: "操作项目",
            flex: 1,
        },
        {
            field: "trainning",
            headerName: "培训类型",
            flex: 0.5,
        },
    ]
    return (
        <Box m="20px">
            <Header title="学员信息" subtitle="学员信息列表显示"></Header>
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
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.bluecAccent[700]
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                }
            }}>
                <DataGrid rows={mockDataContacts} columns={columns} components={{ Toolbar: GridToolbar }}>

                </DataGrid>
            </Box>
        </Box >
    )
}

export default Contacts;

