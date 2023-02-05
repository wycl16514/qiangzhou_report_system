import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from "@mui/material"
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard'
import QiangZhouSidebar from './scenes/global/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Team from "./scenes/team"
import Login from "./scenes/login/login"
import Contacts from "./scenes/contacts"
import WorkType from "./scenes/work_type"

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <div className="app">
          <QiangZhouSidebar />
          <main className='content'>
            <Topbar></Topbar>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/team" element={<Team />}></Route>
              <Route path="/contacts" element={<Contacts />}></Route>
              <Route path="/work_type" element={<WorkType />}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  )
}

export default App;
