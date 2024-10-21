import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface AttendanceRecord {
  employeeId: string;
  attendanceType: string;
  timestamp: string;
}

function AttendanceLog() {
  const [logs, setLogs] = useState<AttendanceRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      const response = await axios.get<AttendanceRecord[]>('http://localhost:3001/attendance-logs');
      console.log('Fetched logs:', response.data); // Added console.log
      setLogs(response.data);
      setError(null);
    } catch (error) {
      console.error('로그 가져오기 오류:', error);
      setError('로그를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  if (error) {
    return <div className="min-h-screen bg-gray-100 p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">출퇴근 기록 로그</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">직원 ID</th>
              <th className="py-3 px-6 text-left">유형</th>
              <th className="py-3 px-6 text-left">시간</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {logs.map((log, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{log.employeeId}</td>
                <td className="py-3 px-6 text-left">{log.attendanceType}</td>
                <td className="py-3 px-6 text-left">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceLog;