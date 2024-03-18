from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer
from config.settings import API_URL, UID, OAUTH_SECRET, REDIRECT_URI
import requests

class OauthAPI(APIView):
    def get(self, request):
        intra_id = self.__get_intra_id(request)
        return Response(intra_id, status=status.HTTP_200_OK)
    def __get_intra_id(self, request):
        access_token = self.__get_access_token(request)
        url = API_URL + '/v2/me/'
        token = 'Bearer ' + access_token
        headers = { 'Authorization': token }
        response = requests.get(url, headers=headers)
        data = response.json()
        intra_id = data.get('login')
        user = User.objects.filter(intra_id=intra_id)
        if not user:
            user = User(intra_id=intra_id)
            user.save()
        return intra_id

    def __get_access_token(self, request):
        code = request.GET.get('code')
        url = API_URL + '/oauth/token'
        data = {
            'grant_type': 'authorization_code',
            'client_id': UID,
            'client_secret': OAUTH_SECRET,
            'code': code,
            'redirect_uri': REDIRECT_URI,
        }
        response = requests.post(url, data=data)
        data = response.json()
        return data.get('access_token')

class UsersAPI(APIView):
    def get(self, request):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)