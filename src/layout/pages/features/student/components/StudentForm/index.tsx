import { Link, useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../../../../components/FormInput';
import Loading from '../../../../../../components/Loading';
import Toast from '../../../../../../components/Toast';
import './styles.css'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { createStudent, getStudentById, updateStudent } from '../../../../../../services/student-service';
import type { CreateStudentRequest } from '../../../../../../types/student';
import { formatPhone } from '../../../../../../utils/format';
import { isRequired } from '../../../../../../utils/validate';

export default function StudentForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loadingForm, setLoadingForm] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    const [form, setForm] = useState<CreateStudentRequest>({
        name: "",
        email: "",
        address: "",
        phone: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let newValue = value;

        if (name == 'phone') {
            newValue = formatPhone(value);
        }

        setForm(prev => ({
            ...prev,
            [name]: newValue
        }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = validate();

        if (!isValid) return;

        try {
            setLoadingSave(true);
            if (id) {
                await updateStudent(Number(id), form);
                setToastMessage("Student updated successfully!");
            } else {
                await createStudent(form);
                setToastMessage("Student created successfully!");
            }
            setShowToast(true);
            
            setTimeout(() => {
                navigate("/students");
            }, 1500);
        } catch (err) {
            console.error(err);
            setToastMessage("Error saving student. Please try again.");
            setToastType('error');
            setShowToast(true);
            setLoadingSave(false);
        }
    };

    const validate = () => {

        const newErrors = {
            name: "",
            email: "",
            address: "",
            phone: ""
        };

        if (!isRequired(form.name)) {
            newErrors.name = "Nome é obrigatório"
        }

        if (!isRequired(form.email)) {
            newErrors.email = "Email é obrigatório"
        }

        setErrors(newErrors);

        return Object.values(newErrors).every(e => e === "")
    }

    useEffect(() => {
        async function fetchStudent() {
            if (!id) return;

            try {
                setLoadingForm(true);
                const data = await getStudentById(Number(id));
                setForm({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                });
                setLoadingForm(false);
            } catch (err) {
                console.error(err);
                setToastMessage("Error loading student data. Please try again.");
                setToastType('error');
                setShowToast(true);
                setLoadingForm(false);
            }
        }
        fetchStudent();
    }, [id]);


    if (loadingForm) {
        return (
            <div className="cp-student-form">
                <div className='cp-form-title cp-mb20'>
                    Student Information
                </div>
                <Loading />
            </div>
        );
    }

    return (
        <>
            {showToast && (
                <Toast 
                    message={toastMessage} 
                    type={toastType} 
                    duration={toastType === 'success' ? 1500 : 3000}
                    onClose={() => {
                        setShowToast(false);
                        if (toastType === 'success') {
                            navigate("/students");
                        }
                    }} 
                />
            )}
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
                                error={errors.name}
                            />

                            <FormInput
                                label='Email'
                                type='email'
                                placeholder='Enter email address'
                                name='email'
                                value={form.email}
                                onChange={handleChange}
                                error={errors.email}
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
                                error={errors.phone}
                            />

                            <FormInput
                                label='Address'
                                type='text'
                                placeholder='Enter address'
                                name='address'
                                value={form.address}
                                onChange={handleChange}
                                error={errors.address}
                            />

                        </div>
                    </div>

                    <div className="cp-form-actions">
                        <Link to='/students'>
                            <button type="button" className="cp-btn cp-btn-secondary">
                                Cancel
                            </button>
                        </Link>

                        <button type="submit" className="cp-btn cp-btn-primary" disabled={loadingSave}>
                            {loadingSave ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}