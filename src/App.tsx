import './components/styles/App.scss';
import GlobalPage from './components/PAGES/GlobalPages/GlobalPage';
import './components/styles/App.scss';
import { isVisibleContext } from './Context/Visible';
import { useState } from 'react';

function App() {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <isVisibleContext.Provider value={{ isVisible, setIsVisible }}>
            <div className='App'>
                <div className='Inner_App'>
                    <GlobalPage />
                </div>
            </div>
        </isVisibleContext.Provider>
    );
}

export default App;
