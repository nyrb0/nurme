import { FC } from 'react'
import headerS from './Header.module.scss'
import Navigation from '../Navigation/Navigation'
import search from '../icons/search.png'
import user from '../icons/userIcon.png'
import { Link } from 'react-router-dom'
const Header:FC = () => {
    return (
        <header className={headerS.header}>
            <div className={headerS.innerHeader}>
                <div className={`${headerS.namesAnimeCinema}`}>
                    <Link to={'/right-now'}>Nur<span>me</span></Link>
                </div>
                <div className={headerS.menu}>
                    <Navigation/>
                </div>
                <div className={headerS.searchAndUser}>
                    <img src={search} alt="поиск" />
                    <img src={user} alt="" />
                </div>
                
            </div>
        </header>
    )
}

export default Header
