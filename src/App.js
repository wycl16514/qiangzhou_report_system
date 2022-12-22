import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from "@mui/material"
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard'
import QiangZhouSidebar from './scenes/global/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Team from "./scenes/team"
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
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/team" element={<Team />}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  )
}

export default App;
