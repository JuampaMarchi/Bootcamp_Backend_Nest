## Descripcion

Proyecto de Blog utilizando NestJS

Aplicacion de backend para un blog donde los usuarios podran registrarse, realizar posteos y a su vez, comentar en los posteos de otros usuarios. Base de datos con mongo atlas, y roles de administradores para poder moderar el contenido.

Se realizo un middleware de autenticacion basado en roles (que utiliza la autenticacion por medio de JWT) para que solo los propios usuarios (y administradores) puedan editar su perfil o posteos. Y tambien para restringir el acceso a rutas para administradores.

## Instalacion

```bash
$ npm install
```

## Para correr la app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Variables de Entorno

```bash
# Es necesario cargar las siguientes variables de entorno

PORT => Puerto donde correra la aplicacion

NOD_ENV => Señalar si la aplicacion corre en entorno de desarrollo 'DEV', o produccion 'PROD'

MONGO_ATLAS_URI => la direccion URI de la base de datos de Mongo Atlas. Tambien puede utilizarse direccion ip de base de datos local

JWT_SECRET => palabra secreta necesaria para JWT

```
## Rutas

```bash

Para ver el detalle de las rutas correr aplicacion y entrar en la ruta 'api/docs' (una vez inicializada la aplicacion) para verlo de manera interactiva con Swagger.

```

