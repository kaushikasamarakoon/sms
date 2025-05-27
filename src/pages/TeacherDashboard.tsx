


import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { BookOpen, Users, Clock, Calendar, Camera, LogOut, Plus } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const TeacherDashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [subjects] = useState([
    { 
      id: 1, 
      name: 'Database Management Systems', 
      code: 'CS301', 
      students: 45, 
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      nextClass: '2024-01-15 09:00'
    },
    { 
      id: 2, 
      name: 'Software Engineering', 
      code: 'CS302', 
      students: 38, 
      schedule: 'Tue, Thu - 11:00 AM',
      nextClass: '2024-01-16 11:00'
    },
    { 
      id: 3, 
      name: 'Computer Networks', 
      code: 'CS303', 
      students: 42, 
      schedule: 'Mon, Wed - 2:00 PM',
      nextClass: '2024-01-15 14:00'
    }
  ]);
  useToast();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const data = JSON.parse(storedUserData);
      if (data.userType !== 'teacher') {
        window.location.href = '/';
        return;
      }
      setUserData(data);
    } else {
      window.location.href = '/';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  const handleStartAttendance = (subjectId: number) => {
    localStorage.setItem('selectedSubject', JSON.stringify(subjects.find(s => s.id === subjectId)));
    window.location.href = '/attendance-session';
  };

  const handleViewAttendance = (subjectId: number) => {
    localStorage.setItem('selectedSubject', JSON.stringify(subjects.find(s => s.id === subjectId)));
    window.location.href = '/attendance-reports';
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
              <h1 className="text-xl font-semibold text-gray-900">Teacher Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {userData.name || 'Teacher'}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                  <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{subjects.reduce((acc, subject) => acc + subject.students, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Classes Today</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Next Class</p>
                  <p className="text-2xl font-bold text-gray-900">9:00 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Subjects */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>My Subjects</CardTitle>
                <CardDescription>Manage your subjects and attendance</CardDescription>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <Card key={subject.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <CardDescription>{subject.code}</CardDescription>
                      </div>
                      <Badge variant="secondary">{subject.students} students</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {subject.schedule}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button 
                        onClick={() => handleStartAttendance(subject.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Start Attendance
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleViewAttendance(subject.id)}
                        className="w-full"
                      >
                        View Reports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest attendance sessions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Attendance completed for CS301</p>
                    <p className="text-sm text-gray-600">Database Management Systems - 42/45 students present</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Attendance completed for CS302</p>
                    <p className="text-sm text-gray-600">Software Engineering - 35/38 students present</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Low attendance alert for CS303</p>
                    <p className="text-sm text-gray-600">Computer Networks - Several students below 75%</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
