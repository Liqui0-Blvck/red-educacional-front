# Red Educacional - Plataforma de Gestión Educativa

## Descripción

Red Educacional es una plataforma web integral diseñada para facilitar la gestión académica y administrativa de instituciones educativas. Proporciona un entorno digital completo que conecta a estudiantes, profesores, administrativos y apoderados, optimizando los procesos educativos y mejorando la comunicación entre todos los actores del ecosistema escolar.

## Características Principales

### Gestión Académica
- **Administración de Cursos**: Visualización y gestión de cursos, grados y secciones.
- **Seguimiento de Estudiantes**: Control de asistencia, calificaciones y rendimiento académico.
- **Gestión de Profesores**: Asignación de profesores jefe y docentes por asignatura.

### Administración Escolar
- **Gestión de Matrículas**: Proceso de inscripción y renovación de matrículas.
- **Calendario Escolar**: Organización de eventos, evaluaciones y actividades académicas.
- **Reportes y Estadísticas**: Generación de informes para análisis y toma de decisiones.

### Comunicación
- **Mensajería Interna**: Sistema de comunicación entre profesores, estudiantes y apoderados.
- **Notificaciones**: Alertas sobre eventos importantes, reuniones y fechas clave.

### Herramientas de Aprendizaje
- **Recursos Digitales**: Biblioteca de materiales educativos.
- **Asistencia con IA**: Herramientas de inteligencia artificial para apoyo educativo.

## Tecnologías Utilizadas

- **Frontend**: React, TypeScript, TailwindCSS
- **Desarrollo**: Vite
- **UI/UX**: Componentes personalizados, diseño responsivo
- **Gráficos y Visualización**: ApexCharts
- **Gestión de Estado**: React Query

## Instalación y Configuración

### Requisitos Previos
- Node.js (versión recomendada: 16.x o superior)
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# Ingresar al directorio del proyecto
cd red-educacional-front

# Instalar dependencias
npm install
# o
yarn install
```

### Ejecución en Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
# o
yarn dev
```

La aplicación estará disponible en [http://localhost:5174](http://localhost:5174)

### Compilación para Producción

```bash
# Construir la aplicación para producción
npm run build
# o
yarn build
```

## Estructura del Proyecto

```
red-educacional-front
├── public            # Archivos públicos y estáticos
├── src               # Código fuente
│   ├── App           # Componente principal de la aplicación
│   ├── api           # Servicios y llamadas a API
│   ├── assets        # Recursos estáticos (imágenes, fuentes, etc.)
│   ├── components    # Componentes reutilizables
│   ├── config        # Configuraciones de la aplicación
│   ├── context       # Contextos de React
│   ├── hooks         # Hooks personalizados
│   ├── pages         # Páginas de la aplicación
│   │   ├── academic  # Módulo académico
│   │   ├── administrative # Módulo administrativo
│   │   └── ai        # Herramientas de IA
│   ├── routes        # Configuración de rutas
│   ├── styles        # Estilos globales
│   ├── types         # Definiciones de tipos TypeScript
│   └── utils         # Utilidades y funciones auxiliares
├── SvgIcons          # Iconos SVG para la aplicación
└── [Archivos de configuración] # Configuraciones de herramientas y entorno
```

## Contribución

Para contribuir al proyecto, por favor sigue estos pasos:

1. Crea un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`)
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo [Especificar licencia]

## Contacto

Para más información o soporte, contacta a [información de contacto]

```tsx
const headerRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{
		path: `${componentsPages.uiPages.to}/*`,
		element: <ComponentAndTemplateHeaderTemplate />,
	},
	{ path: '', element: null },
	{ path: '*', element: <DefaultHeaderTemplate /> },
];
```

You can set the "Header Templates" to be displayed on the paths you want. If you don't want any "Header" in a path, you can set the element to `null`.

If you will have data about the page in "Header", specify that there will not be any "Header" in that path with `null` and define it within the page. So you don't have to worry about moving the data up.

#### src/components/router/ContentRouter.tsx

You can use [React Lazy](https://react.dev/reference/react/lazy#lazy) when importing pages.

```tsx
const contentRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: <LoginPage /> },
	{ path: authPages.profilePage.to, element: <ProfilePage /> },
	{ path: examplePages.duotoneIconsPage.to, element: <IconsPage /> },
	{ path: '*', element: <NotFoundPage /> },
];
```

##### Example Page

```tsx
import React from 'react';
import PageWrapper from '../components/layouts/PageWrapper/PageWrapper';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../components/layouts/Subheader/Subheader';
import Container from '../components/layouts/Container/Container';

const ExamplePage = () => {
	return (
		<PageWrapper>
			<Subheader>
				<SubheaderLeft>SubheaderLeft</SubheaderLeft>
				<SubheaderRight>SubheaderRight</SubheaderRight>
			</Subheader>
			<Container>Container</Container>
		</PageWrapper>
	);
};

export default ExamplePage;
```

You can use this method on pages where you set the null value for "Header" as described in the [src/routes/headerRoutes.tsx](#srccomponentsrouterheaderroutertsx) section.

```tsx
import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../components/layouts/Header/Header';
import PageWrapper from '../components/layouts/PageWrapper/PageWrapper';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../components/layouts/Subheader/Subheader';
import Container from '../components/layouts/Container/Container';

const ExamplePage = () => {
	return (
		<>
			<Header>
				<HeaderLeft>HeaderLeft</HeaderLeft>
				<HeaderRight>HeaderRight</HeaderRight>
			</Header>
			<PageWrapper>
				<Subheader>
					<SubheaderLeft>SubheaderLeft</SubheaderLeft>
					<SubheaderRight>SubheaderRight</SubheaderRight>
				</Subheader>
				<Container>Container</Container>
			</PageWrapper>
		</>
	);
};

export default ExamplePage;
```

#### src/components/router/FooterRouter.tsx

If you do not want to customize the project in this file, you do not need to make any changes. In this component, only [src/routes/footerRoutes.tsx](src/routes/footerRoutes.tsx) file sets which component will be shown in which path.

```tsx
const footerRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{ path: '*', element: <DefaultFooterTemplate /> },
];
```

You can set the "Footer Templates" to be displayed on the paths you want. If you don't want any "Footer" in a path, you can set the element to `null`.

If you will have data about the page in "Footer", specify that there will not be any "Footer" in that path with `null` and define it within the page. So you don't have to worry about moving the data up.
