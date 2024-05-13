import React from 'react';
import './Responses.css';
import { useLocation, Location } from 'react-router-dom';

interface LocationState {
    responses: string[];
}

const Responses: React.FC = () => {
    const location = useLocation() as Location<LocationState>;
    const { responses } = location.state;

    return (
        <div className="response-container">
            {responses.map((response: string, index: number) => (
                <div key={index} className="response-box">
                    <h2>Prompt {index + 1}</h2>
                    <p>{response}</p>
                </div>
            ))}
        </div>
    );
};

export default Responses;
