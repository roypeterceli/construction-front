<p style="text-align: center;">
  <img src="https://wowperu.pe/_astro/internet-hogar-wow-peru.lf6fogPl.svg" alt="Logo Wow Perú" height="50">
</p>

## Acerca de

Wow Perú es una empresa proveedora de internet, telefonia IP y Cable que utiliza una red de Fibra Óptica. En Materia Gris tuvimos el encargo de implementar el sistema de gestión de clientes e instalación de servicios.

## Sobre el proyecto

Este proyecto cubre la necesidad de un sistema atención de colas para los centro de atención CEX: [wow-turnos-frontend]
(https://gitlab.com/wow-turnos/frontend.turnos.wowperu.pe)

## Encargados del Proyecto

### Gestión de Proyecto
- Cesar Vallejo
- Ricardo Ormeño

### Desarrollo Frontend
- Roy Celino 
- Alvaro Iturrizaga

## Requisitos previos para iniciar la aplicación.

* Antes de comenzar, asegúrese de que su entorno de desarrollo incluya Node.js y un administrador de paquetes npm.

* Node.js
    * Este proyecto requiere Node.js versión 18 o posterior.

* NPM
    * Este proyecto requiere NPM versión 11 o posterior.

* Angular CLI
    * Instala Angular CLI usando npm, abre la terminal e ingresa el siguiente comando.

```
npm install -g @angular/cli
```

* Ingrese a la carpeta raíz del proyecto e instale las dependencias con el siguiente comando.

```
npm install
```

* Inicie la aplicación con el siguiente comando.

```
ng serve
```

* Se abrirá automaticamente una pestaña en su navegador en la dirección.

```
http://localhost:4200/
```

## Para configurar el proyecto, después de clonar las fuentes, se debe editar el archivo:

```
src\environments\environment.ts
```

Y modificar el siguiente contenido:

```
export const environment = {
  api: {
    sgc: 'https://api-qa.wowperu.pe/api',
    gestionConstruccion: 'http://127.0.0.1:8000/api'
  }
};

```


## Build dockerfile
Build for staging or qa environment run:
```bash
docker build -t tms-frontend:staging --build-arg ENV=staging .
```

Build for production environment run:
```bash
docker build -t tms-frontend .
```
