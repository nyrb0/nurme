import { useState } from 'react';
import './components/styles/App.scss';
import GlobalPage from './components/PAGES/GlobalPages/GlobalPage';

function App() {
    return (
        <div className='App'>
            <div className='Inner_App'>
                <GlobalPage />
            </div>
        </div>
    );
}

export default App;
