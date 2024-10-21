import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const State02_ModalDetailResults = ({ isOpen, closeModal, selectedForm, studentData, teacherData, UpdateStatus }) => {
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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div ref={modalRef} className="bg-white p-6 rounded-lg w-5/6 rounded-full max-h-[650px] overflow-y-auto mt-16">
                {selectedForm && (
                    <div className='text-gray-700'>

                        <div className='flex justify-between w-5/6 my-6 mx-auto'>
                            <div>
                                <h2 className="font-bold m-0"> ผลการประเมินหลักสูตร</h2>
                                <p className='text-gray-500 font-bold m-0 text-lg'>{selectedForm.majorthai}</p>
                                <p className='text-gray-500 font-bold m-0'>"{selectedForm.majoreng}"</p>
                            </div>

                        </div>

                        <hr className='border-gray-300 w-3/4 mx-auto' />

                        <div className="text-start p-5 pt-2 mt-5">

                            <p className='text-gray-800 text-xl font-bold mx-auto w-3/4 mt-5'>การให้คะแนนสำหรับการประเมิน</p>
                            {evaluationScores.map((score, index) => {

                                const totalScore = (score.aspect_1 + score.aspect_2 + score.aspect_3 + score.aspect_4 + score.aspect_5);
                                const calculatedScore = (totalScore * 20) / 5;

                                return (
                                    <div className='w-3/4 mx-auto' key={index}>

                                        <div className="grid grid-cols-12 gap-4 items-center mb-3 bg-gray-700 rounded-xl text-gray-100 p-4 py-3">
                                            <div className="col-span-6 text-center">
                                                <p className="text-md font-bold m-1">เกณฑ์การประเมิน</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md font-bold m-1">ระดับการประเมิน</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md font-bold m-1">น้ำหนัก (%)</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md font-bold m-1">คะแนนรวม</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-12 gap-4 items-center mb-3 bg-gray-100 rounded-xl text-gray-700 p-4 py-5">
                                            <div className="col-span-6 text-start ml-16">
                                                <p className="text-md m-1">1.กลุ่มผู้เรียนเป้าหมาย</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">{score.aspect_1}</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">20</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">{4 * score.aspect_1}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-12 gap-4 items-center mb-3 bg-gray-100 rounded-xl text-gray-700 p-4 py-5">
                                            <div className="col-span-6 text-start ml-16">
                                                <p className="text-md m-1">2.ความเหมาะสมและความทันสมัยของหลักสูตร</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">{score.aspect_2}</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">20</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">{4 * score.aspect_2}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-12 gap-4 items-center mb-3 bg-gray-100 rounded-xl text-gray-700 p-4 py-5">
                                            <div className="col-span-6 text-start ml-16">
                                                <p className="text-md m-1">3.ความเชื่อมโยงกับหลักสูตรที่มีอยู่เดิมในมหาวิทยาลัย</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">{score.aspect_3}</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">20</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">{4 * score.aspect_3}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-12 gap-4 items-center mb-3 bg-gray-100 rounded-xl text-gray-700 p-4 py-5">
                                            <div className="col-span-6 text-start ml-16">
                                                <p className="text-md m-1">4. ความร่วมมือกับองค์กรภาครัฐ/เอกชน และสถาบันศึกษาต่างประเทศ</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">{score.aspect_4}</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">20</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">{4 * score.aspect_4}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-12 gap-4 items-center mb-3 bg-gray-100 rounded-xl text-gray-700 p-4 py-5">
                                            <div className="col-span-6 text-start ml-16">
                                                <p className="text-md m-1">5. ประโยชน์ต่อสังคมและประเทศ</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">{score.aspect_5}</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">20</p>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <p className="text-md m-1">{4 * score.aspect_5}</p>
                                            </div>
                                        </div>

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

                                        <p className='text-gray-800 text-xl font-bold mt-5'>หลักการพิจารณาด้านเหตุผล</p>

                                        <div className='mt-8'>
                                            <p className='text-lg font-bold mb-0 text-blue-800'>การประเมินด้านที่ 1 : กลุ่มผู้เรียนเป้าหมาย</p>
                                            <p className="text-md m-1">{score.report01}</p>

                                            <p className='text-lg font-bold mb-0 text-blue-800 mt-8'>การประเมินด้านที่ 2 : ความเหมาะสมและความทันสมัยของหลักสูตร</p>
                                            <p className="text-md m-1">{score.report02}</p>

                                            <p className='text-lg font-bold mb-0 text-blue-800 mt-8'>การประเมินด้านที่ 3 : ความเชื่อมโยงกับหลักสูตรที่มีอยู่ในมหาวิทยาลัย</p>
                                            <p className="text-md m-1">{score.report03}</p>

                                            <p className='text-lg font-bold mb-0 text-blue-800 mt-8'>การประเมินด้านที่ 4 : ความร่วมมือกับองค์กรภาครัฐ เอกชน และสถาบันการศึกษาต่างประเทศ</p>
                                            <p className="text-md m-1">{score.report04}</p>

                                            <p className='text-lg font-bold mb-0 text-blue-800 mt-8'>การประเมินด้านที่ 5 : ประโยชน์ต่อสังคมและประเทศ</p>
                                            <p className="text-md m-1">{score.report05}</p>
                                        </div>

                                    </div>
                                );
                            })}

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
        </div>
    );
};

export default State02_ModalDetailResults;
