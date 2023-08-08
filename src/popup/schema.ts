import * as Yup from 'yup';
import getCurrentDate from '~/utils/getCurrentDate';

const schema = Yup.object().shape({
  url: Yup.string()
    .url()
    .min(2, 'Too Short!')
    .required('Site\'s url is required'),
  datetime: Yup.date()
    .min(2, 'Too Short!')
    .required('Date and time are required')
    .default(() => new Date(getCurrentDate()))
});

export default schema;
