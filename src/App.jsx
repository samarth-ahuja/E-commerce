import './App.css'
import { BrowserRouter as Router,Routes,Route,Link,useNavigate } from 'react-router-dom'
import Home from './components/Home';
import ProductPage from './components/ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/products' element={<Home/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
