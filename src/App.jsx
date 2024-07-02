import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './views/Home';
import ProductEditPage from './views/ProductEditPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NewProductAddPage from './views/NewProductAddPage';

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
          <Route path='/product/new' element={<NewProductAddPage/>}/>
          <Route path='/products' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductEditPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
