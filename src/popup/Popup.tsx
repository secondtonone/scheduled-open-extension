import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Skeleton, Typography } from '@mui/material';
import { Formik } from 'formik';

import type IScheduledPage from '~/types/IScheduledPage';
import type { IIdPage } from '~/types/IScheduledPage';
import type FormValues from '~/types/Values';

import getCurrentDate from '~/utils/getCurrentDate';
import getUrls from '~/utils/getUrls';
import deleteFromQueue from '~/utils/deleteFromQueue';
import STORAGE from '~/constants/storage';
import transformStore from '~/utils/transformStore';
import transformQueue from '~/utils/transformQueue';

import schema from './schema';
import ScheduleForm from './ScheduleForm';
import Theme from './Theme';

const ScheduleList = lazy(() => import('./ScheduleList'));

const initialValues = {
  url: 'https://',
  datetime: getCurrentDate(),
};

const Popup = () => {
  const [queue, setQueue] = useState<IScheduledPage[]>([]);

  const onSubmit = useCallback(
    async ({ url, datetime }: FormValues) => {
      const transformedDatetime = new Date(datetime).getTime();

      const response: IIdPage = await chrome.runtime.sendMessage({
        url,
        datetime: transformedDatetime,
      });

      if (response?.id) {
        setQueue([
          ...queue,
          {
            id: response.id,
            url,
            datetime: transformedDatetime,
          },
        ]);
      }
    },
    [queue]
  );

  const onDelete = useCallback(
    async (id: string) => {
      const updatedQueue = deleteFromQueue(transformQueue(queue), id);

      setQueue(transformStore(updatedQueue));

      await chrome.storage.local.set({
        [STORAGE]: updatedQueue,
      });
    },
    [queue]
  );

  useEffect(() => {
    (async () => {
      setQueue(await getUrls());
    })();
  }, []);

  return (
    <Theme>
      <Formik
        initialValues={initialValues}
        validateOnMount
        validationSchema={schema}
        onSubmit={(values: FormValues, { resetForm }) => {
          onSubmit(values);
          resetForm({
            values: {
              url: initialValues.url,
              datetime: values.datetime
            }
          });
        }}>
        <ScheduleForm />
      </Formik>

      <div id="list">
        <Typography
          variant="subtitle1"
          component="div">
          Schedule list
        </Typography>
        <Suspense
          fallback={
            <div>
              <Skeleton />
              <Skeleton width="60%" />
            </div>
          }>
          <ScheduleList
            list={queue}
            onDelete={onDelete}
          />
        </Suspense>
      </div>
    </Theme>
  );
};

export default Popup;
