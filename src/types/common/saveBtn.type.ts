export type TSaveBtnStatusValue =  'Guardar' | 'Guardando' | 'Guardado';
export type TSaveBtnStatus = {
	[key in 'GUARDAR' | 'GUARDANDO' | 'GUARDADO']: TSaveBtnStatusValue;
};
