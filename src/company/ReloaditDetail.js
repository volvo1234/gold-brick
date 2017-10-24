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
/*

import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import { handlers } from '../../controls/search/search';
import DatePickerWrapper from './dateRangePicker';


const ReloaditDetail = ()=> {
  const _handleChange = (e, { value }) => {
    handlers.searchPeriod(value);
  };

  const searchPeriodOptions = [
    { key: '1', text: 'Last month', value: 'lastMonth' },
    { key: '2', text: 'Last 30 days', value: 'last30' },
    { key: '3', text: 'Last 90 days', value: 'last90' },
    { key: '4', text: 'Last 6 months', value: 'last6' },
    { key: '5', text: 'Last 12 months', value: 'reloadit' },
    { key: '6', text: 'Date range', value: 'dateRange' },
  ];

  const countryOptions = [
    { key: '1', text: 'United States', value: 'United States' },
    { key: '2', text: 'Canada', value: 'Canada' },
  ];

  return (
      <Grid columns={4} style={{width: '900px'}}>
        <Grid.Column>
          <Form.Select options={searchPeriodOptions}
                       placeholder='Select Search Period'
                       onChange={_handleChange}/>
        </Grid.Column>

        <Grid.Column>
          <DatePickerWrapper />
        </Grid.Column>

        <Grid.Column>
          <Form.Select mini options={countryOptions}
                       placeholder='Select Country'
                       defaultValue="United States"/>
        </Grid.Column>
        <Grid.Column>
          <Form.Button content='Search' primary/>
        </Grid.Column>
      </Grid>
  )

};

export default ReloaditDetail;
*/