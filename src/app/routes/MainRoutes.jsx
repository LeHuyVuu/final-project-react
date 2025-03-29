import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageNotFound from '../layouts/PageNotFound/PageNotFound'
import RootLayout from '../layouts/RootLayout'
import Cart from '../pages/Cart/Cart'
import Home from '../pages/Home/Home'



const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path='*' element={<PageNotFound/>} />
                    <Route path='/cart' element={<Cart/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes
