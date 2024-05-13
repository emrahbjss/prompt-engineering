import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import axios from 'axios';

interface FormData {
    role: string;
    task: string;
    format: string;
    tone: string;
    audience: string;
    scope: string;
    customRole?: string; // Optional field for custom role
}

const Form: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        role: '',
        task: '',
        format: '',
        tone: '',
        audience: '',
        scope: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://localhost:5000/generate', formData)
            .then(response => {
                navigate('/responses', { state: { responses: response.data } });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h1>Prompt Generator</h1>
                <p className="description">Please fill out the fields below to generate a high-quality prompt:</p>
                <h2 className="required-inputs">Required Inputs</h2>
                <label className="input-label">
                    <span>Role:</span>
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select a role</option>
                        <option value="Delivery Manager">Delivery Manager</option>
                        <option value="Business Analyst">Business Analyst</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="QA/Tester">QA/Tester</option>
                        <option value="Python Developer">Python Developer</option>
                        <option value="Java Developer">Java Developer</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="Data Engineer">Data Engineer</option>
                        <option value="Platform Engineer">Platform Engineer</option>
                        <option value="Systems Engineer">Systems Engineer</option>
                        <option value="Architect">Architect</option>
                        <option value="Designer">Designer</option>
                        <option value="Technical Writer">Technical Writer</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                {formData.role === 'Other' && (
                    <label className="input-label">
                        <span></span>
                        <input type="text" name="customRole" value={formData.customRole} onChange={handleChange} placeholder="Define your role" required />
                    </label>
                )}
                <label className="input-label">
                    <span>Task:</span>
                    <textarea name="task" value={formData.task} onChange={handleChange} placeholder="What task should the AI perform?" required />
                </label>
                <h2 className="optional-inputs">Optional Inputs</h2>
                <label className="input-label">
                    <span>Format:</span>
                    <textarea name="format" value={formData.format} onChange={handleChange} placeholder="What format should the output be in?" />
                </label>
                <label className="input-label">
                    <span>Tone:</span>
                    <textarea name="tone" value={formData.tone} onChange={handleChange} placeholder="What tone should the response have?" />
                </label>
                <label className="input-label">
                    <span>Audience:</span>
                    <textarea name="audience" value={formData.audience} onChange={handleChange} placeholder="Who is the intended audience?" />
                </label>
                <label className="input-label">
                    <span>Scope:</span>
                    <textarea name="scope" value={formData.scope} onChange={handleChange} placeholder="What is the scope of the response?" />
                </label>
                <button type="submit">Generate Prompt</button>
            </form>
        </div>
    );
};

export default Form;
