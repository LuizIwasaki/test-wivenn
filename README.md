
## Manual de compilação

#### API-BACKEND

Para rodar este projeto você vai primeiramente precisar duplicar o arquivo .env.exemple e renomear para .env

em seguida, será necessário adicionar atributos do banco nas seguintes variáveis de ambiente no seu .env

`DB_DATABASE`

`DB_USERNAME`

`DB_PASSWORD`
#### necessário instalar o composer dentro da pasta do backend.
```http
  composer install
```
#### comando para gerar a assinatura do JWT.
```http
  php artisan jwt:secret
```
#### em seguida, o servidor já poderá ser iniciado, utilizando o comando
```http
  php artisan serve
```
#### FRONTEND

####  instale todas as dependências utilizando o comando
```http
  npm i
```
#### Inicie a aplicação utilizando o comando
```http
  npm run start
```
## IMPORTANTE
#### Para o usuário ter acesso as rotas é NECESSÁRIO que o mesmo esteja autenticado.
#### Após autenticado, será gerado um token na seção do usuário, possibilitando que ele navegue pelas rotas.

#### o login padrão para acesso é este abaixo.

#### o cadastro é gerado AUTOMATICAMENTE no banco.
| Parâmetro   | Tipo       | Atributo                         |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | admin@gmail.com|
| `password`   | `string`  |12345678 |

