TO DO APP FULLSTACK

Aplicación web fullstack desarrollada con React + Vite en el frontend y Spring Boot + MySQL en el backend.
La aplicación permite a los usuarios registrarse, iniciar sesión y gestionar tareas de manera dinámica utilizando una API REST conectada a base de datos.

El sistema permite organizar tareas, editarlas, clasificarlas por prioridad y visualizarlas en diferentes secciones para una mejor gestión.

Este proyecto fue desarrollado utilizando React para el frontend, Spring Boot para el backend y GitHub para el control de versiones.

Tecnologías utilizadas:

✔ React
✔ Vite
✔ JavaScript (ES6+)
✔ CSS3
✔ Fetch API
✔ Spring Boot
✔ Spring Web
✔ Spring Data JPA
✔ Hibernate
✔ MySQL
✔ Maven
✔ Git & GitHub

Estructura del proyecto:

frontend
 ┣ src
 ┃ ┣ assets
 ┃ ┣ Componentes
 ┃ ┃ ┣ Footer.jsx
 ┃ ┃ ┣ Footer.css
 ┃ ┃ ┣ Registro.jsx
 ┃ ┃ ┗ Registro.css
 ┃ ┣ Paginas
 ┃ ┃ ┣ Inicio.jsx
 ┃ ┃ ┣ Importante.jsx
 ┃ ┃ ┣ Planes.jsx
 ┃ ┃ ┗ Calendario.jsx
 ┃ ┣ api.js
 ┃ ┣ App.jsx
 ┃ ┣ App.css
 ┃ ┣ main.jsx
 ┃ ┗ index.css
 ┗ otros archivos de configuración

backend
 ┣ src/main/java/com/marcosweb/backend
 ┃ ┣ controller
 ┃ ┃ ┣ UsuarioController.java
 ┃ ┃ ┣ TareaController.java
 ┃ ┃ ┣ CategoriaController.java
 ┃ ┃ ┣ RecordatorioController.java
 ┃ ┃ ┗ SubtareaController.java
 ┃ ┣ entity
 ┃ ┃ ┣ Usuario.java
 ┃ ┃ ┣ Tarea.java
 ┃ ┃ ┣ Categoria.java
 ┃ ┃ ┣ Recordatorio.java
 ┃ ┃ ┗ Subtarea.java
 ┃ ┣ service
 ┃ ┗ repository

📄 Descripción de las páginas

Inicio → Página principal donde se muestran y gestionan las tareas.
Importante → Muestra las tareas clasificadas como prioritarias.
Planes → Sección destinada a planes y organización adicional.
Calendario → Calendario interactivo para visualización de fechas.
Registro / Login → Permite registrar usuarios e iniciar sesión.

Instalación y ejecución:

1️⃣ Clonar el repositorio

git clone https://github.com/Cristopher963/marcos-y-desarrollo.git

2️⃣ Entrar a la carpeta del frontend

cd frontend

3️⃣ Instalar dependencias

npm install

4️⃣ Ejecutar React

npm run dev

El frontend se ejecutará en:

http://localhost:5173/

Configuración del backend:

1️⃣ Entrar a la carpeta backend

cd backend

2️⃣ Ejecutar Spring Boot

Windows:

./mvnw spring-boot:run

Linux/Mac:

mvn spring-boot:run

El backend se ejecutará en:

http://localhost:8080/

Funcionalidades:

✔ Registro de usuarios
✔ Inicio de sesión
✔ CRUD de tareas
✔ Creación de tareas
✔ Edición de tareas
✔ Visualización dinámica de tareas
✔ Organización por prioridad
✔ Consumo de API REST
✔ Persistencia en MySQL
✔ Interfaz responsive
✔ Calendario interactivo

Integración Frontend y Backend:

La comunicación entre React y Spring Boot se realiza mediante Fetch API y endpoints REST.

Ejemplo:

fetch("http://localhost:8080/tareas")

Repositorio:

Repositorio del proyecto:

GitHub - marcos-y-desarrollo

Integrantes:

Cristopher Chauca
Krhis Remigio
Santiago Capcha

Licencia:

Proyecto desarrollado con fines educativos y académicos.