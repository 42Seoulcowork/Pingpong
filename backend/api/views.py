from django.shortcuts import redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, logout
from .models import User
from .serializers import UserSerializer
from config.settings import API_URL, UID, OAUTH_SECRET, REDIRECT_URI
import requests

# 개발용 테스트 계정 생성
class TestAPI(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('/')
        try:
            test_user = User.objects.get(intra_id='test')
        except User.DoesNotExist:
            test_user = User(intra_id='test')
            test_user.save()
        login(request, test_user)
        return redirect('/')

class TestAPI1(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('/')
        try:
            test_user = User.objects.get(intra_id='test1')
        except User.DoesNotExist:
            test_user = User(intra_id='test1')
            test_user.save()
        login(request, test_user)
        return redirect('/')

class TestAPI2(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('/')
        try:
            test_user = User.objects.get(intra_id='test2')
        except User.DoesNotExist:
            test_user = User(intra_id='test2')
            test_user.save()
        login(request, test_user)
        return redirect('/')

class TestAPI3(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('/')
        try:
            test_user = User.objects.get(intra_id='test3')
        except User.DoesNotExist:
            test_user = User(intra_id='test3')
            test_user.save()
        login(request, test_user)
        return redirect('/')

class OauthAPI(APIView):
    def get(self, request):
        intra_id = self.__get_intra_id(request)
        user = User.objects.get(intra_id=intra_id)
        login(request, user)
        return redirect('/')
    
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

class MeAPI(APIView):
    def get(self, request):
        if request.user.is_authenticated is False:
            return Response(
                {
                    "message": "로그인이 필요합니다."
                }
                , status=status.HTTP_204_NO_CONTENT)
        intra_id = request.user.intra_id
        user = User.objects.get(intra_id=intra_id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SessionAPI(APIView):
    def get(self, request):
        session_id = request.session.session_key
        if session_id is None:
            return Response(
                {
                    "message": "로그인이 필요합니다."
                }
                , status=status.HTTP_204_NO_CONTENT)
        return Response(
            {
                "session_id": session_id
            }
            , status=status.HTTP_200_OK
        )
    
class LogoutAPI(APIView):
    def get(self, request):
        logout(request)
        return Response(
            {
                "message": "로그아웃이 완료되었습니다."
            },
            status=status.HTTP_200_OK
        )