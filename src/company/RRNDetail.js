import React from "react";
import { Form, Grid } from "semantic-ui-react";
import { Input } from "semantic-ui-react";

import { handlers } from "../../controls/search/search";
//import DatePickerWrapper from "./dateRangePicker";

const RRNDetail = () => {
  const _handleChange = (e, { value }) => {
    alert("selected value = " + value);
    handlers.searchPeriod(value);
  };

  return (
    <Grid columns={2} style={{ width: "300px" }}>
      <Grid.Column>
        <Form>
          <Form.Field>
            <label>Enter Tenant Name</label>
            <input placeholder="BHN" />
          </Form.Field>
        </Form>
      </Grid.Column>
      <Grid.Column>
        <Form.Button content="Search" primary />
      </Grid.Column>
    </Grid>
  );
};

export default RRNDetail;
