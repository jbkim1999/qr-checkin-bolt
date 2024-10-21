import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import axios from 'axios';

function App() {
  const [qrValue, setQrValue] = useState('');
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (qrValue && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [qrValue, countdown]);

  const generateQR = async () => {
    try {
      const response = await axios.get('http://localhost:3001/generate-qr');
      setQrValue(response.data.qrValue);
      setCountdown(30);
    } catch (error) {
      console.error('QR 코드 생성 오류:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">QR 코드 출퇴근 관리 시스템</h1>
      <button
        onClick={generateQR}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        QR 코드 생성
      </button>
      {qrValue && (
        <div className="text-center">
          <QRCode value={qrValue} size={256} />
          <p className="mt-4">
            QR 코드 유효 시간: {countdown}초
          </p>
        </div>
      )}
      <Link to="/logs" className="mt-8 text-blue-500 hover:text-blue-700">
        출퇴근 기록 로그 보기
      </Link>
    </div>
  );
}

export default App;