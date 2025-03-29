import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import Home from '../pages/Home/Home'
import PageNotFound from '../layouts/PageNotFound/PageNotFound'



const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path='*' element={<PageNotFound/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes
