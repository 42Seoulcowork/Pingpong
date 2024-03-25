### API

API는 https://127.0.0.1 뒤에 /api/ 를 붙여서 사용합니다.

GET /api/session

```
HTTP 200 OK
{
    "session_id": session_id,
}

HTTP 401 Unauthorized
{
    "message": "로그인이 필요합니다.",
}
```

DELETE /api/session

```
HTTP 204 No Content
{
    "message": "로그아웃 되었습니다."
}
```

GET /api/me

```
HTTP 200 OK
{
    "intra_id": "hujeong",
    "created_at": "2024-03-25T17:11:57.775105+09:00",
    "game_status": false,
    "win": 0,
    "lose": 0
}

HTTP 401 Unauthorized
{
    "message": "로그인이 필요합니다."
}
```
