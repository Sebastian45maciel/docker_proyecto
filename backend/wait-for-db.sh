#!/bin/bash
# Esperar hasta que la base de datos esté disponible
while ! mysqladmin ping -h db --silent; do
  echo "Esperando que la base de datos esté lista..."
  sleep 2
done

echo "Base de datos lista, iniciando el backend..."
# Iniciar la aplicación Flask
python app.py
