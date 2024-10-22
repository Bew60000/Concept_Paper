import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const State04_ModalDetailSummaryResults = ({ isOpen, closeModal, selectedForm, studentData, teacherData, }) => {
    const modalRef = useRef(null);
    const [evaluationScores, setEvaluationScores] = useState([]);

    const [formreport, setFormreport] = useState({
        report1: '',
        report2: '',
        report3: '',
        report4: '',
        report5: ''
    });


    useEffect(() => {
        if (selectedForm) {
            axios.get(`http://localhost:8080/get_evaluate_result/${selectedForm.curriculum_id}`)
                .then(response => {
                    setEvaluationScores(response.data);
                })
                .catch(error => {
                    console.error('Error fetching evaluation result data:', error);
                });
        }
    }, [selectedForm]);




    const UpdateStatus = (curriculum_id, newStatus) => {
        axios.put(`http://localhost:8080/update_Status/${curriculum_id}`, { status: newStatus })
            .then(response => {
                console.log('Status updated successfully:', response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };


    // Check if the user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    let username = ''; // Initial empty username
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser); // Convert JSON string to object
        username = user.username; // Get username from the logged-in user
    }




    const handleChange = (e, { name, value }) => {
        setFormreport(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };



    const UpdateEvaluateStatus = (status_evaluate, evaluato_id, curriculum_id) => {
        axios.put('http://localhost:8080/test/update_evaluate_status', { status_evaluate, evaluato_id, curriculum_id })
            .then(response => {
                console.log('Evaluate status updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating evaluate status:', error);
            });
    };



    // เพิ่มการปิด modal เมื่อคลิกนอก modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeModal]);

    if (!isOpen || !selectedForm) return null;

    const averageCalculatedScore = Math.round(evaluationScores.reduce((total, score) => {
        const totalScore = (score.aspect_1 + score.aspect_2 + score.aspect_3 + score.aspect_4 + score.aspect_5);
        const calculatedScore = (totalScore * 20) / 5;
        return total + calculatedScore;
    }, 0) / 3);


    const handleSubmit = (e) => {
        e.preventDefault();

        // Include curriculum_id from selectedForm in the assignData
        const dataToSubmit = {
            ...formreport,
            curriculum_id: selectedForm.curriculum_id,
            total_score: averageCalculatedScore,
            evaluato_id: username // Add curriculum_id to the submitted data
        };

        axios.post('http://localhost:8080/evaluation_results', dataToSubmit)
            .then(response => {
                // window.location.reload();
                console.log('Data submitted successfully:', response.data);
                UpdateStatus(selectedForm.curriculum_id, 'สรุปผลประเมินเสร็จสิ้น')
                UpdateEvaluateStatus('สรุปผลประเมินเสร็จสิ้น', username, selectedForm.curriculum_id)
                window.location.reload();
            })
            .catch(error => {
                console.error('Error submitting data:', error);
            });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div ref={modalRef} className="bg-white p-6 rounded-lg w-5/6 rounded-full max-h-[650px] min-h-[650px] overflow-y-auto mt-16">
                {evaluationScores.map((score, index) => (
                    <div className='text-start p-5 pt-2 mt-5' key={index}>

                        <div className='flex justify-between items-center px-16 mb-6 mx-auto w-11/12'>
                            <div className="text-start">
                                <h2 className="font-bold m-0 text-blue-900"> หลักสูตร{selectedForm.majorthai}</h2>
                                <p className='text-gray-500 font-bold m-0'>"{selectedForm.majoreng}"</p>
                            </div>

                            <div className='items-center'>
                                <div className={`text-center font-bold mr-4 ${score.total_score > 70 ? 'text-blue-800' : 'text-red-800'}`}>
                                    <p className="text-md m-1">{score.total_score > 70 ? 'ผ่านเกณฑ์การประเมิน' : 'ไม่ผ่านเกณฑ์การประเมิน'}</p>
                                </div>
                                <div className={`text-center rounded-xl p-4 py-5 font-bold ${score.total_score > 70 ? 'bg-blue-700 text-white' : 'bg-red-700 text-white'} px-12`}>
                                    <p className="text-md m-1">{score.total_score} / 100</p>
                                </div>
                            </div>
                        </div>


                        <hr className='border-gray-300 w-11/12 mx-auto' />


                        <div className='w-5/6 mx-auto mt-8'>
                            <p className='text-gray-800 text-2xl font-bold mt-5'>ผลการประเมินคำขอพิจารณาเปิดขอเปิดหลักสูตรใหม่</p>
                            <p className='font-bold mb-0 text-blue-800'>การประเมินด้านที่ 1 : กลุ่มผู้เรียนเป้าหมาย</p>
                            <p className="font-semibold">{score.report1}</p>
                        </div>

                        <div className='w-5/6 mx-auto mt-8'>
                            <p className='font-bold mb-0 text-blue-800 mt-8'>การประเมินด้านที่ 2 : ความเหมาะสมและความทันสมัยของหลักสูตร</p>
                            <p className="font-semibold">{score.report2}</p>
                        </div>

                        <div className='w-5/6 mx-auto mt-8'>
                            <p className='font-bold mb-0 text-blue-800 mt-8'>การประเมินด้านที่ 3 : ความเชื่อมโยงกับหลักสูตรที่มีอยู่ในมหาวิทยาลัย</p>
                            <p className="font-semibold">{score.report3}</p>
                        </div>

                        <div className='w-5/6 mx-auto mt-8'>
                            <p className='font-bold mb-0 text-blue-800 mt-8'>การประเมินด้านที่ 4 : ความร่วมมือกับองค์กรภาครัฐ เอกชน และสถาบันการศึกษาต่างประเทศ</p>
                            <p className="font-semibold">{score.report4}</p>
                        </div>

                        <div className='w-5/6 mx-auto mt-8'>
                            <p className='font-bold mb-0 text-blue-800 mt-8'>การประเมินด้านที่ 5 : ประโยชน์ต่อสังคมและประเทศ</p>
                            <p className="font-semibold">{score.report5}</p>
                        </div>

                        <div className='w-5/6 mx-auto mt-8'>
                            <p className="">เวลาที่เสร็จสิ้น: {new Date(score.time_finish_evaluate).toLocaleDateString()}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div >
    );
};

export default State04_ModalDetailSummaryResults;
