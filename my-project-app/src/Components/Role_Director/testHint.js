import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'; // ใช้ Tooltip จาก react-tooltip
import 'react-tooltip/dist/react-tooltip.css'; // นำเข้าการตั้งค่า CSS ของ Tooltip

const ScoreHint = () => {
    const [groupedEvaluations, setGroupedEvaluations] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/evaluate_data')
            .then(response => {
                // จัดกลุ่มข้อมูลตาม evaluation_aspect
                const groupedData = response.data.reduce((acc, item) => {
                    if (!acc[item.evaluation_aspect]) {
                        acc[item.evaluation_aspect] = [];
                    }
                    acc[item.evaluation_aspect].push(item);
                    return acc;
                }, {});
                setGroupedEvaluations(groupedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            {Object.keys(groupedEvaluations).map((aspect, aspectIndex) => (
                <div key={aspectIndex} style={{ margin: '20px 0' }}>
                    <span
                        id={`hint-${aspectIndex}`}
                        style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
                    >
                        {aspect}
                    </span>
                    <Tooltip
                        anchorId={`hint-${aspectIndex}`}
                        place="top"
                        // html={true} // เปิดใช้งานการตีความ HTML ใน Tooltip
                        style={{ whiteSpace: 'pre-line' }} // ใช้ CSS สำหรับการขึ้นบรรทัดใหม
                        content={groupedEvaluations[aspect].map(
                            (item) => `ระดับการประเมิน ${item.evaluation_level}: ${item.detailed_evaluation}`
                        ).join('\n')}
                    />
                </div>
            ))}
        </div>
    );
};

export default ScoreHint;
