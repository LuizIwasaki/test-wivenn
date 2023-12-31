
## Manual de compilação

#### API-BACKEND

Para rodar este projeto você vai primeiramente precisar duplicar o arquivo .env.exemple e renomear para .env

em seguida, será necessário adicionar atributos do banco nas seguintes variáveis de ambiente no seu .env

`DB_DATABASE`

`DB_USERNAME`

`DB_PASSWORD`
#### necessário instalar o composer dentro da pasta do backend.
```bash
  composer install
```
#### caso não funcione, certifique-se de ter o composer instalado no seu computador;
#### se o erro persistir, entre dentro da pasta onde está localizado a pasta do php > procure o arquivo "php.ini" > editar > procure e descomente a linha onde está os comandos
```bash
 ;extension=mysqli  ;extension=pdo_mysql 
```


#### comando para gerar a assinatura do JWT.
```bash
  php artisan jwt:secret
```
#### comando para gerar as migrations
```bash
  php artisan migration
```

#### comando para gerar o login de autenticação
```bash
  php artisan db:seed
```

#### em seguida, o servidor já poderá ser iniciado, utilizando o comando
```bash
  php artisan serve
```
#### FRONTEND

####  instale todas as dependências utilizando o comando
```bash
  npm i
```
#### Inicie a aplicação utilizando o comando
```bash
  npm run start
```
## IMPORTANTE
#### Para o usuário ter acesso as rotas é NECESSÁRIO que o mesmo esteja autenticado.
#### Após autenticado, será gerado um token na seção do usuário, possibilitando que ele navegue pelas rotas.

#### o login padrão para acesso é este abaixo.

| Parâmetro   | Tipo       | Atributo                         |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | admin@gmail.com|
| `password`   | `string`  |12345678 |

