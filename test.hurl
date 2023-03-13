POST http://127.0.0.1:3000/words
Accept: */*
content-type: text/plain
`bonjour je m'appelle Paul et j'aime la biere`

HTTP 200

POST http://127.0.0.1:3000/lines
Accept: */*
content-type: text/plain
`bonjour je m'appelle Paul et j'aime la biere`

HTTP 200

POST http://127.0.0.1:3000/characters
Accept: */*
content-type: text/plain
`bonjour je m'appelle Paul et j'aime la biere`

HTTP 200

POST http://127.0.0.1:3000/
Accept: */*
content-type: text/plain
`bonjour je m'appelle Paul et j'aime la biere`

HTTP 404

POST http://127.0.0.1:3000/words
Accept: */*
content-type: text/plain

HTTP 400

POST http://127.0.0.1:3000/words
Accept: */*
content-type: application/json
{
    "bonjour": "ok"
}

HTTP 400