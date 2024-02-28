from django.contrib.auth.models import User

from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Flight, Booking


class FlightSerializer(ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'

class BookingSerializer(ModelSerializer):
    flight = FlightSerializer()
    class Meta:
        model = Booking
        fields = ['flight','seats','id']
    
