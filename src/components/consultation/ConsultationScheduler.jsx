/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { useNutritionist } from '../../context/NutritionistContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button, 
  Badge, 
  Input, 
  Label, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
  Textarea, 
  Calendar 
} from '../ui';

const ConsultationScheduler = () => {
  const { user } = useAuth();
  const { bookConsultation, upcomingConsultations } = useCustomer();
  const { scheduleConsultation, clients, schedule } = useNutritionist();
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('video');
  const [selectedNutritionist, setSelectedNutritionist] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [consultationReason, setConsultationReason] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const mockNutritionists = [
    { id: 1, name: 'Dr. Sarah Johnson', specialties: ['Hypertension', 'Diabetes'], rating: 4.9, available: true },
    { id: 2, name: 'Dr. Mike Chen', specialties: ['Weight Management', 'Sports Nutrition'], rating: 4.7, available: true },
    { id: 3, name: 'Dr. Emily Davis', specialties: ['Pediatric Nutrition', 'Allergies'], rating: 4.8, available: false }
  ];

  const consultationTypes = [
    { id: 'video', name: 'Video Call', icon: Video, description: 'Face-to-face video consultation' },
    { id: 'phone', name: 'Phone Call', icon: Phone, description: 'Audio-only consultation' },
    { id: 'in-person', name: 'In-Person', icon: User, description: 'Physical meeting at clinic' }
  ];

  const isTimeSlotAvailable = (date, time) => {
    if (!date) return false;
    
    const dateTimeString = `${date.toISOString().split('T')[0]}T${time}:00:00Z`;
    const slotDateTime = new Date(dateTimeString);
    
    // Check if slot is in the past
    if (slotDateTime < new Date()) return false;
    
    // Check if slot is already booked (mock logic)
    const isBooked = schedule.some(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.toDateString() === date.toDateString() &&
             appointmentDate.toTimeString().slice(0, 5) === time;
    });
    
    return !isBooked;
  };

  const handleBookConsultation = async () => {
    if (!selectedDate || !selectedTime || !consultationReason) {
      alert('Please fill in all required fields');
      return;
    }

    const consultationData = {
      date: `${selectedDate.toISOString().split('T')[0]}T${selectedTime}:00:00Z`,
      type: consultationType,
      nutritionist: selectedNutritionist || 'Dr. Sarah Johnson',
      reason: consultationReason,
      status: 'pending'
    };

    const result = await bookConsultation(consultationData);
    if (result.success) {
      setIsBooking(false);
      setSelectedDate(null);
      setSelectedTime('');
      setConsultationReason('');
      alert('Consultation booked successfully!');
    }
  };

  const handleScheduleConsultation = async () => {
    if (!selectedDate || !selectedTime || !selectedClient) {
      alert('Please fill in all required fields');
      return;
    }

    const consultationData = {
      date: `${selectedDate.toISOString().split('T')[0]}T${selectedTime}:00:00Z`,
      type: consultationType,
      clientId: selectedClient,
      clientName: clients.find(c => c.id === selectedClient)?.name,
      status: 'scheduled'
    };

    const result = await scheduleConsultation(consultationData);
    if (result.success) {
      setIsBooking(false);
      setSelectedDate(null);
      setSelectedTime('');
      setSelectedClient('');
      alert('Consultation scheduled successfully!');
    }
  };

  const filteredConsultations = (user?.role === 'NUTRITIONIST' ? schedule : upcomingConsultations).filter(consultation => {
    const matchesSearch = consultation.nutritionist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.clientName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || consultation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getConsultationStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getConsultationStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'pending': return AlertCircle;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {user?.role === 'NUTRITIONIST' ? 'Consultation Schedule' : 'Book Consultation'}
        </h1>
        <Button onClick={() => setIsBooking(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {user?.role === 'NUTRITIONIST' ? 'Schedule Consultation' : 'Book New'}
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search consultations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      {isBooking && (
        <Card>
          <CardHeader>
            <CardTitle>
              {user?.role === 'NUTRITIONIST' ? 'Schedule New Consultation' : 'Book Consultation'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Consultation Type Selection */}
            <div>
              <Label>Consultation Type</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {consultationTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        consultationType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setConsultationType(type.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="font-medium">{type.name}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <Label>Select Date</Label>
              <div className="mt-2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-md border"
                />
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div>
                <Label>Select Time</Label>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-2">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      disabled={!isTimeSlotAvailable(selectedDate, time)}
                      className={!isTimeSlotAvailable(selectedDate, time) ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Nutritionist/Customer Selection */}
            {user?.role === 'CUSTOMER' && (
              <div>
                <Label>Select Nutritionist</Label>
                <Select value={selectedNutritionist} onValueChange={setSelectedNutritionist}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a nutritionist" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockNutritionists.map((nutritionist) => (
                      <SelectItem key={nutritionist.id} value={nutritionist.name} disabled={!nutritionist.available}>
                        <div className="flex items-center justify-between w-full">
                          <span>{nutritionist.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm">{nutritionist.rating}</span>
                            {!nutritionist.available && <Badge variant="destructive" className="text-xs">Unavailable</Badge>}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {user?.role === 'NUTRITIONIST' && (
              <div>
                <Label>Select Client</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Consultation Reason */}
            <div>
              <Label htmlFor="reason">Reason for Consultation</Label>
              <Textarea
                id="reason"
                placeholder="Describe why you need this consultation..."
                value={consultationReason}
                onChange={(e) => setConsultationReason(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsBooking(false)}>
                Cancel
              </Button>
              <Button onClick={user?.role === 'NUTRITIONIST' ? handleScheduleConsultation : handleBookConsultation}>
                {user?.role === 'NUTRITIONIST' ? 'Schedule Consultation' : 'Book Consultation'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Consultations List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {user?.role === 'NUTRITIONIST' ? 'Your Schedule' : 'Your Consultations'}
        </h2>
        
        {filteredConsultations.length > 0 ? (
          filteredConsultations.map((consultation) => {
            const StatusIcon = getConsultationStatusIcon(consultation.status);
            return (
              <Card key={consultation.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          {user?.role === 'NUTRITIONIST' ? consultation.clientName : consultation.nutritionist}
                        </h3>
                        <Badge variant={getConsultationStatusColor(consultation.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {consultation.status}
                        </Badge>
                        <Badge variant="outline">
                          {consultation.type}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{new Date(consultation.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(consultation.date).toLocaleTimeString()}</span>
                        </div>
                        {consultation.duration && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{consultation.duration} minutes</span>
                          </div>
                        )}
                      </div>
                      
                      {consultation.reason && (
                        <p className="mt-2 text-sm text-gray-600">
                          <strong>Reason:</strong> {consultation.reason}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      {consultation.status === 'confirmed' && new Date(consultation.date) > new Date() && (
                        <>
                          {consultation.type === 'video' && (
                            <Button size="sm">
                              <Video className="h-4 w-4 mr-2" />
                              Join Call
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </>
                      )}
                      
                      {consultation.status === 'pending' && (
                        <>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Confirm
                          </Button>
                          <Button variant="outline" size="sm">
                            <XCircle className="h-4 w-4 mr-2" />
                            Decline
                          </Button>
                        </>
                      )}
                      
                      {consultation.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          View Notes
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No consultations found</h3>
              <p className="text-gray-600 mb-4">
                {filterStatus === 'all' 
                  ? 'You haven\'t booked any consultations yet.'
                  : `No ${filterStatus} consultations found.`}
              </p>
              <Button onClick={() => setIsBooking(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Book Your First Consultation
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConsultationScheduler;
