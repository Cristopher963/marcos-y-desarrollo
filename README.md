# TO DO APP FULLSTACK

Aplicación web Full Stack desarrollada con **React + Vite** en el frontend y **Spring Boot + MySQL** en el backend.

La aplicación permite a los usuarios registrarse, iniciar sesión y gestionar tareas de forma dinámica mediante una API REST conectada a una base de datos MySQL.

El sistema facilita la organización de tareas mediante operaciones CRUD, clasificación por prioridad y visualización en diferentes secciones para mejorar la productividad.

---

# Características

- Registro de usuarios.
- Inicio de sesión.
- Gestión completa de tareas (CRUD).
- Organización de tareas por prioridad.
- Calendario interactivo.
- Comunicación entre frontend y backend mediante API REST.
- Persistencia de datos en MySQL.
- Arquitectura organizada por capas.

---

# Tecnologías Utilizadas

## Frontend

- React
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- Fetch API

## Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Maven

## Base de Datos

- MySQL

## Herramientas

- Git
- GitHub

---

# Estructura del Proyecto

```text
marcos-y-desarrollo/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── Componentes/
│   │   ├── Paginas/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   └── ...
│
├── backend/
│   ├── src/main/java/com/marcosweb/backend/
│   │   ├── controller/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── service/
│   │   └── ...
│   └── pom.xml
│
└── README.md
```

---

#  Descripción de las Páginas

### 🏠 Inicio
Página principal donde el usuario puede visualizar y gestionar todas sus tareas.

### ⭐ Importante
Muestra únicamente las tareas marcadas como prioritarias.

### 📝 Planes
Sección destinada a la organización de planes y actividades.

### 📅 Calendario
Calendario interactivo para visualizar las tareas según su fecha.

### 👤 Registro / Inicio de Sesión
Permite registrar nuevos usuarios e iniciar sesión para acceder a todas las funcionalidades del sistema.

---

#  Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/Cristopher963/marcos-y-desarrollo.git
```

---

## 2. Ejecutar el Frontend

Entrar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar la aplicación:

```bash
npm run dev
```

El frontend estará disponible en:

```
http://localhost:5173/
```

---

## 3. Ejecutar el Backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Ejecutar Spring Boot:

### Windows

```bash
mvnw spring-boot:run
```

### Linux / macOS

```bash
mvn spring-boot:run
```

El backend estará disponible en:

```
http://localhost:8080/
```

---

# 🗄 Configuración de la Base de Datos

Antes de ejecutar el backend, configure la conexión a MySQL en el archivo:

```
backend/src/main/resources/application.properties
```

Asegúrese de crear previamente la base de datos correspondiente.

---

# ✅ Funcionalidades

- Registro de usuarios.
- Inicio de sesión.
- Crear tareas.
- Editar tareas.
- Eliminar tareas.
- Visualizar tareas.
- Organización por prioridad.
- Calendario interactivo.
- Consumo de API REST.
- Persistencia de datos en MySQL.
- Interfaz responsive.

---

# 🔗 Integración Frontend - Backend

La comunicación entre React y Spring Boot se realiza mediante peticiones HTTP utilizando **Fetch API** y una **API REST**.

Ejemplo:

```javascript
fetch("http://localhost:8080/tareas")
```

---

# 🏗 Arquitectura

El backend sigue una arquitectura por capas:

```text
Controller
     │
Service
     │
Repository
     │
MySQL
```

Esta estructura facilita el mantenimiento, la escalabilidad y la organización del código.

---

# 👥 Integrantes

- Cristopher Chauca
- Krhis Remigio
- Santiago Capcha

---

# 📄 Licencia

Proyecto desarrollado con fines académicos y educativos.