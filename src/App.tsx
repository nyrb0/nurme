import './components/styles/App.scss';
import GlobalPage from './components/PAGES/GlobalPages/GlobalPage';
import './components/styles/App.scss';
import { isVisibleContext } from './Context/Visible';
import './components/styles/media.scss';
import { useState } from 'react';
import { menuContext } from './Context/Menu';

function App() {
    const [isVisible, setIsVisible] = useState(false);
    const [menu, setMenu] = useState(false);

    return (
        <isVisibleContext.Provider value={{ isVisible, setIsVisible }}>
            <menuContext.Provider value={{ menu, setMenu }}>
                <div className='App'>
                    <div className='Inner_App'>
                        <GlobalPage />
                    </div>
                </div>
            </menuContext.Provider>
        </isVisibleContext.Provider>
    );
}

export default App;
