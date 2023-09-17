# Next.js Teslo shop App
para correr localmente se necesita la base de datos
´´´
docker-compose up -d
´´´

* el -d, significa __detached__

*MongoDB URL local
```
MONGO_URL=mongodb://localhost:4000/teslodb
```

## Configurar las variables de entorno

Renombrar el archivo __.env.template__ a __.env__

## Llenar la base de datos con información de pruebas

Llamar a:
``` http://localhost:3000/api/seed ```