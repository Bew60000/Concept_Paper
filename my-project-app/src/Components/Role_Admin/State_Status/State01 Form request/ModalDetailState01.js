import React, { useRef, useEffect } from 'react';

const Modal = ({ isOpen, closeModal, selectedForm, studentData, teacherData, findUserByUsername, UpdateStatus }) => {
    const modalRef = useRef(null);

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
            <div ref={modalRef} className="bg-white p-6 rounded-lg w-7/12 rounded-full max-h-[650px] overflow-y-auto mt-16">
                {selectedForm && (
                    <div className='text-gray-700'>

                        <div className="grid grid-cols-12 gab-1 items-center">
                            <div className="col-span-12 text-start p-5">
                                <h2 className="font-bold m-0"> หลักสูตร{selectedForm.majorthai}</h2>
                                <p className='text-gray-500 font-bold m-0'>"{selectedForm.majoreng}"</p>
                            </div>
                        </div>

                        <hr className='border-gray-300 w-11/12 mx-auto' />
                        {/* Sent by */}
                        <p className=" text-start p-5 pb-0">
                            <strong>ผู้ยื่นคำขอ:</strong>&nbsp;
                            {findUserByUsername(selectedForm.sent_by)?.name || 'ไม่พบข้อมูลผู้ยื่น'}&nbsp;
                            {findUserByUsername(selectedForm.sent_by)?.lastname || 'ไม่พบข้อมูลผู้ยื่น'}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </p>
                        {/* Form Part I */}
                        <div className="text-start p-5 pt-2">
                            <p className="text-xl font-bold text-gray-500">1.ข้อมูลเบื้องต้น</p>
                        </div>

                        <div className="pr-5 pl-5">
                            <p className="m-1"><strong>คณะ :</strong> {selectedForm.faculty}</p>
                            <p className="m-1"><strong>วิทยาเขต :</strong>{selectedForm.campus}</p>
                            <p className="m-1"><strong>สังกัด:</strong>&nbsp;{selectedForm.affiliation}</p>
                        </div>

                        <div className="mt-8 pr-5 pl-5">
                            <p className="m-1"><strong>ชื่อปริญญา :</strong> {selectedForm.degreename}</p>
                            <p className="m-1"><strong>ปีที่เริ่มดำเนินการสอน :</strong> {selectedForm.yearstarted}</p>
                        </div>

                        <div className="mt-8 pr-5 pl-5">
                            <p className="m-1"><strong>ลักษณของหลักสูตร:</strong>&nbsp;{selectedForm.nature}</p>
                            <p className="m-1"><strong>รายละเอียดลักษณของหลักสูตรเพิ่มเติม:</strong></p>
                            <p className="m-1">{selectedForm.additionalinfo}</p>
                        </div>

                        <div className="mt-8 pr-5 pl-5">
                            <p className="m-1"><strong>ผลลัพธ์การเรียนรู้ระดับหลักสูตร :</strong></p>
                            <p className="m-1 mt-2">{selectedForm.learningoutcome}</p>
                        </div>

                        <hr className='mt-10 border-gray-300 w-11/12 mx-auto' />
                        {/* Form Part II */}
                        <div className="text-start p-5 mt-8">
                            <p className="text-xl font-bold text-gray-500">2.ข้อมูลการวิเคราะห์หลักสูตร</p>
                        </div>

                        <div className="pr-5 pl-5">
                            <p className="m-1"><strong>2.1 หลักการและเหตุผลในการขอเปิดหลักสูตร :</strong></p>
                            <p className="m-1 mt-2">{selectedForm.principle_reasons}</p>
                        </div>

                        <div className="mt-8 pr-5 pl-5">
                            <div className='flex'>
                                <p className="m-1"><strong>2.2 กลุ่มเป้าหมายของหลักสูตร หลักสูตรเปิดรับผู้สำเร็จการศึกษาระดับ :</strong></p>
                                <p className='text-blue-700 font-bold'>"{selectedForm.required_eq_id}"</p>
                            </div>
                            <p className="m-1"><strong>ผลวิเคราะห์ความต้องการของกลุ่มเป้าหมายในการเข้าศึกษาหลักสูตรดังกล่าว <br />และระบุข้อมูลที่ใช้ในการคาดการณ์จำนวนผู้เรียนในอนาคต :</strong></p>
                            <p className="m-1 mt-2">{selectedForm.analysis_of_future_target}</p>
                        </div>

                        <div className="mt-8 pr-5 pl-5">
                            <p className="m-1"><strong>2.3 ความร่วมมือกับหน่วยงานจากภาคผู้ใช้บัณฑิต </strong> (ในการออกแบบหลักสูตร แหล่งฝึก ส่งคนมาเรียน รับบัณฑิตเข้าทำงานโดยตรง) : </p>
                            <p className="m-1 mt-2">{selectedForm.cooperation}</p>
                        </div>

                        <div className="mt-8 pr-5 pl-5">
                            <p className="m-1"><strong>2.4 หลักสูตรดังกล่าวมีความใกล้เคียงกับหลักสูตรอื่นอย่างไร</strong> กรณีที่มีความคล้ายคลึงกับหลักสูตรอื่น ให้ระบุถึง<strong>"จุดเด่นของหลักสูตร"</strong>และการดำเนินการที่จะ
                                <strong>"เเข่งขัน"</strong>กับหลักสูตรอื่นที่ใกล้เคียง: </p>
                            <p className="m-1 mt-2">{selectedForm.high_lights}</p>
                        </div>

                        <hr className='mt-10 border-gray-300 w-11/12 mx-auto' />
                        {/* Form Part III*/}
                        <div className="text-start p-5 mt-8">
                            <p className="text-xl font-bold text-gray-500">3.แผนการรับนักศึกษา</p>
                            {studentData.length > 0 && Object.entries(studentData.reduce((groupedData, student) => {
                                // จัดกลุ่มตามปีการศึกษา
                                if (!groupedData[student.year_opened]) {
                                    groupedData[student.year_opened] = [];
                                }
                                groupedData[student.year_opened].push(student);
                                return groupedData;
                            }, {})).map(([yearOpened, students], index) => (
                                <div key={index} className="mt-5 p-2 mb-5">
                                    <p className='font-bold mb-1'>• ปีการศึกษา {yearOpened}</p>
                                    {students.map((student, idx) => (
                                        <div key={idx}>
                                            <p>&nbsp;&nbsp;&nbsp;&nbsp;ชั้นปีที่ {student.year} จำนวนนักศึกษาที่เปิดรับ: {student.count_students}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}

                        </div>

                        <hr className='mt-10 border-gray-300 w-11/12 mx-auto' />
                        {/* Form Part IV*/}
                        <div className="text-start p-5 mt-8">
                            <p className="text-xl font-bold text-gray-500">4.รูปแบบการจัดการเรียนการสอนและการบริหารจัดการ</p>
                        </div>

                        <div className="pr-5 pl-5">
                            <p className="m-1"><strong>4.1 รูปแบบของการจัดการเรียนการสอนที่มีการเรียนรู้จากประสบการณ์จริง :</strong></p>
                            <p className="m-1 mt-2">{selectedForm.teaching}</p>
                        </div>

                        <div className="mt-8 pr-5 pl-5">
                            <p className="m-1"><strong>4.2 หลักสูตรฯ มีการควบคุมต้นทุนของการจัดการเรียนการสอนของการจัดการศึกษาอย่างไรบ้าง :</strong></p>
                            <p className="m-1 mt-2">{selectedForm.cost_control}</p>
                        </div>

                        <div className="mt-8 pr-5 pl-5">
                            <p className="m-1"><strong>4.3 ความพร้อมในการจัดการเรียนการสอน</strong> (ทรัพยากรการเรียนรู้ ศักยภาพของบุคลากร คู่ความร่วมมือ งบประมาณสนับสนุนจากภายนอกมหาวิทยาลัย รวมถึงวามเชื่อมโยงกับสิ่งที่คณะมีอยู่) : </p>
                            <p className="m-1 mt-2">{selectedForm.readiness}</p>
                        </div>

                        <hr className='mt-10 border-gray-300 w-11/12 mx-auto' />
                        {/* Form Part V*/}
                        <div className="text-start p-5 mt-8">
                            <p className="text-xl font-bold text-gray-500">5. อาจารย์ผู้รับผิดชอบหลักสูตร และอาจารย์ประจำหลักสูตร</p>
                        </div>

                        <div className="pr-5 pl-5">
                            {teacherData.length > 0 && (
                                <div className="mt-8">
                                    <p className="m-1 mb-5"><strong>5.1 อาจารย์ผู้รับผิดชอบหลักสูตร</strong></p>
                                    <div className='pl-5'>
                                        {teacherData
                                            .filter(teacher => teacher.teacher_role === 'อาจารย์ผู้รับผิดชอบหลักสูตร')
                                            .map((teacher, index) => (
                                                <div key={index}>
                                                    <p className="m-1 mt-5 text-lg font-bold text-blue-700">
                                                        {`${index + 1}. ${teacher.teacher_perfix} ${teacher.teacher_fname} ${teacher.teacher_lname}`}
                                                    </p>
                                                    <p className="m-1 mt-2"><strong>ตำแหน่งทางวิชาการ :</strong> {teacher.academic_ranks}</p>
                                                    <p className="m-1 mt-2"><strong>คุณวุฒิ :</strong></p>
                                                    <p className="m-1 mt-2">{teacher.educational_qualifications}</p>
                                                    <p className="m-1 mt-2"><strong>ผลงานทางด้านวิชาการย้อนหลัง 3 ปี :</strong></p>
                                                    <p className="m-1 mt-2 pb-8">{teacher.performance}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pr-5 pl-5">
                            {teacherData.length > 0 && (
                                <div className="mt-8">
                                    <p className="m-1 mb-5"><strong>5.2 อาจารย์ประจำหลักสูตร</strong></p>
                                    <div className='pl-5'>
                                        {teacherData
                                            .filter(teacher => teacher.teacher_role === 'อาจารย์ประจำหลักสูตร')
                                            .map((teacher, index) => (
                                                <div key={index}>
                                                    <p className="text-lg font-bold text-blue-700">
                                                        {`${index + 1}. ${teacher.teacher_perfix} ${teacher.teacher_fname} ${teacher.teacher_lname}`}
                                                    </p>
                                                    <p className="m-1"><strong>ตำแหน่งทางวิชาการ :</strong> {teacher.academic_ranks}</p>
                                                    <p className="m-1 mt-2"><strong>คุณวุฒิ :</strong></p>
                                                    <p className="m-1 mt-2">{teacher.educational_qualifications}</p>
                                                    <p className="m-1 mt-2"><strong>ผลงานทางด้านวิชาการย้อนหลัง 3 ปี :</strong></p>
                                                    <p className="m-1 mt-2 pb-8">{teacher.performance}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Button */}
                        <div className="gap-4 flex justify-center items-center mt-5">
                            <button onClick={() => UpdateStatus(selectedForm.curriculum_id, 'กำลังดำเนินการประเมิน')}
                                className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2">
                                <div className="flex justify-start items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    ตอบรับคำขอ
                                </div>
                            </button>

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

export default Modal;
