import React, { Component } from 'react';
import { Button, Checkbox, Form, Grid } from 'semantic-ui-react';
import ReactTable from 'react-table';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// test data
const data = [
    {
        nickName: 'Joe',
        customerSince: 1998,
        location: 'CA',
        detailInfo: [{
            userName: 'Jason Joe',
            age: 23,
            amount: '$2000',
            type: 'saving'
        }]
    },
    {
        nickName: 'Tom',
        customerSince: 1980,
        location: 'NY',
        detailInfo: [{
            userName: 'Jason Tom',
            age: 80,
            amount: '$4000',
            type: 'checking'
        }]
    },
    {
        nickName: 'Max',
        customerSince: 2008,
        location: 'MA',
        detailInfo: [{
            userName: 'Jason Max',
            age: 73,
            amount: '$12000',
            type: 'checking'
        }]
    },
    {
        nickName: 'Bob',
        customerSince: 1982,
        location: 'WA',
        detailInfo: [{
            userName: 'Jason Bob',
            age: 66,
            amount: '$200',
            type: 'saving'
        }]
    },
];

const AccountDetail = item => {
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

    return (
        <Grid centered columns={2} style={{paddingTop: '50px'}}>
            <Grid.Column>
                <ReactTable data={item} columns={columns} />
            </Grid.Column>
        </Grid>
    )
};

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

    const columns = [
        {
            Header: 'Action',
            Cell: row => <Button circular icon='setting' size='mini' onClick={handleDetail(row.original)} />,
            width: 60
        },
        {
            Header: 'Nick Name',
            accessor: 'nickName' // String-based value accessors!
        },
        {
            Header: 'Customer Since',
            accessor: 'customerSince',
        },
        {
            Header: 'Location',
            accessor: 'location' // Custom value accessors!
        }
    ];

    return (
        <Grid centered columns={2} style={{paddingTop: '50px'}}>
            <Grid.Column>
                <ReactTable data={data} columns={columns} />
            </Grid.Column>
        </Grid>)
};

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={Login}/>
            <Route path="/summary" component={AccountSummary}/>
            <Route path='/details' render={
                ({location}) => {
                    return AccountDetail(location.state.detailInfo);
                }
            } />
        </div>
    </Router>
)

export default App;