import styled from 'styled-components'
import UserContext from '../../contexts/UserContext'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import check from '../../assets/check.svg'
import uncheck from '../../assets/uncheck.png'

export default function PastDayPage() {
    const { historyData, loginData, setMenuVisible, setLoginData } = useContext(UserContext);
    const { pastDay } = useParams();

    useEffect(() => setMenuVisible(true), []);  

    useEffect(() => {
        if (!loginData.token && localStorage.getItem('user')) {
            setLoginData(JSON.parse(localStorage.getItem('user')));
        }
    }, [])

    const thisDay = historyData
        .filter(elm => elm.day === pastDay.replace(/(\d{2})-(\d{2})-(\d{4})/, '$1/$2/$3'))[0];

    return (
        <PastDayPageStyled>
            <h1>History {thisDay && thisDay.day}</h1>
            <div>
                {thisDay && thisDay.habits.map((elm, idx) => (
                    <CardHistory habit={elm.name} isDone={elm.done} key={idx} />
                ))}
            </div>
        </PastDayPageStyled>
    )
}

function CardHistory({ habit, isDone }) {
    return (
        <CardHistoryStyled $isDone={isDone} >
            <h2>{habit}</h2>
            <div>
                <img src={isDone ? check : uncheck} />
            </div> 
        </CardHistoryStyled>
    )
}

const CardHistoryStyled = styled.div`
    & > div {
        background-color: ${props => props.$isDone ? '#09ff00' : '#ff0000'};
        height: 45px;
        width: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & img {
        color: white !important;
        height: 35px;
        width: 35px;
    }

    & h2 {
        font-weight: 400;
        color: #474747;
    }
`

const PastDayPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding: 92px 8% 112px 8%;
    max-width: 100%;
    min-height: 100vh;
    justify-content: flex-start;
    align-items: center;
    background-color: #ebebeb;
    height: min-content;

    & h1 {
        width: 100%;
        max-width: 100%;
    }

    &>div {
        width: 100%;
        max-width: 100%;
        margin-top: 20px;
    }

     &>div>div {
        width: 100%;
        max-width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: white;
        margin-bottom: 8px;
        height: 60px;
        align-items: center;
        padding: 5px 4%;
        border-radius: 5px;
    }
`