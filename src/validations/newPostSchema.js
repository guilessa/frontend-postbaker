import * as Yup from 'yup';

export default Yup.object().shape({
	facebook: Yup.boolean().required(),
	instagram: Yup.boolean().required(),
	linkedin: Yup.boolean().required(),
	date: Yup.date().required(),
	showForClient: Yup.boolean().required(),
	description: Yup.string().required(),
	logo: Yup.mixed().required(),
	dateFormat: Yup.string().required(),
});
