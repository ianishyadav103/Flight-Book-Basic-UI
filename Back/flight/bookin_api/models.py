from django.db import models
from django.contrib.auth.models import User


class Flight(models.Model):
    flight_name = models.CharField(max_length=30)
    flight_number = models.CharField(max_length=10)
    departure_date = models.DateField()
    departure_time = models.TimeField()
    seats_available = models.IntegerField(default = 60)

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    seats = models.IntegerField()