import { useEffect} from 'react';
import Button from '@mui/material-next/Button';
import { extendTheme } from '@mui/material-next/styles';
import { TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import type FormValues from '~/types/Values';

import getCurrentDate from '~/utils/getCurrentDate';

import { useFormikContext } from 'formik';

const buttonTheme = extendTheme({});

const ScheduleForm = () => {
  const {
    isValid,
    values,
    handleChange,
    handleBlur,
    submitForm,
    errors,
    touched,
    setFieldValue,
  } = useFormikContext<FormValues>();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const urlFromPage = searchParams.get('url');

    if (urlFromPage) {
      setFieldValue('url', urlFromPage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      id="form"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}>
      <TextField
        error={touched.url && Boolean(errors.url)}
        helperText={touched.url && errors.url}
        label="Site link"
        type="text"
        id="url"
        name="url"
        margin="normal"
        value={values.url}
        onBlur={handleBlur('url')}
        onChange={(e) => handleChange('url')(e.target.value)}
      />

      <TextField
        error={touched.datetime && Boolean(errors.datetime)}
        helperText={touched.datetime && errors.datetime}
        label="Date and time"
        type="datetime-local"
        id="datetime"
        name="datetime"
        margin="normal"
        value={values.datetime}
        inputProps={{ min: getCurrentDate() }}
        onBlur={handleBlur('datetime')}
        onChange={(e) => handleChange('datetime')(e.target.value)}
      />
      <ThemeProvider theme={buttonTheme}>
        <Button
          color="primary"
          size="large"
          variant="filled"
          type="submit"
          disabled={!isValid}>
          Schedule
        </Button>
      </ThemeProvider>
    </form>
  );
};

export default ScheduleForm;
