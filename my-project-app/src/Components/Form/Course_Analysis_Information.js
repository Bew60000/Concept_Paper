import React, { Component } from 'react';
import {
    FormTextArea,
    FormCheckbox,
    FormButton,
    FormGroup,
    Form,
} from 'semantic-ui-react';

class Course_Analysis_Information extends Component {
    state = {
        targetGroups: {
            highSchool: false,
            bachelor: false,
            master: false,
            doctorate: false,
            other: false,
        },
        otherDetails: '',
    };

    handleCheckboxChange = (e, { name, checked }) => {
        this.setState((prevState) => ({
            targetGroups: {
                ...prevState.targetGroups,
                [name]: checked,
            },
        }));
    };

    handleOtherDetailsChange = (e) => {
        this.setState({ otherDetails: e.target.value });
    };

    render() {
        const { targetGroups, otherDetails } = this.state;
        return (
            <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5">
                <div className='bg-white col-span-8 col-start-3 p-20 border-2 rounded-2xl shadow-10'>
                    <Form>
                        <FormTextArea fluid label='หลักการและเหตุผลในการขอเปิดหลักสูตร' placeholder='โปรดอธิบายรายละเอียด' />

                        <FormGroup grouped inline>
                            <label>กลุ่มเป้าหมายของหลักสูตร หลักสูตรเปิดรับผู้สำเร็จการศึกษาระดับ</label>
                            <FormCheckbox
                                label='มัธยมศึกษา'
                                name='highSchool'
                                checked={targetGroups.highSchool}
                                onChange={this.handleCheckboxChange}
                            />
                            <FormCheckbox
                                label='ปริญญาตรี'
                                name='bachelor'
                                checked={targetGroups.bachelor}
                                onChange={this.handleCheckboxChange}
                            />
                            <FormCheckbox
                                label='ปริญญาโท'
                                name='master'
                                checked={targetGroups.master}
                                onChange={this.handleCheckboxChange}
                            />
                            <FormCheckbox
                                label='ปริญญาเอก'
                                name='doctorate'
                                checked={targetGroups.doctorate}
                                onChange={this.handleCheckboxChange}
                            />
                            <FormCheckbox
                                label='อื่น ๆ'
                                name='other'
                                checked={targetGroups.other}
                                onChange={this.handleCheckboxChange}
                            />

                            {targetGroups.other && (
                                <FormTextArea
                                    fluid
                                    label='โปรดระบุรายละเอียดเพิ่มเติม'
                                    placeholder='โปรดกรอกรายละเอียดเพิ่มเติม'
                                    value={otherDetails}
                                    onChange={this.handleOtherDetailsChange}
                                />
                            )}
                        </FormGroup>

                        <FormTextArea
                            fluid
                            label='ผลวิเคราะห์ความต้องการของกลุ่มเป้าหมายใน'
                            placeholder='วิเคราะห์ความต้องการของกลุ่มเป้าหมายในการเข้าศึกษาหลักสูตรดังกล่าว และระบุข้อมูลที่ใช้ในการคาดการณ์จำนวนผู้เรียนในอนาคต'
                        />

                        <FormTextArea
                            label='ความร่วมมือกับหน่วยงานจากภาคผู้ใช้บัณฑิต'
                            placeholder='โปรดอธิบายรายละเอียด'
                        />
                        <FormTextArea
                            label='จุดเด่นของหลักสูตรและการดำเนินการที่จะแข่งขันกับหลักสูตรอื่นที่ใกล้เคียง'
                            placeholder='โปรดอธิบายรายละเอียด'
                        />

                        <FormButton className='grid gap-4 place-items-end'>ต่อไป</FormButton>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Course_Analysis_Information;
