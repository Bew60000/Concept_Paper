import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import {
    FormTextArea,
    FormRadio,
    FormGroup,
    Form,
} from 'semantic-ui-react';

const State03_ModalAsSummaryResults = ({ isOpen, closeModal, selectedForm, studentData, teacherData, UpdateStatus }) => {
    const modalRef = useRef(null);
    const [evaluationScores, setEvaluationScores] = useState([]);

    useEffect(() => {
        if (selectedForm) {
            axios.get(`http://localhost:8080/test/evaluation_score_report/${selectedForm.curriculum_id}`)
                .then(response => {
                    setEvaluationScores(response.data);
                })
                .catch(error => {
                    console.error('Error fetching evaluation score data:', error);
                });
        }
    }, [selectedForm]);

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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div ref={modalRef} className="bg-white p-6 rounded-lg w-5/6 rounded-full max-h-[650px] overflow-y-auto mt-16">
                {selectedForm && (
                    <div className='text-gray-700'>

                        {/* <hr className='border-gray-300 w-3/4 mx-auto' /> */}

                        <div className="text-start p-5 pt-2 mt-5">

                            <div className="grid grid-cols-12 gab-1 items-center px-12">
                                <div className="col-span-12 text-start p-5">
                                    <h2 className="font-bold m-0"> ผลการประเมินหลักสูตร{selectedForm.majorthai}</h2>
                                    <p className='text-gray-500 font-bold m-0'>"{selectedForm.majoreng}"</p>
                                </div>
                            </div>

                            <hr className='border-gray-300 w-11/12 mx-auto' />

                            {evaluationScores.map((score, index) => {

                                const totalScore = (score.aspect_1 + score.aspect_2 + score.aspect_3 + score.aspect_4 + score.aspect_5);
                                const calculatedScore = (totalScore * 20) / 5;

                                return (
                                    <div className='w-3/4 mx-auto' key={index}>
                                        <div className="grid grid-cols-12 gap-4 items-center mb-3  text-gray-700 ">
                                            <div className="col-span-6 text-start ml-16">
                                                <p className="text-md m-1"></p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1"></p>
                                            </div>
                                            <div className="col-span-2 text-center font-bold">
                                                <p className="text-md m-1">คะแนนรวม</p>
                                            </div>
                                            <div className={`col-span-2 text-center rounded-xl p-4 py-5 font-bold ${calculatedScore > 70 ? 'bg-blue-700 text-white' : 'bg-red-700 text-white'}`}>
                                                <p className="text-md m-1">{calculatedScore}</p>
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}

                            <div className='w-3/4 mx-auto'>
                                <div className="grid grid-cols-12 gap-4 items-center mb-3  text-gray-700 ">
                                    <div className="col-span-6 text-start ml-16">
                                        <p className="text-md m-1"></p>
                                    </div>
                                    <div className="col-span-2 text-center">
                                        <p className="text-md m-1"></p>
                                    </div>
                                    <div className="col-span-2 text-center font-bold">
                                        <p className="text-md m-1">คะแนนเฉลี่ยรวม</p>
                                    </div>
                                    <div className={`col-span-2 text-center rounded-xl p-4 py-5 font-bold ${averageCalculatedScore > 70 ? 'bg-blue-700 text-white' : 'bg-red-700 text-white'}`}>
                                        <p className="text-md m-1">{averageCalculatedScore}</p>
                                    </div>
                                </div>
                            </div>


                            <div className='w-3/4 mx-auto mt-8'>
                                <p className='text-gray-800 text-2xl font-bold mt-5'>สรุปผลหลักการพิจารณาด้านเหตุผล</p>
                                <p className='text-lg font-bold mb-0 text-blue-800'>การประเมินด้านที่ 1 : กลุ่มผู้เรียนเป้าหมาย</p>
                            </div>
                            {evaluationScores.map((score, index) => {
                                return (
                                    <div className='w-3/4 mx-auto' key={index}>
                                        <div className='mt-6'>
                                            <p className="text-md m-1">{score.report01}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className='w-5/6 mx-auto mt-5 px-6'>
                                <Form>
                                    <label className='pl-10 pt-8 text-lg text-gray-700 font-bold'>ด้านที่ 1 : กลุ่มผู้เรียนเป้าหมาย</label>
                                    <FormTextArea className="p-10  pt-2"
                                        fluid
                                        placeholder="โปรดอธิบายรายละเอียด"
                                        // name="report01"
                                        style={{ minHeight: '150px' }}
                                    // value={assignData.report01}
                                    // onChange={handleChange}
                                    />
                                </Form>
                            </div>



                            <div className='w-3/4 mx-auto mt-8'>
                                <p className='text-lg font-bold mb-0 text-blue-800 mt-8'>การประเมินด้านที่ 2 : ความเหมาะสมและความทันสมัยของหลักสูตร</p>
                            </div>
                            {evaluationScores.map((score, index) => {
                                return (
                                    <div className='w-3/4 mx-auto' key={index}>
                                        <div className='mt-6'>
                                            <p className="text-md m-1">{score.report02}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className='w-5/6 mx-auto mt-5 px-6'>
                                <Form>
                                    <label className='pl-10 pt-8 text-lg text-gray-700 font-bold'>ด้านที่ 2 : ความเหมาะสมและความทันสมัยของหลักสูตร</label>
                                    <FormTextArea className="p-10  pt-2"
                                        fluid
                                        placeholder="โปรดอธิบายรายละเอียด"
                                        // name="report01"
                                        style={{ minHeight: '150px' }}
                                    // value={assignData.report01}
                                    // onChange={handleChange}
                                    />
                                </Form>
                            </div>



                            <div className='w-3/4 mx-auto mt-8'>
                                <p className='text-lg font-bold mb-0 text-blue-800 mt-8'>การประเมินด้านที่ 3 : ความเชื่อมโยงกับหลักสูตรที่มีอยู่ในมหาวิทยาลัย</p>
                            </div>
                            {evaluationScores.map((score, index) => {
                                return (
                                    <div className='w-3/4 mx-auto' key={index}>
                                        <div className='mt-6'>
                                            <p className="text-md m-1">{score.report03}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className='w-5/6 mx-auto mt-5 px-6'>
                                <Form>
                                    <label className='pl-10 pt-8 text-lg text-gray-700 font-bold'>ด้านที่ 3 : ความเชื่อมโยงกับหลักสูตรที่มีอยู่ในมหาวิทยาลัย</label>
                                    <FormTextArea className="p-10  pt-2"
                                        fluid
                                        placeholder="โปรดอธิบายรายละเอียด"
                                        // name="report01"
                                        style={{ minHeight: '150px' }}
                                    // value={assignData.report01}
                                    // onChange={handleChange}
                                    />
                                </Form>
                            </div>


                            <div className='w-3/4 mx-auto mt-8'>
                                <p className='text-lg font-bold mb-0 text-blue-800 mt-8'>การประเมินด้านที่ 4 : ความร่วมมือกับองค์กรภาครัฐ เอกชน และสถาบันการศึกษาต่างประเทศ</p>
                            </div>
                            {evaluationScores.map((score, index) => {
                                return (
                                    <div className='w-3/4 mx-auto' key={index}>
                                        <div className='mt-6'>
                                            <p className="text-md m-1">{score.report04}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className='w-5/6 mx-auto mt-5 px-6'>
                                <Form>
                                    <label className='pl-10 pt-8 text-lg text-gray-700 font-bold'>ด้านที่ 4 : ความร่วมมือกับองค์กรภาครัฐ เอกชน และสถาบันการศึกษาต่างประเทศ</label>
                                    <FormTextArea className="p-10  pt-2"
                                        fluid
                                        placeholder="โปรดอธิบายรายละเอียด"
                                        // name="report01"
                                        style={{ minHeight: '150px' }}
                                    // value={assignData.report01}
                                    // onChange={handleChange}
                                    />
                                </Form>
                            </div>


                            <div className='w-3/4 mx-auto mt-8'>
                                <p className='text-lg font-bold mb-0 text-blue-800 mt-8'>การประเมินด้านที่ 5 : ประโยชน์ต่อสังคมและประเทศ</p>
                            </div>
                            {evaluationScores.map((score, index) => {
                                return (
                                    <div className='w-3/4 mx-auto' key={index}>
                                        <div className='mt-6'>
                                            <p className="text-md m-1">{score.report05}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className='w-5/6 mx-auto mt-5 px-6'>
                                <Form>
                                    <label className='pl-10 pt-8 text-lg text-gray-700 font-bold'>ด้านที่ 5 : ประโยชน์ต่อสังคมและประเทศ</label>
                                    <FormTextArea className="p-10  pt-2"
                                        fluid
                                        placeholder="โปรดอธิบายรายละเอียด"
                                        // name="report01"
                                        style={{ minHeight: '150px' }}
                                    // value={assignData.report01}
                                    // onChange={handleChange}
                                    />
                                </Form>
                            </div>

                        </div>


                        {/* Button */}
                        <div className="gap-4 flex justify-center items-center mt-5">
                            <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2">
                                <div className="flex justify-start items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    ปิด
                                </div>
                            </button>
                        </div>


                    </div>


                )}
            </div>
        </div >
    );
};

export default State03_ModalAsSummaryResults;
