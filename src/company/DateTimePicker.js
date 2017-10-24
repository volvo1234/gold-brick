import React from 'react';
import { Grid } from 'semantic-ui-react';
import Datetime from 'react-datetime';
import './react-datetime.css';
import { handlers } from '../../controls/search/search';


const DateTimePicker = () => {
  const _handleStartChange = val => {
    const start = {
      dateStart: `${val.get('year')}-${val.get('month')+1}-${val.get('date')}`,
      timeStart: `${val.get('hour')}:${val.get('minute')}`
    };
    handlers.rangeStart(start);
  };

  const _handleEndChange = val => {
    const end = {
      dateEnd: `${val.get('year')}-${val.get('month')+1}-${val.get('date')}`,
      timeEnd: `${val.get('hour')}:${val.get('minute')}`
    };
    handlers.rangeEnd(end);
  };


  return (
      <Grid columns={2}>
        <Grid.Column><Datetime onChange={_handleStartChange} inputProps={{ placeholder: 'Select Start Date'}} /></Grid.Column>
        <Grid.Column><Datetime onChange={_handleEndChange} inputProps={{ placeholder: 'Select End Date'}}/></Grid.Column>
      </Grid>
  )

};

export default DateTimePicker;
