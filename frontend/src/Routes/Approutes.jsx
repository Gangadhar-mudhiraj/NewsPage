import MainLayout from '../layouts/MainLayout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import { Routes, Route, useLocation } from 'react-router-dom'
import GeneralNews from '../pages/GeneralNews'
import Intrests from '../pages/Intrests'
import CustomisedNews from '../pages/CustomisedNews'
import { useAuthContext } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import NotFound from '../pages/NotFound'

const Approutes = () => {
    // const location = useLocation()

    const location = useLocation()

    const PrivateRoute = ({ element }) => {
        sessionStorage.setItem('redirectAfterLogin', location.pathname);
        const { isAuthenticated } = useAuthContext()

        return isAuthenticated ? element : <Navigate to="/login" />
    }

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/' element={<GeneralNews />} />
                <Route path='personalized' element={<PrivateRoute element={< CustomisedNews />} />} />
                <Route path='interests' element={<PrivateRoute element={< Intrests />} />} />
                <Route path='*' element={<NotFound />} />

            </Route>
        </Routes>
    )
}

export default Approutes