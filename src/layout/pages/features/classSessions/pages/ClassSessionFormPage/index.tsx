import { Link, useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../../../../components/FormInput';
import Loading from '../../../../../../components/Loading';
import Toast from '../../../../../../components/Toast';
import './styles.css'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { isRequired } from '../../../../../../utils/validate';
import { createClassSession, getClassSessionById, updateClassSession } from '../../../../../../services/classSession-service';
import type { CreateClassSessionRequest } from '../../../../../../types/classSession';
import type { SubjectResponse } from '../../../../../../types/subject';
import type { TeacherResponse } from '../../../../../../types/teachers';
import FormSelect from '../../../../../../components/FormSelect';
import { getTeachers } from '../../../../../../services/teacher-service';
import { getSubjects } from '../../../../../../services/subject-service';

export default function ClassSessionForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loadingForm, setLoadingForm] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    const [teachers, setTeachers] = useState<TeacherResponse[]>([]);
    const [subjects, setSubjects] = useState<SubjectResponse[]>([]);

    const [form, setForm] = useState<CreateClassSessionRequest>({
        title: "",
        subjectId: "",
        initialDate: "",
        finalDate: "",
        teacherId: ""
    });

    const [errors, setErrors] = useState({
        title: "",
        subjectId: "",
        initialDate: "",
        finalDate: "",
        teacherId: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const newValue = value;

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
                await updateClassSession(Number(id), form);
                setToastMessage("ClassSession updated successfully!");
            } else {
                await createClassSession(form);
                setToastMessage("ClassSession created successfully!");
            }
            setToastType('success');
            setShowToast(true);

            setTimeout(() => {
                navigate("/class-sessions");
            }, 1500);
        } catch (err) {
            console.error(err);
            setToastMessage("Error saving class session. Please try again.");
            setToastType('error');
            setShowToast(true);
            setLoadingSave(false);
        }
    };

    const validate = () => {

        const newErrors = {
            title: "",
            subjectId: "",
            initialDate: "",
            finalDate: "",
            teacherId: ""
        };

        if (!isRequired(form.title)) {
            newErrors.title = "Título é obrigatório"
        }

        if (!isRequired(form.initialDate)) {
            newErrors.initialDate = "Data inicial é obrigatória"
        }

        if (!isRequired(form.finalDate)) {
            newErrors.finalDate = "Data final é obrigatória"
        }

        if (!isRequired(String(form.subjectId))) {
            newErrors.subjectId = "Matéria é obrigatória"
        }

        if (!isRequired(String(form.teacherId))) {
            newErrors.teacherId = "Professor é obrigatório"
        }

        setErrors(newErrors);

        return Object.values(newErrors).every(e => e === "")
    }

    useEffect(() => {
        async function fetchOptions() {
            try {
                const teachersData = await getTeachers({ page: 0, size: 1000 });
                const subjectsData = await getSubjects({});

                setTeachers(teachersData.content);
                setSubjects(subjectsData);
            } catch (err) {
                console.error(err);
            }
        }

        fetchOptions();
    }, []);

    useEffect(() => {
        async function fetchClassSession() {
            if (!id) return;

            try {
                setLoadingForm(true);
                const data = await getClassSessionById(Number(id));
                setForm({
                    title: data.title,
                    subjectId: data.subject.id,
                    initialDate: data.initialDate,
                    finalDate: data.finalDate,
                    teacherId: data.teacher.id
                });
                setLoadingForm(false);
            } catch (err) {
                console.error(err);
                setToastMessage("Error loading class session data. Please try again.");
                setToastType('error');
                setShowToast(true);
                setLoadingForm(false);
            }
        }
        fetchClassSession();
    }, [id]);


    if (loadingForm) {
        return (
            <div className="cp-teacher-form">
                <div className='cp-form-title cp-mb20'>
                    Class Session Information
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
                            navigate("/class-sessions");
                        }
                    }}
                />
            )}
            <div className="cp-teacher-form">
                <div className='cp-form-title cp-mb20'>
                    ClassSession Information
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='cp-form-inputs'>
                        <div className='cp-form-inputs-group cp-mb20'>

                            <FormInput
                                label='Title'
                                type='text'
                                placeholder='Enter Title'
                                name='title'
                                value={form.title}
                                onChange={handleChange}
                                error={errors.title}
                            />

                        </div>
                        <div className='cp-form-inputs-group'>

                            <FormInput
                                label='Initial Date'
                                type='date'
                                placeholder='Enter Initial Date'
                                name='initialDate'
                                value={form.initialDate}
                                onChange={handleChange}
                                error={errors.initialDate}
                            />

                            <FormInput
                                label='Final Date'
                                type='date'
                                placeholder='Enter Final Date'
                                name='finalDate'
                                value={form.finalDate}
                                onChange={handleChange}
                                error={errors.finalDate}
                            />
                        </div>

                        <div className='cp-form-inputs-group'>
                            <FormSelect
                                label="Teacher"
                                name="teacherId"
                                value={String(form.teacherId)}
                                onChange={(e) =>
                                    setForm(prev => ({
                                        ...prev,
                                        teacherId: Number(e.target.value)
                                    }))
                                }
                                options={teachers}
                                getLabel={(t) => t.name}
                                getValue={(t) => t.id}
                                placeholder="Select a teacher"
                                error={errors.teacherId}
                            />

                            <FormSelect
                                label="Subject"
                                name="subjectId"
                                value={form.subjectId || ""}
                                onChange={(e) => {
                                    const selectedId = e.target.value;
                                    console.log("Selecionou a matéria ID:", selectedId); // Debug crucial
                                    setForm(prev => ({
                                        ...prev,
                                        subjectId: selectedId === "" ? "" : Number(selectedId)
                                    }));
                                }}
                                options={subjects}
                                getLabel={(s) => s.name}
                                getValue={(s) => s.id}
                                placeholder="Select a subject"
                                error={errors.subjectId}
                            />
                        </div>
                    </div>

                    <div className="cp-form-actions">
                        <Link to='/class-sessions'>
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