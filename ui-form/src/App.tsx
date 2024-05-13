import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Form';
import Responses from './Responses';

// Define the structure of your data using an interface
interface Data {
  id: number;
  name: string;
  description: string;
}

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/responses" element={<Responses />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
