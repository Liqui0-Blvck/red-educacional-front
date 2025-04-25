import React, { Dispatch, FC, SetStateAction } from 'react';
import Button, { IButtonProps } from '../../../../components/ui/Button';
import useColorApp from '../../../../hooks/useColorApp';

export type TTabStudent = {
	text: 'Detalle Alumno' | 'Horario' | 'Retiros' | 'Asistencia' | 'Notas';
};

export type TTabStudentKeys = keyof TTabsStudent;

export type TTabsStudent = {
	[key in 'DETAIL' | 'SCHEDULE' | 'LEAVE' | 'ATTENDANCE' | 'RESULTS']: TTabStudent;
};

export const TAB_STUDENT: TTabsStudent = {
	DETAIL: {
		text: 'Detalle Alumno',
	},
	SCHEDULE: {
		text: 'Horario',
	},
	LEAVE: {
		text: 'Retiros',
	},
	ATTENDANCE: {
		text: 'Asistencia',
	},
	RESULTS: {
		text: 'Notas',
	},
};

interface IStudentButtonProps {
	activeTab: TTabStudent; // <-- Cambiado aquí
	setActiveTab: Dispatch<SetStateAction<TTabStudent>>; // <-- Cambiado aquí
}

const StudentTabsButtons: FC<IStudentButtonProps> = ({ activeTab, setActiveTab }) => {
	const { colorApp } = useColorApp();

	const defaultProps: IButtonProps = {
		size: 'sm',
		color: 'zinc',
		rounded: 'rounded-md',
    className: 'w-full m-0',
	};

	const activeProps: IButtonProps = {
		...defaultProps,
		isActive: true,
		color: colorApp,
		colorIntensity: '500',
		variant: 'solid',
	};

	return (
		<div className='w-full flex rounded-md drop-shadow-xl dark:border-zinc-800 '>
			{Object.values(TAB_STUDENT).map((tab) => (
				<Button
          rounded='rounded-md'
					key={tab.text}
					{...(activeTab.text === tab.text ? activeProps : defaultProps)}
					onClick={() => setActiveTab(tab)}
				>
					{tab.text}
				</Button>
			))}
		</div>
	);
};

export default StudentTabsButtons;
