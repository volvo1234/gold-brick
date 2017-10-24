import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import appState$ from "../../controls/search/search";
import RaptorLogo from "./raptorLogo";
import SearchType from "./SearchType";
import SearchTable from "./SearchTable";
import { lensProp, view } from "ramda";
import Search from "./Search";
import SearchEgiftTable from "./SearchEgiftTable";

import DateTimePicker from './DateTimePicker';

const Navbar = props => {

  return (
    <div>
      <Grid verticalAlign="middle" centered>
        <Grid.Row className="top-bar">
          <Grid.Column>{RaptorLogo()}</Grid.Column>
          <Grid.Column />
          <Grid.Column />
          <Grid.Column width={3}>{SearchType(props.state)}</Grid.Column>
          <Grid.Column width={7}>{Search(props.state)}</Grid.Column>

          <Grid.Column>{"Welcome"}</Grid.Column>
          <Grid.Column>
            <Button
              onClick={props.handleLogout}
              size="tiny"
              primary
              style={{ marginLeft: "8px" }}
            >
              logout
            </Button>
          </Grid.Column>

          <Grid.Column />

          <Grid.Column />
        </Grid.Row>
      </Grid>

      <Grid>
        <Grid.Column width={1} />
        <Grid.Column width={14}>
          {!view(lensProp("transactionRecords"))(props.state["0"])
            ? null
            : SearchTable(props.state)}

          {!view(lensProp("egiftRecords"))(props.state["0"])
            ? null
            : SearchEgiftTable(props.state)}
        </Grid.Column>
        <Grid.Column width={1} />
      </Grid>
    </div>
  );
};

//Logout page
const LogoutPage = () => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  return (
    <Grid verticalAlign="middle" centered>
      <Grid.Row className="top-bar">
        <Grid.Column>{RaptorLogo()}</Grid.Column>
        <Grid.Column />
        <Grid.Column />

        <div style={style}>
          <h1>
            You have been successfully logged out of Raptor! You will need to
            log in again.
          </h1>
        </div>
        <Grid.Column />
        <Grid.Column />
      </Grid.Row>
    </Grid>
  );
};

class FormBuilder extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.info,
      logoutFlag: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  } //TODO: verify if this needs change

  componentDidMount() {
    appState$.subscribe(val => {
      this.setState(val);
    });
  }

  handleLogout() {
    fetch(
      "/api/logoutTest",
      { credentials: "same-origin" },
      {
        method: "get"
      }
    ).then(this.setState({ logoutFlag: true }));
  }
  render() {
    if (this.state.logoutFlag) {
      return <LogoutPage />;
    } else {
      return (
        <div>
          <Navbar state={this.state} handleLogout={this.handleLogout} />{" "}
        </div>
      );
    }
  }
}

export default FormBuilder;
