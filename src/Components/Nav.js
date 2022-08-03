import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import App from '../App';
import Download from './Download';

function Nav() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='download' element={<Download />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Nav;