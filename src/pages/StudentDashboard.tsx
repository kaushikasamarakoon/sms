
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
//import { Progress } from '../components/ui/progress';
import { Calendar, Clock, CheckCircle, XCircle, Camera, BookOpen, LogOut } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import FaceRecognitionAttendance from '../components/FaceRecognitionAttendance';

const StudentDashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [showFaceRecognition, setShowFaceRecognition] = useState(false);
  const [attendanceData, setAttendanceData] = useState({
    totalClasses: 120,
    attendedClasses: 85,
    percentage: 70.8
  });
  const [enrolledSubjects] = useState([
    { id: 1, name: 'Database Management Systems', code: 'CS301', instructor: 'Dr. Smith', attendance: 75 },
    { id: 2, name: 'Software Engineering', code: 'CS302', instructor: 'Prof. Johnson', attendance: 80 },
    { id: 3, name: 'Computer Networks', code: 'CS303', instructor: 'Dr. Wilson', attendance: 65 },
    { id: 4, name: 'Operating Systems', code: 'CS304', instructor: 'Prof. Brown', attendance: 85 }
  ]);
  const { toast } = useToast();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      window.location.href = '/';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  const handleMarkAttendance = () => {
    setShowFaceRecognition(true);
  };

  const onAttendanceMarked = () => {
    setShowFaceRecognition(false);
    setAttendanceData(prev => ({
      ...prev,
      attendedClasses: prev.attendedClasses + 1,
      percentage: ((prev.attendedClasses + 1) / prev.totalClasses) * 100
    }));
    toast({
      title: "Attendance Marked!",
      description: "Your attendance has been successfully recorded.",
    });
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Student Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {userData.name || 'Student'}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Attendance Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Attendance Overview
                </CardTitle>
                <CardDescription>Your attendance summary for this semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{attendanceData.totalClasses}</div>
                    <div className="text-sm text-gray-600">Total Classes</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{attendanceData.attendedClasses}</div>
                    <div className="text-sm text-gray-600">Attended</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{attendanceData.totalClasses - attendanceData.attendedClasses}</div>
                    <div className="text-sm text-gray-600">Missed</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Attendance</span>
                    <span className="font-medium">{attendanceData.percentage.toFixed(1)}%</span>
                  </div>
                { /* <Progress value={attendanceData.percentage} className="h-3" />*/}
                </div>
              </CardContent>
            </Card>

            {/* Enrolled Subjects */}
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Subjects</CardTitle>
                <CardDescription>Your subjects for this semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrolledSubjects.map((subject) => (
                    <div key={subject.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{subject.name}</h3>
                        <p className="text-sm text-gray-600">{subject.code} • {subject.instructor}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{subject.attendance}%</div>
                          <div className="text-xs text-gray-500">Attendance</div>
                        </div>
                        {subject.attendance >= 75 ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mark Attendance</CardTitle>
                <CardDescription>Use face recognition to mark your attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleMarkAttendance} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Mark Attendance
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="font-medium">Database Management</div>
                      <div className="text-sm text-gray-600">9:00 AM - 10:30 AM</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="font-medium">Software Engineering</div>
                      <div className="text-sm text-gray-600">11:00 AM - 12:30 PM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Face Recognition Modal */}
      {showFaceRecognition && (
        <FaceRecognitionAttendance
          onClose={() => setShowFaceRecognition(false)}
          onSuccess={onAttendanceMarked}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
