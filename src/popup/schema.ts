import * as Yup from 'yup';

const schema = Yup.object().shape({
  url: Yup.string()
    .url('Must be a valid URL')
    .min(2, 'Too Short!')
    .required('Site\'s url is required'),
  datetime: Yup.date()
    .min(2, 'Too Short!')
    .required('Date and time are required')
    .min(new Date(), 'Date and time must be in the future')
});

export default schema;
