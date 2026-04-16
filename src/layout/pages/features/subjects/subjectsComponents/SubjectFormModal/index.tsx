import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import './styles.css'
import type { CreateSubjectRequest, SubjectResponse } from '../../../../../../types/subject';
import Modal from '../../../../../../components/Modal';
import Loading from '../../../../../../components/Loading';
import { isRequired } from '../../../../../../utils/validate';
import { createSubject, updateSubject } from '../../../../../../services/subject-service';
import FormInput from '../../../../../../components/FormInput';
import { useNavigate } from 'react-router-dom';

type Props = {
    title: string;
    open: boolean;
    subject: SubjectResponse | null;
    setEditingSubject: () => void;
    onClose: () => void;
    setToastMessage: (message: string) => void;
    setToastType: (type: 'success' | 'error') => void;
    setShowToast: (show: boolean) => void;
};

export default function SubjectFormModal({ title, open, subject, setEditingSubject, onClose, setToastMessage, setToastType, setShowToast }: Props) {

    const navigate = useNavigate();

    const [loadingForm, setLoadingForm] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);

    const [form, setForm] = useState<CreateSubjectRequest>({
        name: "",
        description: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        description: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const validate = () => {

        const newErrors = {
            name: "",
            description: ""
        };

        if (!isRequired(form.name)) {
            newErrors.name = "Nome é obrigatório"
        }

        setErrors(newErrors);

        return Object.values(newErrors).every(e => e === "")
    }

    useEffect(() => {
        async function fetchStudent() {
            if (!subject) return;

            try {
                setForm({
                    name: subject.name,
                    description: subject.description
                });
            } catch (err) {
                console.error(err);
                setToastMessage("Error loading subject data. Please try again.");
                setToastType('error');
                setShowToast(true);
                setLoadingForm(false);
                onClose();
            }
        }
        fetchStudent();
    }, [subject, setToastMessage, setToastType, setShowToast, setLoadingForm, setEditingSubject, onClose]);

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = validate();

        if (!isValid) return;

        try {
            setLoadingSave(true);
            if (subject) {
                await updateSubject(subject.id, form);
                setToastType('success');
                setToastMessage("Subject updated successfully!");
            } else {
                await createSubject(form);
                setToastType('success');
                setToastMessage("Subject created successfully!");
            }
            setShowToast(true);
            setLoadingSave(false);
            setForm({
                name: "",
                description: ""
            });

            onClose();
            navigate("/subjects");

        } catch (err) {
            console.error(err);
            setToastMessage("Error saving subject. Please try again.");
            setToastType('error');
            setShowToast(true);
            setLoadingSave(false);
            setForm({
                name: "",
                description: ""
            });
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>

            <div className="cp-modal-header">
                {title}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="cp-modal-body">
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
                        label='Description'
                        type='text'
                        placeholder='Enter description'
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                        error={errors.description}
                    />
                </div>

                <div className="cp-modal-footer">
                    <button type='button' className="cp-btn cp-btn-modal" onClick={onClose}>
                        Cancel
                    </button>

                    <button type="submit" className="cp-btn cp-btn-primary" disabled={loadingSave}>
                        {loadingSave ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}