#ADMIN-----------------------------------

#login--

#add flights--

#remove flights--

#View all the booking based on flight number and time--

#User-----------------------------------

#signup--

#login--

#view all flights-- + filtered--

#book a flight if available seats--

#show my bookings--









#################################  MAIN   ##################
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes #new
from rest_framework.permissions import IsAuthenticated #new,
from .serializers import FlightSerializer,BookingSerializer
from . models import Flight,Booking
from datetime import datetime
from django.contrib.auth.forms import UserCreationForm
from django.db.models import Q

@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api',
        '/api/api-token-auth/<str:user_type>',
        '/signup',
        '/addflight',
        '/removeflight/<str:pk>',
        '/bookflight/<str:pk>/<int:seats>',
        '/bookedlist',
        '/allflights/<str:dep_date>/<str:ba_d>/<str:dep_time>/<str:ba_t>',
        '/allbookedlist/<int:flight_num>/<str:dep_time>/<str:ba>',
        '/getusergroup',
    ]
    return Response(routes)


#add flight by admin
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addflight(request):
        if request.user.groups.filter(name='admin').exists():
                my_serializer = FlightSerializer(data=request.data) 
                if my_serializer.is_valid():
                    my_serializer.save()
                    return Response({'message':'Added'},200) 
                return Response({'message':'Invalid Input'},200) 
        return Response({'message':'Unauthorized'},200) 

#remove flight by admin
@api_view(['delete'])
@permission_classes([IsAuthenticated])
def removeflight(request,pk):
       if request.user.groups.filter(name='admin').exists():
          temp_flight = Flight.objects.filter(id = pk).first()
          if(temp_flight):
                temp_flight.delete()
                return Response({'message':"Deleted"},200)
          return Response({'message':"No such record exists"},200)
       return Response({'message':'Unauthorized'},200) 


#return all flights
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allflights(request,dep_date,ba_d,dep_time,ba_t):
        #add filter: date + time: tesig rewuired and reduce(permorm testing when ui ready)
        current_datetime = datetime.now()



        if(not is_valid_time(dep_time)): #test remain
            return Response({'message':"Invalid Input"},406)
      
        if(not is_valid_date(dep_date)): #test remain
            return Response({'message':"Invalid Input"},406)


        if(ba_d=='b'):
 
            if(ba_t=='b'): #bb
                temp_flights= Flight.objects.filter( departure_date__lte=dep_date, departure_time__lte=dep_time)
        
            elif(ba_t=='a'): #ba
                temp_flights= Flight.objects.filter(  departure_date__lte=dep_date , departure_time__gte=dep_time)
            else:
                return Response({'message':"Invalid Input"},406)
        elif(ba_d=='a'):

            if(ba_t=='a'): #aa
                temp_flights= Flight.objects.filter(  departure_date__gte=dep_date , departure_time__gte=dep_time)
                print(dep_date)
            

            elif(ba_t=='b'): #ab
                temp_flights= Flight.objects.filter( departure_date__gte=dep_date, departure_time__lte=dep_time)
            else:
                return Response({'message':"Invalid Input"},406)
        




        my_serializer = FlightSerializer(temp_flights, many = True)
        return Response(my_serializer.data,200)


#user aignup
@api_view(['POST'])
def signup_u(request):
        form = UserCreationForm(request.data)
        if form.is_valid():
            form.save()
            return Response({'message':'Registered Successfully'},201) 
        return Response({'message':form.errors},409)





#user book  //lock and transaction required
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def bookflight(request,pk,seats):
        temp_flight = Flight.objects.filter(id = pk).first()

        if(not temp_flight):
            return Response({'message':"No such record exists"},200)
        
        if(temp_flight.seats_available < seats):
                return Response({'message':"Less seats remaining"},200)
        
        if(seats <1):
                return Response({'message':"Minimum 1 seat can be booked"},200)
             
        
        temp_book = Booking(user=request.user,flight=temp_flight,seats =seats)
        temp_book.save()
        temp_flight.seats_available = temp_flight.seats_available - seats
        temp_flight.save()
        return Response({'message':"Booked"},201)

#user booking
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def bookedlist(request):
        temp_booked_flights= Booking.objects.filter(user=request.user)
        my_serializer = BookingSerializer(temp_booked_flights, many = True)
        return Response(my_serializer.data,200)#user booking

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getusergroup(request):
        isadmin = False
        if request.user.groups.filter(name='admin').exists():
            isadmin = True
        return Response({'isadmin':isadmin},200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allbookedlist(request,flight_num,dep_time,ba):
        #fliter added: flight number + time filter 


        if(not is_valid_time(dep_time)): #test remain
            return Response({'message':"Invalid Input"},406)
            

        if request.user.groups.filter(name='admin').exists():
            if(flight_num==0):
                if(ba=='b'):
                    temp_all_booked_flights= Booking.objects.filter(flight__departure_time__lte=dep_time)
                elif(ba=='a'): 
                    temp_all_booked_flights= Booking.objects.filter(flight__departure_time__gte=dep_time)
                else:
                    temp_all_booked_flights= Booking.objects.all()

            else:
                if(ba=='b'):
                    temp_all_booked_flights= Booking.objects.filter(flight__flight_number = flight_num,flight__departure_time__lte=dep_time)
                elif(ba=='a'): 
                    temp_all_booked_flights= Booking.objects.filter(flight__flight_number = flight_num,flight__departure_time__gte=dep_time)
                else:
                    temp_all_booked_flights= Booking.objects.filter(flight__flight_number = flight_num)
                   
                   
            my_serializer = BookingSerializer(temp_all_booked_flights, many = True)
            return Response(my_serializer.data,200)
        return Response({'message':'Unauthorized'},401) 



#dat time validation
def is_valid_date(date_string, format='%Y-%m-%d'):
    try:
        datetime.strptime(date_string, format)
        return True
    except ValueError:
        return False

def is_valid_time(time_string, format='%H:%M:%S'):
    try:
        datetime.strptime(time_string, format)
        return True
    except ValueError:
        return False