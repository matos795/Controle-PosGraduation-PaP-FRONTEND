import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../../../components/FormInput';
import './styles.css'
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { createStudent } from '../../services/student-service';
import type { CreateStudentRequest } from '../../types/student';

export default function StudentForm() {

    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(false);

    const [form, setForm] = useState<CreateStudentRequest>({
        name: "",
        email: "",
        address: "",
        phone: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            await createStudent(form);
            setLoading(false);
            navigate("/students");
        } catch (err) {
            console.error(err);
            alert("Erro ao Cadastrar");
            setLoading(false);
        }
    };

    return (
        <>
            <div className="cp-student-form">
                <div className='cp-form-title cp-mb20'>
                    Student Information
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='cp-form-inputs'>
                        <div className='cp-form-inputs-group cp-mb20'>

                            <FormInput
                                label='Full Name'
                                type='text'
                                placeholder='Enter full name'
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                            />

                            <FormInput 
                            label='Email' 
                            type='email' 
                            placeholder='Enter email address'
                            name='email'
                                value={form.email}
                                onChange={handleChange}
                                 />

                        </div>
                        <div className='cp-form-inputs-group'>

                            <FormInput 
                            label='Phone Number' 
                            type='text' 
                            placeholder='Enter phone number'
                            name='phone'
                                value={form.phone}
                                onChange={handleChange}
                                 />

                            <FormInput 
                            label='Address' 
                            type='text' 
                            placeholder='Enter address'
                            name='address'
                                value={form.address}
                                onChange={handleChange} />
                        </div>
                    </div>

                    <div className="cp-form-actions">
                        <Link to='/students'>
                            <button type="button" className="cp-btn cp-btn-secondary">
                                Cancel
                            </button>
                        </Link>

                        <button type="submit" className="cp-btn cp-btn-primary" disabled={loading}>
                            {loading ? "Adding..." : "Add Student"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}