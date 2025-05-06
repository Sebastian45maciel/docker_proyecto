# Proyecto Dockerizado con Flask y React

Este proyecto es una aplicación web que utiliza Flask para el backend y React para el frontend. La aplicación está dockerizada para facilitar su despliegue y ejecución en cualquier entorno.

## Descripción

La aplicación tiene varias funcionalidades, como gestionar mensajes, obtener información sobre el clima y proporcionar un saludo personalizado. Utiliza una base de datos MySQL para almacenar los mensajes y un API para obtener el clima de una ciudad utilizando la API de OpenWeather.

### Funcionalidades:
- **Mensajes**: Obtener y crear mensajes almacenados en la base de datos.
- **Clima**: Obtener la información del clima de una ciudad específica.
- **Saludo**: Obtener un saludo personalizado según el nombre proporcionado en la URL.

## Tecnologías Utilizadas

- **Backend**: Flask
- **Frontend**: React
- **Base de datos**: MySQL
- **Docker**: Para contenerizar la aplicación
- **Docker Compose**: Para facilitar la orquestación de contenedores

## Arquitectura

Este proyecto está compuesto por los siguientes contenedores:
- **Backend**: Contenedor que ejecuta la aplicación Flask.
- **Frontend**: Contenedor que ejecuta la aplicación React.
- **Base de datos**: Contenedor que ejecuta MySQL.

## Instalación

### Prerrequisitos

Asegúrate de tener las siguientes herramientas instaladas:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Pasos para iniciar el proyecto

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/Sebastian45maciel/docker_proyecto.git
   cd docker_proyecto

Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno (asegúrate de usar una clave válida para la API de OpenWeather):

bash
Copiar
Editar
OPENWEATHER_API_KEY=tu_clave_api_de_openweather
DB_URL=mysql+pymysql://flaskuser:flaskpass@db/flaskdb
Construye y levanta los contenedores con Docker Compose:

bash
Copiar
Editar
docker-compose up --build
Accede a la aplicación:

Frontend: Abre tu navegador y ve a http://localhost:3000.

Backend (API): El API estará disponible en http://localhost:5000.

Rutas de la API
1. Obtener mensajes
GET /api/messages

Devuelve todos los mensajes almacenados en la base de datos.

Respuesta:

json
Copiar
Editar
[
  { "id": 1, "text": "Hola Mundo" },
  { "id": 2, "text": "Este es un mensaje" }
]
2. Crear mensaje
POST /api/messages

Crea un nuevo mensaje. El cuerpo debe ser un JSON con la propiedad text.

Ejemplo de solicitud:

json
Copiar
Editar
{
  "text": "Este es un nuevo mensaje"
}
Respuesta:

json
Copiar
Editar
{
  "message": "Mensaje guardado"
}
3. Obtener clima
GET /api/weather?city=NombreDeLaCiudad

Devuelve la información del clima de la ciudad proporcionada.

Ejemplo de solicitud:

bash
Copiar
Editar
GET http://localhost:5000/api/weather?city=London
Respuesta:

json
Copiar
Editar
{
  "city": "London",
  "temperature": 15.2,
  "description": "light rain"
}
4. Saludo
GET /api/echo?name=Nombre

Devuelve un saludo personalizado con el nombre proporcionado.

Ejemplo de solicitud:

bash
Copiar
Editar
GET http://localhost:5000/api/echo?name=Juan
Respuesta:

json
Copiar
Editar
{
  "message": "Hola, Juan!"
}
Docker
Este proyecto está completamente dockerizado. Si quieres ejecutar los contenedores localmente o en un servidor, puedes usar Docker Compose para levantar los servicios necesarios. Los contenedores están configurados para correr de forma aislada, pero pueden interactuar entre sí gracias a la red interna configurada en Docker Compose.

Docker Compose
Docker Compose se utiliza para definir y correr multi-contenedores. El archivo docker-compose.yml define los servicios que necesitamos para ejecutar la aplicación: frontend, backend y base de datos.

Comandos útiles
Levantar los contenedores: docker-compose up --build

Detener los contenedores: docker-compose down

Ver los logs de los contenedores: docker-compose logs -f

Acceder al contenedor del backend: docker exec -it <backend_container_name> /bin/bash

Buenas prácticas de desarrollo
Uso de ramas: Crea una rama para cada nueva funcionalidad o corrección.

Commits claros: Haz commits con mensajes descriptivos que indiquen claramente los cambios realizados.

Configuración de variables de entorno: Asegúrate de nunca subir tu archivo .env a GitHub. Usa .gitignore para protegerlo.

Contribución
Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

Haz un fork de este repositorio.

Crea una rama para tu nueva funcionalidad (git checkout -b feature/nueva-funcionalidad).

Realiza los cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').

Haz push a tu rama (git push origin feature/nueva-funcionalidad).

Abre un Pull Request para que podamos revisar tus cambios.