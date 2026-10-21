# MediaDesk - Panel de préstamo de equipo audiovisual

##  Descripción del proyecto

**MediaDesk** es una aplicación desarrollada con React y TypeScript para consultar y revisar solicitudes de préstamo de equipo audiovisual de un laboratorio universitario.

La aplicación permite buscar solicitudes por nombre del recurso o persona solicitante, filtrar por estado, consultar la cantidad de resultados y marcar solicitudes para revisión. Los datos se mantienen localmente en memoria, por lo que no se necesita una base de datos ni un servidor backend.

##  Objetivo del proyecto

Demostrar el uso de contratos explícitos mediante TypeScript y la composición de componentes en React, aplicando los siguientes conceptos:

- Definición de interfaces y tipos para representar solicitudes y propiedades de los componentes.
- Diferenciación entre props requeridas y opcionales, utilizando valores predeterminados.
- Manejo de eventos del DOM con los tipos correspondientes de TypeScript.
- Uso de `React.ReactNode` para crear componentes reutilizables mediante `children`.
- Implementación del patrón Render Props mediante funciones hijas.
- Comunicación entre componentes a través de callbacks tipados.
- Filtrado de datos locales y actualización del estado de las solicitudes marcadas para revisión.

##  Tecnologías utilizadas

- **React:** construcción de la interfaz mediante componentes reutilizables.
- **TypeScript:** definición de tipos, interfaces y contratos entre componentes.
- **Vite:** servidor de desarrollo y herramienta de compilación.
- **ESLint:** revisión estática del código.

##  Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js versión 18.0 o superior.
- npm, incluido con Node.js.
- Git, si se desea clonar el repositorio.

##  Instalación y ejecución

### 1. Clonar el repositorio

Si se desea obtener el proyecto desde GitHub, ejecutar:

```bash
git https://github.com/GraceCalde/Panel-de-prestamo-de-equipo-audiovisual.git
```

Después, ingresar a la carpeta del proyecto:

```bash
cd mediadesk
```



### 2. Instalar las dependencias

Ejecutar el siguiente comando desde la carpeta del proyecto:

```bash
npm install
```

Este comando instala las dependencias necesarias para ejecutar y compilar la aplicación.

### 3. Iniciar el servidor de desarrollo

Ejecutar:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local para acceder a la aplicación, normalmente:

```text
http://localhost:5173/
```

Abrir la dirección indicada en el navegador para visualizar el panel de MediaDesk.

### 4. Verificar TypeScript y compilar el proyecto

Ejecutar:

```bash
npm run build
```

Este comando realiza la comprobación de tipos mediante `tsc -b` y después genera la compilación de producción con Vite.

La compilación debe finalizar correctamente, sin errores de TypeScript.

### 5. Ejecutar la revisión de código

De manera opcional, se puede ejecutar:

```bash
npm run lint
```

Este comando utiliza ESLint para revisar el código del proyecto.

##  Funcionalidades principales

### Consulta y filtrado de solicitudes

El panel permite buscar solicitudes por el nombre del recurso o de la persona solicitante. También incluye un selector para filtrar las solicitudes por estado.

El formulario mantiene sus valores mediante el estado de React y comunica los criterios de búsqueda al componente padre a través de un callback tipado.

Cuando el campo de búsqueda está vacío y no se selecciona un estado específico, se muestran todas las solicitudes disponibles.

### Visualización de resultados

Cada solicitud se presenta mediante un componente reutilizable que muestra la información correspondiente al préstamo, como el código, el recurso, la categoría, la persona solicitante, la fecha de devolución y el estado.

La interfaz actualiza el contador de resultados según los filtros aplicados y presenta un mensaje cuando no existen coincidencias.

### Marcado para revisión

Cada tarjeta incluye una acción para marcar una solicitud para revisión.

Al activar esta opción, la tarjeta cambia su apariencia visual para identificarla fácilmente y el contador de solicitudes marcadas se actualiza.

La acción funciona de manera alternada: al pulsar nuevamente el botón, la solicitud deja de estar marcada. El componente padre controla el estado para mantener la información sincronizada.

### Contenido reutilizable

La interfaz utiliza un marco llamado `WorkspaceSection`, que recibe contenido mediante `children` y permite agrupar diferentes elementos sin depender de una estructura específica.

También se utiliza `StatusIndicator`, que recibe una función hija para presentar contenido diferente según el estado de la búsqueda.

##  Validaciones y escenarios probados

Se realizaron pruebas manuales para comprobar el funcionamiento de la aplicación y el comportamiento de los componentes.

### 1. Consulta general con el campo vacío

**Procedimiento:**

1. Dejar vacío el campo de búsqueda.
2. Mantener el filtro de estado en su opción general.
3. Presionar el botón de búsqueda o limpiar los filtros.

**Resultado esperado:**

Se muestran las cuatro solicitudes disponibles en memoria. El contador refleja el total de coincidencias y la interfaz presenta correctamente las tarjetas y el indicador de estado.
![Campo vacio](/src/evidences/campo_vacio.PNG)

### 2. Consulta con coincidencias

**Procedimiento:**

1. Escribir `Cámara` en el campo de búsqueda o seleccionar el estado `Pendiente`.
2. Presionar el botón de búsqueda.

**Resultado esperado:**

La lista muestra únicamente las solicitudes que cumplen los criterios seleccionados. El contador se actualiza y las tarjetas presentan los resultados correspondientes.
![Camaras](/src/evidences/Sc_1.PNG)

### 3. Consulta sin coincidencias

**Procedimiento:**

1. Escribir `Laptop` en el campo de búsqueda.
2. Presionar el botón de búsqueda.

**Resultado esperado:**

Se muestra el mensaje `No se encontraron coincidencias`. La interfaz conserva su estructura y no presenta errores durante la consulta.
![Laptop](/src/evidences/Sc_2.PNG)

### 4. Marcar una solicitud para revisión

**Procedimiento:**

1. Seleccionar cualquier tarjeta.
2. Presionar el botón `Marcar para revisión`.
3. Volver a presionar el botón para comprobar el comportamiento alternado.

**Resultado esperado:**

La tarjeta marcada se distingue mediante un borde y un fondo amarillo. El botón cambia a `✓ Marcado para revisión` y el contador de solicitudes marcadas aumenta.

Al presionar nuevamente el botón, la marca se elimina y el contador se actualiza de forma coherente.

![Marcar para revisión](/src/evidences/Sc_3.PNG)

##  Decisiones de diseño y tipado

### 1. Contratos explícitos con TypeScript

Se utilizan tipos e interfaces para definir la estructura de las solicitudes, los estados permitidos y las propiedades de los componentes.

Estos contratos permiten identificar inconsistencias durante el desarrollo y facilitan la comunicación entre los componentes.

2. Props requeridas y opcionales

En LoanCardProps, la propiedad request es requerida porque cada tarjeta necesita recibir una solicitud válida para mostrar su información.

Las propiedades variant e isMarkedForReview son opcionales y cuentan con valores predeterminados. Por ejemplo, variant = 'normal' permite mostrar una presentación consistente cuando no se especifica una variante.

Esta decisión evita que el componente dependa de que todos sus consumidores proporcionen las mismas propiedades opcionales.

3. Manejo de eventos del DOM

Se utilizan los tipos de eventos correspondientes a cada elemento:

ChangeEvent<HTMLInputElement> para controlar los cambios en el campo de búsqueda.

ChangeEvent<HTMLSelectElement> para controlar la selección del filtro.

FormEvent<HTMLFormElement> para gestionar el envío del formulario y utilizar preventDefault() para evitar la recarga de la página.

MouseEvent o el tipo de callback apropiado para manejar las interacciones de clic, según la implementación del componente.

El uso de estos tipos facilita el acceso seguro a las propiedades de los elementos y mantiene la coherencia de los eventos.

4. Uso de React.ReactNode en WorkspaceSection

El componente WorkspaceSection recibe children: React.ReactNode para mostrar contenido proporcionado por su componente padre.

Esto permite reutilizar el mismo marco para organizar diferentes elementos, como el formulario de búsqueda, la lista de solicitudes o un bloque de ayuda, sin acoplarlo a un contenido específico.

5. Uso de funciones hijas en StatusIndicator

El componente StatusIndicator utiliza una función hija para recibir información sobre el estado de la búsqueda, como isSearching.

La función devuelve un React.ReactNode según el estado recibido, lo que permite presentar un mensaje durante la búsqueda y otro cuando los resultados están disponibles.

Este patrón, conocido como Render Props, permite separar la lógica del estado de la presentación visual.

6. Estado controlado por el componente padre

El componente principal administra los filtros aplicados, los resultados y la colección de códigos de solicitudes marcadas.

Los componentes hijos notifican las acciones mediante callbacks tipados, mientras que el padre actualiza el estado de React. De esta manera, se evita modificar directamente los datos originales y se mantiene un flujo de información organizado.

7. Datos locales en memoria

Las solicitudes se almacenan localmente para demostrar el funcionamiento de los filtros, los estados y la comunicación entre componentes.

No se implementa una base de datos, autenticación ni un servidor backend, ya que el objetivo de la actividad es practicar TypeScript y la composición de componentes en React.




