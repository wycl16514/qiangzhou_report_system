import { useState } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { tokens } from '../../theme'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { CallReceivedOutlined } from '@mui/icons-material';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <MenuItem active={selected === title} style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)} icon={icon}>
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    )
}

const QiangZhouSidebar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState("Dashboard")
    return (
        <Box sx={{
            "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`,
            },
            "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover": {
                color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
                color: "#6870fa !important",
            },
        }}>
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMINIS
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {
                        !isCollapsed && (
                            <Box mb="25px">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <img alt="profile-user"
                                        widtd="100px"
                                        height="100px"
                                        src={'../../assets/user.png'}
                                        style={{ cursor: "pointer", borderRadius: "50%" }}
                                    />

                                </Box>
                                <Box textAlign="center">
                                    <Typography
                                        variant="h2"
                                        color={colors.grey[100]}
                                        fontWeight="bold" sx={{ m: "10px 0 0 0" }}>小何</Typography>
                                    <Typography variant="h5" color={colors.greenAccent[500]}>管理员</Typography>
                                </Box>
                            </Box>
                        )
                    }
                    {/* Menu items */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        ></Item>

                        <Item title="Manage Team"
                            to="/"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        ></Item>

                        <Item title="Contacts Information"
                            to="/contacts"
                            icon={<ContactOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        ></Item>

                        <Item title="Invoices Balances"
                            to="/invoice"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        ></Item>

                        <Item title="Profile Form"
                            to="/form"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        ></Item>

                        <Item title="Calendar"
                            to="/calendar"
                            icon={<CalendarTodayOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        ></Item>

                        <Item title="Bar chart"
                            to="/bar"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        ></Item>

                        <Item title="Pie Chart"
                            to="/pie"
                            icon={<PieChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        ></Item>

                        <Item title="Line Chart"
                            to="/line"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        ></Item>

                        <Item title="Geography Chart"
                            to="/geo"
                            icon={<MapOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        ></Item>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}

export default QiangZhouSidebar;