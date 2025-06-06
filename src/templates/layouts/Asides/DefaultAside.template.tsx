import React from 'react';
import { useNavigate } from 'react-router-dom';
import Aside, { AsideBody, AsideFooter, AsideHead } from '../../../components/layouts/Aside/Aside';
import LogoAndAsideTogglePart from './_parts/LogoAndAsideToggle.part';
import DarkModeSwitcherPart from './_parts/DarkModeSwitcher.part';
import { appPages, componentsPages } from '../../../config/pages.config';
import Nav, {
	NavButton,
	NavCollapse,
	NavItem,
	NavSeparator,
	NavTitle,
	NavUser,
} from '../../../components/layouts/Navigation/Nav';
import Badge from '../../../components/ui/Badge';
import UserTemplate from '../User/User.template';
import usersDb from '../../../mocks/db/users.db';
import { useRouteGuard } from '../../../hooks/useRouterGuard';
import { useAppSelector } from '../../../store';

const DefaultAsideTemplate = () => {
	const { showAside } = useRouteGuard();
	const { user } = useAppSelector((state) => state.auth);


  if (!showAside) {
    return <main className='bg-blue-900'></main>;
  }

	return (
		<Aside>
			<AsideHead>
				<LogoAndAsideTogglePart />
			</AsideHead>

			<AsideBody className="overflow-y-auto">
				<Nav>
					{user.perfil?.user_type === 'administrador' && (
						<>
							<NavTitle>Gestión Académica</NavTitle>
							<NavItem {...appPages.academicAppPages.subPages.coursesPage} />
							<NavItem {...appPages.academicAppPages.subPages.subjectsPage} />
							<NavItem {...appPages.academicAppPages.subPages.schedulePage} />
							<NavItem {...appPages.academicAppPages.subPages.subjectAssignmentPage} />

							<NavTitle>Gestión Administrativa</NavTitle>
							<NavItem {...appPages.administrativeAppPages.subPages.enrollmentPage} />
							<NavItem {...appPages.administrativeAppPages.subPages.studentsPage} />
							<NavItem {...appPages.administrativeAppPages.subPages.guardiansPage} />
							<NavItem {...appPages.administrativeAppPages.subPages.communicationPage} />
							<NavCollapse 
								text={appPages.administrativeAppPages.subPages.staffPage.text}
								to={appPages.administrativeAppPages.subPages.staffPage.to}
								icon={appPages.administrativeAppPages.subPages.staffPage.icon}>
								<NavItem {...appPages.administrativeAppPages.subPages.staffPage.subPages.teachers} />
								<NavItem {...appPages.administrativeAppPages.subPages.staffPage.subPages.assistants} />
								<NavItem {...appPages.administrativeAppPages.subPages.staffPage.subPages.admins} />
							</NavCollapse>
						</>
					)}

					{user.perfil?.user_type === 'docente' && (
						<>
							<NavTitle>Docentes</NavTitle>
							<NavItem {...appPages.docentesAppPages.subPages.planificacion} />
							<NavItem {...appPages.docentesAppPages.subPages.notas} />
							<NavItem {...appPages.docentesAppPages.subPages.clases} />
						</>
					)}

					{user.perfil?.user_type === 'apoderado' && (
						<>
							<NavTitle>Apoderados</NavTitle>
							<NavItem {...appPages.apoderadosAppPages.subPages.informacionEstudiantil} />
							<NavItem {...appPages.apoderadosAppPages.subPages.citaciones} />
							<NavItem {...appPages.apoderadosAppPages.subPages.comunicaciones} />
						</>
					)}

					{user.perfil?.user_type === 'asistente_educacion' && (
						<>
							<NavTitle>Asistentes de la Educación</NavTitle>
							<NavItem {...appPages.asistentesAppPages.subPages.tareas} />
							<NavItem {...appPages.asistentesAppPages.subPages.observaciones} />
						</>
					)}
				</Nav>
			</AsideBody>
			<AsideFooter>
				<UserTemplate />
				<DarkModeSwitcherPart />
			</AsideFooter>
		</Aside>
	);
};

export default DefaultAsideTemplate;
