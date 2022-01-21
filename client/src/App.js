import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './css/App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Messages from './pages/Messages'
import Bookmarks from './pages/Bookmarks'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
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
                            <Route path='/account/:username' element={<Account />}></Route>
                        </Routes>
                    </div>
                    <Search />
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App;
