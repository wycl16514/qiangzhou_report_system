import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from "@mui/material"
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard'
import Sidebar from './scenes/global/Sidebar'
import { Routes, Route } from 'react-router-dom'
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <div className="app">
          <Sidebar />
          <main className='content'>
            <Topbar></Topbar>
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  )
}

export default App;
