import React from 'react';
import { Form, Grid, Card, CardContent } from 'semantic-ui-react';
import { handlers } from '../../controls/search/search';
import DateTimePicker from './DateTimePicker';
import { lensProp, view } from 'ramda';



const ReloaditDetail = (props)=> {
  const _handleDateCriteria = (e, { value }) => {
    handlers.dateCriteria(value);
  };

  const _handleCountry = (e, { value }) => {
    handlers.country(value);
  };

  const _handleSearch = () => handlers.searchReloaditExtension();

  const dateCriteriaOptions = [
    { key: '1', text: 'Last 30 days', value: 'Last30days' },
    { key: '2', text: 'Last 90 days', value: 'Last90days' },
    { key: '3', text: 'Last 6 months', value: 'Last6months' },
    { key: '4', text: 'Last 12 months', value: 'Last12months' },
    { key: '5', text: 'Date range', value: 'DateRange' },
  ];

  const countryOptions = [
    { key: '1', text: 'United States', value: 'US' },
    { key: '2', text: 'Canada', value: 'Canada' },
  ];

  const local = {
    disableOnClickOutside: true
  }

  return (
      <Grid columns={4} style={{width: '450px'}}>
        <Grid.Row>  
          <Grid.Column width={11}>
            <Form.Select options={countryOptions}
                         placeholder='Select Country'
                         onChange={_handleCountry} />
          </Grid.Column>
        </Grid.Row>  
        <Grid.Row>
          <Grid.Column>
            <Form.Select options={dateCriteriaOptions}
                         defaultValue={'Last30days'}
                         onChange={_handleDateCriteria}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row> 
          <Grid.Column width={15}>
            { view(lensProp('dateCriteria'))(props['0']) === 'DateRange' ? DateTimePicker() : null }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1}>
              <Form.Button content='Search' primary onClick={_handleSearch}/>
            </Grid.Column>          
        </Grid.Row>          
      </Grid>
  )





};

export default ReloaditDetail;
