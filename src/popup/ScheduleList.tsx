import { FC } from 'react';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import type IScheduledPage from '~/types/IScheduledPage';

interface IScheduleListProps {
  list: IScheduledPage[]
  onDelete: (id: string) => void
}

const ScheduleList: FC<IScheduleListProps> = ({ list, onDelete }) => {
  return (
    <>
      {list.length > 0 ? (
        <List>
          {list.map(({ id, url, datetime }) => (
            <ListItem
              key={id}
              disableGutters
              secondaryAction={
                <IconButton
                  onClick={() => onDelete(id)}
                  edge="end"
                  aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }>
              <ListItemText
                primary={<span title={url}>{url}</span>}
                secondary={`at ${new Date(datetime).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box
          component="span"
          sx={{ p: 4 }}>
          <Typography
            variant="subtitle2"
            align="center">
            List is empty.
          </Typography>
          <Typography
            variant="body2"
            align="center">
            Add site to schedule.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ScheduleList;
