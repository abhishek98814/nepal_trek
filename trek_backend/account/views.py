from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response 
from .serializers import RegisterSerializer,  UserSerializer
from django.contrib.auth import get_user_model 
from .serializers import RegisterSerializer, UserSerializer


User = get_user_model()



class RegisterView(generics.createAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer()
    permissions_classes = [permissions.AllowAny]


    def create(self, request, *args, **kwargs):
         serializer = self.get_serializer(data=request.data)
         serializers_class = RegisterSerializer(data=request.data)
         user = serializer.save()
         refresh = RefreshToken.for_user(user)
         return Response({
              'user':UserSerializer(user).data,
              'refresh':str(refresh),
                'access':str(refresh.access_token)
         })
    

class ProfileView(generics.RetriveAPIView):
     queryset = User.objects.all()
     permissions_classes = [permissions.isAuthenticated]

    #  def get
     def get_object(self):
        return self.request.user







