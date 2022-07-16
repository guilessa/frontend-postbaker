import * as Yup from 'yup';

export default Yup.object().shape({
	edit: Yup.boolean().required(),
	name: Yup.string().when('edit', {
		is: false,
		then: Yup.string().required(),
		otherwise: Yup.string(),
	}),
	password: Yup.string().when('edit', {
		is: false,
		then: Yup.string().required(),
		otherwise: Yup.string(),
	}),
	instagram: Yup.boolean().required(),
	facebook: Yup.boolean().required(),
	linkedin: Yup.boolean().required(),
	logo: Yup.mixed().when(
		('edit',
		{
			is: false,
			then: Yup.mixed().required(),
			otherwise: Yup.mixed(),
		})
	),
});
