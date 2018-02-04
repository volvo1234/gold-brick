import React, { Component } from 'react';
import { Button, Checkbox, Form, Grid } from 'semantic-ui-react';
import ReactTable from 'react-table';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import data from './testData';


const Login = ({ history }) => {
    const handleLogin = e => history.push('/summary');

    return (
        <Grid centered columns={3} style={{paddingTop: '100px'}}>
            <Grid.Column >
                <Form>
                    <Form.Field>
                        <label>User Name</label>
                        <input placeholder='User Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button primary type='submit' onClick={handleLogin}>Login</Button>
                </Form>
            </Grid.Column>
        </Grid>
    )
};

const AccountSummary = ({ history }) => {
    const handleDetail = item => e => {
        history.push({
            pathname: '/details',
            state: item
        })
    };

    const handleLogout = e => history.push('/');

    const columns = [
        {
            Header: 'Nick Name',
            accessor: 'nickName'
        },
        {
            Header: 'Customer Since',
            accessor: 'customerSince',
        },
        {
            Header: 'Location',
            accessor: 'location'
        },
        {
            Header: 'Action',
            Cell: row => <Button circular icon='angle right' size='mini' onClick={handleDetail(row.original)} style={{backgroundColor: 'gold'}}/>,
            width: 60
        },
    ];

    return (
        <Grid centered columns={2} style={{paddingTop: '50px'}}>
            <Grid.Column>
                <Button primary onClick={handleLogout} style={{marginBottom: '20px'}}>Logout</Button>
                <ReactTable data={data} columns={columns} />
            </Grid.Column>
        </Grid>)
};


const AccountDetail = history => item => {
    const columns = [
        {
            Header: 'Name',
            accessor: 'userName'
        },
        {
            Header: 'Age',
            accessor: 'age',
        },
        {
            Header: 'Amount',
            accessor: 'amount'
        },
        {
            Header: 'Acount Type',
            accessor: 'type'
        }
    ];

    const handleBack = history => e => history.push('./summary');

    return (
        <Grid centered columns={2} style={{paddingTop: '50px'}}>
            <Grid.Column >
                <Button primary onClick={handleBack(history)} style={{marginBottom: '20px'}}>Back</Button>
                <ReactTable data={item} columns={columns} />
            </Grid.Column>
        </Grid>
    )
};

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={Login}/>
            <Route path="/summary" component={AccountSummary}/>
            <Route path='/details' render={
                ({location, history }) => {
                    return AccountDetail(history)(location.state.detailInfo);
                }
            } />
        </div>
    </Router>
);

export default App;