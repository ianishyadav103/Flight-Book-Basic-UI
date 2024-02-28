from django.urls import path
from . import views
from rest_framework.authtoken import views as authviews
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user_type = self.kwargs.get('user_type')
        token, created = Token.objects.get_or_create(user=user)
        
        isadmin = False
        if user.groups.filter(name='admin').exists():
            isadmin = True

        if(user_type == "User" and not(isadmin)):
            return Response({'token': token.key,'isadmin':isadmin})
        elif(user_type == "Admin" and (isadmin)):
            return Response({'token': token.key,'isadmin':isadmin})
        else:
            return Response({'message':'Unauthorized'},401 )
        
            

urlpatterns = [
#routes
path('',views.getRoutes),
#auth
 path('api-token-auth/<str:user_type>', CustomObtainAuthToken.as_view()),

#add flights by admin
 path('addflight', views.addflight),
 
 #remove flights by admin
 path('removeflight/<str:pk>', views.removeflight),

#get all flidhts
 path('allflights/<str:dep_date>/<str:ba_d>/<str:dep_time>/<str:ba_t>', views.allflights),

#user signup

 path('signup', views.signup_u),

 #user book
 path('bookflight/<str:pk>/<int:seats>',views.bookflight),
 
 #user bookings list
 path('bookedlist/',views.bookedlist), 
 
 #user bookings list
 path('allbookedlist/<int:flight_num>/<str:dep_time>/<str:ba>',views.allbookedlist),


 #return user type
 path('getusergroup/',views.getusergroup)
]
