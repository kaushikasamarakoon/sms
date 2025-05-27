
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Download, Calendar, TrendingUp, Users, FileText } from 'lucide-react';

const AttendanceReports = () => {
  const [subject, setSubject] = useState<any>(null);
  const [attendanceData] = useState([
    { id: 1, name: 'John Doe', studentId: 'ST001', sessions: 18, attended: 15, percentage: 83.3 },
    { id: 2, name: 'Jane Smith', studentId: 'ST002', sessions: 18, attended: 17, percentage: 94.4 },
    { id: 3, name: 'Mike Johnson', studentId: 'ST003', sessions: 18, attended: 12, percentage: 66.7 },
    { id: 4, name: 'Sarah Wilson', studentId: 'ST004', sessions: 18, attended: 16, percentage: 88.9 },
    { id: 5, name: 'David Brown', studentId: 'ST005', sessions: 18, attended: 14, percentage: 77.8 },
    { id: 6, name: 'Emily Davis', studentId: 'ST006', sessions: 18, attended: 18, percentage: 100.0 },
    { id: 7, name: 'Chris Miller', studentId: 'ST007', sessions: 18, attended: 13, percentage: 72.2 },
    { id: 8, name: 'Lisa Garcia', studentId: 'ST008', sessions: 18, attended: 16, percentage: 88.9 },
  ]);

  const [recentSessions] = useState([
    { date: '2024-01-15', topic: 'Database Normalization', present: 42, absent: 3, percentage: 93.3 },
    { date: '2024-01-12', topic: 'SQL Queries Advanced', present: 40, absent: 5, percentage: 88.9 },
    { date: '2024-01-10', topic: 'ER Diagrams', present: 43, absent: 2, percentage: 95.6 },
    { date: '2024-01-08', topic: 'Database Design', present: 38, absent: 7, percentage: 84.4 },
    { date: '2024-01-05', topic: 'Introduction to DBMS', present: 44, absent: 1, percentage: 97.8 },
  ]);

  useEffect(() => {
    const storedSubject = localStorage.getItem('selectedSubject');
    if (storedSubject) {
      setSubject(JSON.parse(storedSubject));
    } else {
      window.location.href = '/teacher-dashboard';
    }
  }, []);

  const lowAttendanceStudents = attendanceData.filter(student => student.percentage < 75);
  const averageAttendance = attendanceData.reduce((acc, student) => acc + student.percentage, 0) / attendanceData.length;

  if (!subject) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.location.href = '/teacher-dashboard'}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Attendance Reports</h1>
                <p className="text-sm text-gray-600">{subject.name} ({subject.code})</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{attendanceData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Attendance</p>
                  <p className="text-2xl font-bold text-gray-900">{averageAttendance.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Low Attendance</p>
                  <p className="text-2xl font-bold text-gray-900">{lowAttendanceStudents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList>
            <TabsTrigger value="students">Student Reports</TabsTrigger>
            <TabsTrigger value="sessions">Session History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Attendance Summary</CardTitle>
                <CardDescription>Individual attendance records for all students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceData.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.studentId}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{student.attended}/{student.sessions} sessions</p>
                          <p className="text-lg font-semibold">{student.percentage.toFixed(1)}%</p>
                        </div>
                        {student.percentage >= 75 ? (
                          <Badge className="bg-green-100 text-green-800">Good</Badge>
                        ) : student.percentage >= 60 ? (
                          <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                        ) : (
                          <Badge variant="destructive">Critical</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>Session History</CardTitle>
                <CardDescription>Recent class sessions and attendance statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{session.topic}</p>
                          <p className="text-sm text-gray-600">{session.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{session.present} present, {session.absent} absent</p>
                          <p className="text-lg font-semibold">{session.percentage.toFixed(1)}%</p>
                        </div>
                        {session.percentage >= 90 ? (
                          <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                        ) : session.percentage >= 75 ? (
                          <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">Low</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Trends</CardTitle>
                  <CardDescription>Monthly attendance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">January 2024</span>
                      <span className="text-sm text-gray-600">92.5% avg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92.5%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">December 2023</span>
                      <span className="text-sm text-gray-600">89.3% avg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '89.3%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">November 2023</span>
                      <span className="text-sm text-gray-600">87.8% avg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87.8%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Low Attendance Alerts</CardTitle>
                  <CardDescription>Students requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lowAttendanceStudents.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div>
                          <p className="font-medium text-red-900">{student.name}</p>
                          <p className="text-sm text-red-700">{student.studentId}</p>
                        </div>
                        <Badge variant="destructive">{student.percentage.toFixed(1)}%</Badge>
                      </div>
                    ))}
                    {lowAttendanceStudents.length === 0 && (
                      <p className="text-center text-gray-500 py-4">No students with low attendance</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AttendanceReports;
