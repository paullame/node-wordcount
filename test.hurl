POST http://127.0.0.1:3000/wordcount
Accept: */*
content-type: text/plain
`bonjour`

HTTP 200

POST http://127.0.0.1:3000/
Accept: */*
content-type: text/plain
`bonjour`

HTTP 404

POST http://127.0.0.1:3000/wordcount
Accept: */*
content-type: text/plain

HTTP 400

POST http://127.0.0.1:3000/wordcount
Accept: */*
content-type: application/json
{
    "bonjour": "ok"
}

HTTP 400