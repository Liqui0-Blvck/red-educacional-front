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




	console.log(user.perfil?.user_type)

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
							<NavItem {...appPages.administrativeAppPages.subPages.usersPage} />
							<NavItem {...appPages.administrativeAppPages.subPages.guardiansPage} />
							<NavItem {...appPages.administrativeAppPages.subPages.staffPage} />
							<NavItem {...appPages.administrativeAppPages.subPages.communicationPage} />
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
				<Nav>
					<NavSeparator />
					<NavCollapse text='Nav Collapse' to='/' icon='HeroQueueList'>
						<NavItem text='Nav item' icon='HeroPencil' />
						<NavItem text='With badge'>
							<Badge variant='solid' className='leading-none'>
								3
							</Badge>
						</NavItem>
						<NavItem text='With button'>
							<NavButton icon='HeroRocketLaunch' title='New' />
						</NavItem>
						<NavItem text='With badge & button'>
							<Badge variant='solid' className='leading-none'>
								3
							</Badge>
							<NavButton icon='HeroRocketLaunch' title='New' />
						</NavItem>
						<NavTitle>Navigation Title</NavTitle>
						<NavCollapse text='Nav Level 2' to='/' icon='HeroQueueList'>
							<NavItem text='Nav Item' />
							<NavCollapse text='Nav Level 3' to='/' icon='HeroQueueList'>
								<NavItem text='Nav Item' />
							</NavCollapse>
							<NavItem text='Nav Item' />
						</NavCollapse>
					</NavCollapse>
				</Nav>

				<UserTemplate />
				<DarkModeSwitcherPart />
			</AsideFooter>
		</Aside>
	);
};

export default DefaultAsideTemplate;
