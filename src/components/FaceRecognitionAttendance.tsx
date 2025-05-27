
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Camera, X, CheckCircle, Loader } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface FaceRecognitionAttendanceProps {
  onClose: () => void;
  onSuccess: () => void;
}

const FaceRecognitionAttendance = ({ onClose, onSuccess }: FaceRecognitionAttendanceProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      setIsCapturing(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      // Simulate face recognition processing
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        
        // Simulate successful recognition (90% success rate)
        const success = Math.random() > 0.1;
        
        if (success) {
          toast({
            title: "Face Recognized!",
            description: "Attendance marked successfully.",
          });
          onSuccess();
        } else {
          toast({
            title: "Recognition Failed",
            description: "Face not recognized. Please try again.",
            variant: "destructive"
          });
        }
      }, 3000);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Face Recognition Attendance
              </CardTitle>
              <CardDescription>
                Position your face in the camera frame and capture to mark attendance
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
            {!isCapturing ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Click below to start camera</p>
                  <Button onClick={startCamera} className="bg-blue-600 hover:bg-blue-700">
                    Start Camera
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
                
                {/* Face detection overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-4 border-blue-500 rounded-full opacity-50 animate-pulse"></div>
                </div>
                
                {isProcessing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Loader className="h-8 w-8 animate-spin mx-auto mb-2" />
                      <p>Processing face recognition...</p>
                    </div>
                  </div>
                )}
              </>
            )}
            
            <canvas ref={canvasRef} className="hidden" />
          </div>
          
          <div className="flex justify-center space-x-4">
            {isCapturing && !isProcessing && (
              <>
                <Button onClick={captureImage} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Capture & Mark Attendance
                </Button>
                <Button variant="outline" onClick={stopCamera}>
                  Stop Camera
                </Button>
              </>
            )}
          </div>
          
          <div className="text-center text-sm text-gray-600">
            <p>• Make sure your face is clearly visible</p>
            <p>• Look directly at the camera</p>
            <p>• Ensure good lighting</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaceRecognitionAttendance;
