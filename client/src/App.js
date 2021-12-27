import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './css/App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './Pages/Home'
import Messages from './Pages/Messages'
import Bookmarks from './Pages/Bookmarks'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Search from './components/Search/Search'

import { AuthProvider } from './context/auth'

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className='app'>
                    <Navbar />
                    <div className='content'> 
                        <Routes>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/messages' element={<Messages />}></Route>
                            <Route path='/bookmarks' element={<Bookmarks />}></Route>
                            <Route path='/login' element={<Login />}></Route>
                            <Route path='/register' element={<Register />}></Route>
                        </Routes>
                    </div>
                    <Search />
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App;
