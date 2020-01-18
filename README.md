# Burger Queen API

## Introdução

Irene, a CEO da RBB Inc. (acho que já a mencionei em algum lugar...), entrou em contato comigo querendo uma API e um aplicativo. Ela me explicou que abriu recentemente uma lanchonete e precisava de um aplicativo para controlar os pedidos dos clientes. Ela até me enviou um *e-mail* com as rotas que a API deveria ter.

Essa API, que será parte do projeto Burger Queen, foi criada com:

* Express
* MongoDB
* NodeJS
* JWT (Jason Web Token - autenticação)
* bcrypt (encriptação de senhas)
* multer (armazenamento de imagens no servidor)

Os testes com a API foram realizados com uma extensão do Visual Studio Code chamada REST Client e com o programa Postman.

A API apresenta as seguintes rotas:

[x] `/`

[x] `GET /`

[x] `/auth` 

[x] `POST /auth`

[x] `/users`

[x] `GET /users`

[x] `GET /users/:uid`

[x] `POST /users`

[x] `PUT /users/:uid`

[x] `DELETE /users/:uid`

[x] `/products`

[x] `GET /products`

[x] `GET /products/:productid`

[x] `POST /products`

[x] `PUT /products/:productid`

[x] `DELETE /products/:productid`

[x] `/orders`

[x] `GET /orders`

[x] `GET /orders/:orderid`

[x] `POST /orders`

[x] `PUT /orders/:orderid`

[x] `DELETE /orders/:orderid`

A API do Burger Queen está hospedada no Heroku