import categoriesDb from '../mocks/db/categories.db';
import productsDb from '../mocks/db/products.db';
import usersDb from '../mocks/db/users.db';
import rolesDb from '../mocks/db/roles.db';
import projectsDb from '../mocks/db/projects.db';

export const examplePages = {
	examplesPage: {
		id: 'examplesPage',
		to: '/examples-page',
		text: 'Examples Page',
		icon: 'HeroBookOpen',
	},
	duotoneIconsPage: {
		id: 'duotoneIconsPage',
		to: '/duotone-icons',
		text: 'Duotone Icons',
		icon: 'HeroCubeTransparent',
	},
};

export const appPages = {
  dashboard: {
    id: 'dashboardApp',
    to: '/dashboard',
    text: 'Dashboard',
    icon: 'HeroHome',
  },

  docentesAppPages: {
    id: 'docentesApp',
    to: '/educacion/docentes',
    text: 'Docentes',
    icon: 'HeroUserGroup',
    subPages: {
      planificacion: {
        id: 'planificacion',
        to: '/educacion/docentes/planificacion',
        text: 'Planificación',
        icon: 'HeroClipboardDocumentList',
      },
      notas: {
        id: 'notas',
        to: '/educacion/docentes/notas',
        text: 'Registro de Notas',
        icon: 'HeroPencilSquare',
      },
      clases: {
        id: 'clases',
        to: '/educacion/docentes/clases',
        text: 'Mis Clases',
        icon: 'HeroClock',
        subPages: {
          detalleClase: {
            id: 'detalleClase',
            to: '/educacion/docentes/clases/:classSessionId',
            text: 'Detalle Clase',
            icon: 'HeroDocumentMagnifyingGlass',
          }
        },
      },
    },
  },

  apoderadosAppPages: {
    id: 'apoderadosApp',
    to: '/educacion/apoderados',
    text: 'Apoderados',
    icon: 'HeroUser',
    subPages: {
      informacionEstudiantil: {
        id: 'informacionEstudiantil',
        to: '/educacion/apoderados/estudiantes',
        text: 'Información del Estudiante',
        icon: 'HeroIdentification',
      },
      detalleEstudiante: {
        id: 'detalleEstudiante',
        to: '/educacion/apoderados/estudiantes/:studentId',
        text: 'Detalle del Estudiante',
        icon: 'HeroDocumentSearch',
      },
      citaciones: {
        id: 'citaciones',
        to: '/educacion/apoderados/citaciones',
        text: 'Citaciones',
        icon: 'HeroBellAlert',
      },
      comunicaciones: {
        id: 'comunicaciones',
        to: '/educacion/apoderados/comunicaciones',
        text: 'Comunicaciones',
        icon: 'HeroEnvelopeOpen',
      },
    },
  },

  asistentesAppPages: {
    id: 'asistentesApp',
    to: '/educacion/asistentes',
    text: 'Asistentes de la Educación',
    icon: 'HeroBriefcase',
    subPages: {
      tareas: {
        id: 'tareasAsistentes',
        to: '/educacion/asistentes/tareas',
        text: 'Tareas Asignadas',
        icon: 'HeroClipboard',
      },
      observaciones: {
        id: 'observacionesAsistentes',
        to: '/educacion/asistentes/observaciones',
        text: 'Observaciones',
        icon: 'HeroEye',
      },
    },
  },

  administracionAppPages: {
    id: 'administracionApp',
    to: '/educacion/admin',
    text: 'Administración',
    icon: 'HeroCog6Tooth',
    subPages: {
      usuarios: {
        id: 'gestionUsuarios',
        to: '/educacion/admin/usuarios',
        text: 'Gestión de Usuarios',
        icon: 'HeroUsers',
      },
      detalleUsuario: {
        id: 'detalleUsuario',
        to: '/educacion/admin/usuarios/:userId',
        text: 'Detalle Usuario',
        icon: 'HeroUserCircle',
      },
      configuracion: {
        id: 'configuracionSistema',
        to: '/educacion/admin/configuracion',
        text: 'Configuración',
        icon: 'HeroAdjustmentsHorizontal',
      },
    },
  },

  academicAppPages: {
    id: 'academicApp',
    to: '/academico',
    text: 'Gestión Académica',
    icon: 'HeroBookOpen',
    subPages: {
      subjectsPage: {
        id: 'subjectsPage',
        to: '/academico/asignaturas',
        text: 'Asignaturas',
        icon: 'HeroBookmarkSquare',
      },
      coursesPage: {
        id: 'coursesPage',
        to: '/academico/cursos',
        text: 'Cursos',
        icon: 'HeroBuildingLibrary',
      },
      detalleCurso: {
        id: 'detalleCurso',
        to: '/academico/cursos/:courseId',
        text: 'Detalle del Curso',
        icon: 'HeroDocumentText',
      },
      levelsPage: {
        id: 'levelsPage',
        to: '/academico/niveles',
        text: 'Niveles Educativos',
        icon: 'HeroBars3BottomLeft',
      },
      gradesPage: {
        id: 'gradesPage',
        to: '/academico/evaluaciones',
        text: 'Evaluaciones y Calificaciones',
        icon: 'HeroChartBarSquare',
      },
      schedulePage: {
        id: 'schedulePage',
        to: '/academico/horarios',
        text: 'Horarios',
        icon: 'HeroCalendarDays',
      },
      subjectAssignmentPage: {
        id: 'subjectAssignmentPage',
        to: '/academico/asignacion',
        text: 'Asignación de Docentes',
        icon: 'HeroUserPlus',
      },
    },
  },

  administrativeAppPages: {
    id: 'administrativeApp',
    to: '/administracion',
    text: 'Gestión Administrativa',
    icon: 'HeroClipboardDocument',
    subPages: {
      usersPage: {
        id: 'usersPage',
        to: '/administracion/usuarios',
        text: 'Usuarios del Sistema',
        icon: 'HeroUsers',
      },
      studentsPage: {
        id: 'studentsPage',
        to: '/administracion/estudiantes',
        text: 'Estudiantes',
        icon: 'HeroUserCircle',
				subPages: {
					studentDetail: {
						id: 'studentDetail',
						to: '/administracion/estudiantes/:studentId',
						text: 'Detalle Estudiante',
						icon: 'HeroDocumentText',
					},
				},
      },
			enrollmentPage: {
				id: 'enrollmentPage',
				to: '/administracion/matriculas',
				text: 'Matriculas',
				icon: 'HeroUserPlus',
				subPages: {
					enrollmentDetail: {
						id: 'enrollmentDetail',
						to: '/administracion/matriculas/:enrollmentId',
						text: 'Detalle Matricula',
						icon: 'HeroDocumentText',
					},
				}
			},
      guardiansPage: {
        id: 'guardiansPage',
        to: '/administracion/apoderados',
        text: 'Apoderados',
        icon: 'HeroUserGroup',
      },
      staffPage: {
        id: 'staffPage',
        to: '/administracion/personal',
        text: 'Personal',
        icon: 'HeroBriefcase',
        subPages: {
          teachers: {
            id: 'teachers',
            to: '/administracion/personal/docentes',
            text: 'Docentes',
            icon: 'HeroAcademicCap',
          },
          assistants: {
            id: 'assistants',
            to: '/administracion/personal/asistentes',
            text: 'Asistentes de la Educación',
            icon: 'HeroUser',
          },
          admins: {
            id: 'admins',
            to: '/administracion/personal/administrativos',
            text: 'Administrativos',
            icon: 'HeroCog6Tooth',
          },
        },
      },
      institucionPage: {
        id: 'institucionPage',
        to: '/administracion/establecimiento',
        text: 'Datos del Establecimiento',
        icon: 'HeroBuildingOffice2',
      },
      piePage: {
        id: 'piePage',
        to: '/administracion/pie',
        text: 'Programa de Integración (PIE)',
        icon: 'HeroPuzzlePiece',
      },
      communicationPage: {
        id: 'communicationPage',
        to: '/administracion/comunicaciones',
        text: 'Comunicaciones',
        icon: 'HeroEnvelope',
      },
      attendancePage: {
        id: 'attendancePage',
        to: '/administracion/asistencia',
        text: 'Control de Asistencia',
        icon: 'HeroCalendarCheck',
      },
    },
  },
};

export const componentsPages = {
	// uiPages: {
	// 	id: 'uiPages',
	// 	to: '/ui',
	// 	text: 'UI',
	// 	icon: 'HeroPuzzlePiece',
	// 	subPages: {
	// 		alertPage: {
	// 			id: 'alertPage',
	// 			to: '/ui/alert',
	// 			text: 'Alert',
	// 			icon: 'HeroBell',
	// 		},
	// 		badgePage: {
	// 			id: 'badgePage',
	// 			to: '/ui/badge',
	// 			text: 'Badge',
	// 			icon: 'HeroSparkles',
	// 		},
	// 		buttonPage: {
	// 			id: 'buttonPage',
	// 			to: '/ui/button',
	// 			text: 'Button',
	// 			icon: 'HeroRectangleStack',
	// 		},
	// 		buttonGroupPage: {
	// 			id: 'buttonGroupPage',
	// 			to: '/ui/button-group',
	// 			text: 'Button Group',
	// 			icon: 'HeroRectangleStack',
	// 		},
	// 		cardPage: {
	// 			id: 'cardPage',
	// 			to: '/ui/card',
	// 			text: 'Card',
	// 			icon: 'HeroSquare2Stack',
	// 		},
	// 		collapsePage: {
	// 			id: 'collapsePage',
	// 			to: '/ui/collapse',
	// 			text: 'Collapse',
	// 			icon: 'HeroBarsArrowDown',
	// 		},
	// 		dropdownPage: {
	// 			id: 'dropdownPage',
	// 			to: '/ui/dropdown',
	// 			text: 'Dropdown',
	// 			icon: 'HeroQueueList',
	// 		},
	// 		modalPage: {
	// 			id: 'modalPage',
	// 			to: '/ui/modal',
	// 			text: 'Modal',
	// 			icon: 'HeroChatBubbleBottomCenter',
	// 		},
	// 		offcanvasPage: {
	// 			id: 'offcanvasPage',
	// 			to: '/ui/offcanvas',
	// 			text: 'Offcanvas',
	// 			icon: 'HeroBars3BottomRight',
	// 		},
	// 		progressPage: {
	// 			id: 'progressPage',
	// 			to: '/ui/progress',
	// 			text: 'Progress',
	// 			icon: 'HeroChartBar',
	// 		},
	// 		tablePage: {
	// 			id: 'tablePage',
	// 			to: '/ui/table',
	// 			text: 'Table',
	// 			icon: 'HeroTableCells',
	// 		},
	// 		tooltipPage: {
	// 			id: 'tooltipPage',
	// 			to: '/ui/tooltip',
	// 			text: 'Tooltip',
	// 			icon: 'HeroChatBubbleLeftEllipsis',
	// 		},
	// 	},
	// },
	// formPages: {
	// 	id: 'formPages',
	// 	to: '/form',
	// 	text: 'Form',
	// 	icon: 'HeroPencilSquare',
	// 	subPages: {
	// 		fieldWrapPage: {
	// 			id: 'fieldWrapPage',
	// 			to: '/form/field-wrap',
	// 			text: 'Field Wrap',
	// 			icon: 'HeroInbox',
	// 		},
	// 		checkboxPage: {
	// 			id: 'checkboxPage',
	// 			to: '/form/checkbox',
	// 			text: 'Checkbox',
	// 			icon: 'HeroStop',
	// 		},
	// 		checkboxGroupPage: {
	// 			id: 'checkboxGroupPage',
	// 			to: '/form/checkbox-group',
	// 			text: 'Checkbox Group',
	// 			icon: 'HeroListBullet',
	// 		},
	// 		inputPage: {
	// 			id: 'inputPage',
	// 			to: '/form/input',
	// 			text: 'Input',
	// 			icon: 'HeroRectangleStack',
	// 		},
	// 		labelPage: {
	// 			id: 'labelPage',
	// 			to: '/form/label',
	// 			text: 'Label',
	// 			icon: 'HeroPencil',
	// 		},
	// 		radioPage: {
	// 			id: 'radioPage',
	// 			to: '/form/radio',
	// 			text: 'Radio',
	// 			icon: 'HeroStopCircle',
	// 		},
	// 		richTextPage: {
	// 			id: 'richTextPage',
	// 			to: '/form/rich-text',
	// 			text: 'Rich Text',
	// 			icon: 'HeroBars3CenterLeft',
	// 		},
	// 		selectPage: {
	// 			id: 'selectPage',
	// 			to: '/form/select',
	// 			text: 'Select',
	// 			icon: 'HeroQueueList',
	// 		},
	// 		selectReactPage: {
	// 			id: 'selectReactPage',
	// 			to: '/form/select-react',
	// 			text: 'Select React',
	// 			icon: 'HeroQueueList',
	// 		},
	// 		textareaPage: {
	// 			id: 'textareaPage',
	// 			to: '/form/textarea',
	// 			text: 'Textarea',
	// 			icon: 'HeroBars3BottomLeft',
	// 		},
	// 		validationPage: {
	// 			id: 'validationPage',
	// 			to: '/form/validation',
	// 			text: 'Validation',
	// 			icon: 'HeroShieldCheck',
	// 		},
	// 	},
	// },
	// integratedPages: {
	// 	id: 'integratedPages',
	// 	to: '/integrated',
	// 	text: 'Integrated',
	// 	icon: 'HeroBuildingLibrary',
	// 	subPages: {
	// 		reactDateRangePage: {
	// 			id: 'reactDateRangePage',
	// 			to: '/integrated/react-date-range',
	// 			text: 'React Date Range',
	// 			icon: 'HeroCalendarDays',
	// 		},
	// 		fullCalendarPage: {
	// 			id: 'fullCalendarPage',
	// 			to: '/integrated/full-calendar',
	// 			text: 'Full Calendar',
	// 			icon: 'HeroCalendar',
	// 		},
	// 		apexChartsPage: {
	// 			id: 'apexChartsPage',
	// 			to: '/integrated/apex-charts',
	// 			text: 'ApexCharts',
	// 			icon: 'HeroChartBar',
	// 		},
	// 		reactSimpleMapsPage: {
	// 			id: 'reactSimpleMapsPage',
	// 			to: '/integrated/react-simple-maps',
	// 			text: 'React Simple Maps',
	// 			icon: 'HeroMap',
	// 		},
	// 		waveSurferPage: {
	// 			id: 'waveSurferPage',
	// 			to: '/integrated/wave-surfer',
	// 			text: 'WaveSurfer',
	// 			icon: 'HeroMusicalNote',
	// 		},
	// 		richTextPage: {
	// 			id: 'richTextPage',
	// 			to: '/integrated/slate-react',
	// 			text: 'Rich Text',
	// 			icon: 'HeroBars3BottomLeft',
	// 		},
	// 		reactSelectPage: {
	// 			id: 'reactSelectPage',
	// 			to: '/integrated/react-select',
	// 			text: 'React Select',
	// 			icon: 'HeroQueueList',
	// 		},
	// 	},
	// },
	// iconsPage: {
	// 	id: 'iconsPage',
	// 	to: '/icons',
	// 	text: 'Icons',
	// 	icon: 'HeroBuildingLibrary',
	// 	subPages: {
	// 		heroiconsPage: {
	// 			id: 'heroiconsPage',
	// 			to: '/icons/heroicons',
	// 			text: 'Heroicons',
	// 			icon: 'HeroShieldCheck',
	// 		},
	// 		duotoneIconsPage: {
	// 			id: 'duotoneIconsPage',
	// 			to: '/icons/duotone-icons',
	// 			text: 'Duotone Icons',
	// 			icon: 'DuoPicker',
	// 		},
	// 	},
	// },
};

export const userPages = {
	profilePage: {
		id: 'perfilPage',
		to: '/:id/perfil',
		text: 'Perfil',
		icon: 'HeroUser',
	},
}

export const authPages = {
	loginPage: {
		id: 'loginPage',
		to: '/login',
		text: 'Login',
		icon: 'HeroArrowRightOnRectangle',
	},
	signUp: {
		id: 'signUpPage',
		to: '/sign-up',
		text: 'Registro',
		icon: 'HeroArrowRightOnRectangle',
	},
	confirmPage: {
    id: 'confirmPage',
    to: '/activate/:id/:token',
    text: 'Confirm',
    icon: 'HeroArrowRightOnRectangle',
  },
	resetPasswordPage: {
		id: 'resetPasswordPage',
		to: '/activate/:activationId/:activationToken/reset-password/:resetToken/', // Rutas con dos tokens
		text: 'Reset Password',
		icon: 'HeroArrowRightOnRectangle',
	}	

};

const pagesConfig = {
	...examplePages,
	...authPages,
};

export default pagesConfig;
