import React, { useState } from 'react';

type Student = {
  id: number;
  name: string;
  studentId: string;
  present: boolean | null;
};

const AttendancePage: React.FC = () => {
  const initialStudents: Student[] = [
    { id: 1, name: 'John Doe', studentId: 'ST001', present: null },
    { id: 2, name: 'Jane Smith', studentId: 'ST002', present: null },
    { id: 3, name: 'Bob Johnson', studentId: 'ST003', present: null },
  ];

  const [attendanceList, setAttendanceList] = useState<Student[]>(initialStudents);

  const handleMarkStudent = (studentId: number, present: boolean) => {
    setAttendanceList(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, present } : student
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">Student Attendance</h1>
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-purple-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Student ID</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Present</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Absent</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="py-3 px-4 text-sm text-gray-800">{student.name}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{student.studentId}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleMarkStudent(student.id, true)}
                    className={`text-sm font-medium px-4 py-2 rounded-md transition-all duration-200 ${
                      student.present === true
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-green-400'
                    }`}
                  >
                    Present
                  </button>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleMarkStudent(student.id, false)}
                    className={`text-sm font-medium px-4 py-2 rounded-md transition-all duration-200 ${
                      student.present === false
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-red-400'
                    }`}
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;
