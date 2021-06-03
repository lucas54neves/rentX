# rentX

A car rental API

## Comandos principais

### Virtualização com Docker

#### Para criar a imagem

```
docker build -t rentx .
```

#### Para executar o container

```
docker run -p 3333:3333 rentx
```

#### Para subir os serviços com o Docker-compose

Os dois comandos anteriores não são necessários caso use o Docker-compose.

```
docker-compose up
```

Para subir os serviços em background:

```
docker-compose up -d
```

### Banco de dados

#### Criar uma migration

```
yarn typeorm migration:create -n <MIGRATION_NAME>
```

#### Executar as migrations

```
yarn typeorm migration:run
```

#### Reverter migration

```
yarn typeorm migration:revert
```
