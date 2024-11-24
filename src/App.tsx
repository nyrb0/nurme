import './shared/styles/App.scss';
import { isVisibleContext } from './features/Context/Visible';
import './shared/styles/media.scss';
import { useState } from 'react';
import { menuContext } from './features/Context/Menu';
import BackGround from './widgets/components/BackGround/BackGround';
import { ThemeGlobal } from './features/Context/Theme';
import GlobalPage from './PAGES/GlobalPages/GlobalPage';

function App() {
    const [isVisible, setIsVisible] = useState(false);
    const [menu, setMenu] = useState(false);

    return (
        <>
            <ThemeGlobal>
                <BackGround />
                <isVisibleContext.Provider value={{ isVisible, setIsVisible }}>
                    <menuContext.Provider value={{ menu, setMenu }}>
                        <div className='App'>
                            <div className='inner_app'>
                                <GlobalPage />
                            </div>
                        </div>
                    </menuContext.Provider>
                </isVisibleContext.Provider>
            </ThemeGlobal>
        </>
    );
}

export default App;
