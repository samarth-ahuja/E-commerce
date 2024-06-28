import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './views/Home';
import ProductPage from './components/ProductPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/products' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
