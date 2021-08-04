# api-products-nodejs

Este proyecto es una pequeña API en Nodejs usando Express, para la creación y listado de productos (nombre, descripción, precio e IVA (4, 10, 21)). 

## Instalación

Para la instalación del proyecto debes usar Docker. Ejecutando el comando

```bash
docker-compose build
docker-compose up
```
Se generaran unos contenedores con el servidor de la base de datos y el servidor de Node levantado, y podrás usar la API a través de la URL http://localhost:8000

## Uso

Para comprobar que todo esta correcto se ha generado una ruta de check del estado de la api: http://localhost:8000/health

La documentación de la api se encuentra en http://localhost:8000/docs con formato web o en http://localhost:8000/swagger.json con formato json y esta realizada con swagger.
