import React, { useState } from 'react';
import axios from 'axios';

function MobileScanner() {
  const [employeeId, setEmployeeId] = useState('');
  const [attendanceType, setAttendanceType] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/record-attendance', {
        employeeId,
        attendanceType,
      });
      alert('출퇴근이 기록되었습니다.');
      setEmployeeId('');
      setAttendanceType('');
    } catch (error) {
      console.error('출퇴근 기록 오류:', error);
      alert('출퇴근 기록에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">출퇴근 기록</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="employeeId" className="block text-gray-700 text-sm font-bold mb-2">
            직원 ID
          </label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            출퇴근 유형
          </label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="출근"
                checked={attendanceType === '출근'}
                onChange={(e) => setAttendanceType(e.target.value)}
                className="form-radio"
                required
              />
              <span className="ml-2">출근</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="퇴근"
                checked={attendanceType === '퇴근'}
                onChange={(e) => setAttendanceType(e.target.value)}
                className="form-radio"
                required
              />
              <span className="ml-2">퇴근</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          제출
        </button>
      </form>
    </div>
  );
}

export default MobileScanner;