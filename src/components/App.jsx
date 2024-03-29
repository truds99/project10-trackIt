import UserContext from "../contexts/UserContext"
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import HabitsPage from './HabitsPage/HabitsPage'
import TopMenu from './TopMenu'
import Bottom from './Bottom'
import TodayPage from './TodayPage/TodayPage'
import HistoryPage from './HistoryPage/HistoryPage'
import PastDayPage from "./HistoryPage/PastDayPage"
import PrivatePage from "./PrivatePage"
import { getTodayHabits, getHabits, getHistory } from '../services/services'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { useState, useEffect } from "react"

export default function App() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [loginData, setLoginData] = useState('');
    const [todayData, setTodayData] = useState([]);
    const [todayDone, setTodayDone] = useState(0);
    const [myHabits, setMyHabits] = useState('');
    const [shouldGetHabits, setShouldGetHabits] = useState(true);
    const [historyData, setHistoryData] = useState([]);
    const [showLogout, setShowLogout] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    useEffect(() => {
        if (shouldGetHabits && loginData.token) {
            const promise = getHabits(loginData.token);
            promise
                .then(res => {
                    setMyHabits(res.data);
                    setShouldGetHabits(false);
                })
                .catch(() => alert("error getting habits"));
        }
    }, [shouldGetHabits, loginData])

    useEffect(() => {
        setShouldGetHabits(true);
        setShowLogout(false);
    }, [loginData])

    useEffect(() => {
        if (loginData) {
            const promise = getTodayHabits(loginData.token);
            promise
                .then(res => setTodayData(res.data))
                .catch(() => alert("error getting today's data"))
        }
    }, [loginData, myHabits, todayDone]);

    useEffect(() => {
        if (todayData.length) {
            setTodayDone(todayData.reduce((acc, elm) => elm.done ? acc + 1 : acc, 0));
        }
    }, [todayData, loginData])

    useEffect(() => {
        if (loginData) {
            const promise = getHistory(loginData.token);
            promise
                .then(res => setHistoryData(res.data))
                .catch(() => alert("error getting history"))
        }
    }, [loginData])

    return (
        <BrowserRouter>
            <GlobalStyle />
            <UserContext.Provider value={{
                formData, setFormData, 
                menuVisible, setMenuVisible, 
                loginData, setLoginData,
                todayData, setTodayData,
                todayDone, setTodayDone,
                myHabits, setMyHabits,
                shouldGetHabits, setShouldGetHabits,
                historyData, setHistoryData,
                showLogout, setShowLogout
            }}>
            <TopMenu />
            <Bottom />
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/habits' element={<PrivatePage><HabitsPage /></PrivatePage>} />
                <Route path='/today' element={<PrivatePage><TodayPage /></PrivatePage>} />
                <Route path='/history' element={<PrivatePage><HistoryPage /></PrivatePage>} />
                <Route path='/history/:pastDay' element={<PrivatePage><PastDayPage /></PrivatePage>} />
            </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

const GlobalStyle = createGlobalStyle`

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
    }


    h1 {
        color: #126BA5;
        font-size: 23px;
        font-weight: 400;
        min-height: 26px;
        text-align: left;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    * {
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
    }
    body {
        line-height: 1;
        max-width: 100%;
        font-family: "Lexend Deca", sans-serif;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    ::placeholder{
        font-family: "Lexend Deca", sans-serif;
    }
    :focus {
        font-family: "Lexend Deca", sans-serif;
        outline: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

`

