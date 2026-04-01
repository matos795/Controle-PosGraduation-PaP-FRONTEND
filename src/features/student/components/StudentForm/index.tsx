import { Link } from 'react-router-dom';
import FormInput from '../../../../components/FormInput';
import './styles.css'

export default function StudentForm() {
    return (
        <>
            <div className="cp-student-form">
                <div className='cp-form-title cp-mb20'>
                    Student Information
                </div>

                <div className='cp-form-inputs'>
                    <div className='cp-form-inputs-group cp-mb20'>
                        <FormInput label='Full Name' type='text' placeholder='Enter full name' />
                        <FormInput label='Email' type='email' placeholder='Enter email address' />
                    </div>
                    <div className='cp-form-inputs-group'>
                        <FormInput label='Date of Birth' type='date' placeholder='Select date' />
                        <FormInput label='Phone Number' type='text' placeholder='Enter phone number' />
                    </div>
                </div>

                <div className="cp-form-actions">
                    <Link to='/students'>
                        <button type="button" className="cp-btn cp-btn-secondary">
                            Cancel
                        </button>
                    </Link>

                    <button type="submit" className="cp-btn cp-btn-primary">
                        Add Student
                    </button>
                </div>
            </div>
        </>
    );
}