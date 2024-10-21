import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const attendanceRecords = [];

app.get('/generate-qr', (req, res) => {
  const qrValue = crypto.randomBytes(16).toString('hex');
  res.json({ qrValue });
});

app.post('/record-attendance', (req, res) => {
  const { employeeId, attendanceType } = req.body;
  const timestamp = new Date().toISOString();
  attendanceRecords.push({ employeeId, attendanceType, timestamp });
  res.json({ message: '출퇴근 기록이 저장되었습니다.' });
});

app.get('/attendance-logs', (req, res) => {
  // 최신 기록부터 정렬하여 반환
  const sortedRecords = attendanceRecords
    .map(record => ({
      employeeId: record.employeeId,
      attendanceType: record.attendanceType,
      timestamp: record.timestamp
    }))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  res.json(sortedRecords);
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});