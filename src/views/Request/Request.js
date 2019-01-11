import React, { Component } from "react";
import ScrollUpButton from "react-scroll-up-button";
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button, Card, CardHeader, CardBody, Collapse, Input } from "reactstrap";
import { AppSwitch } from '@coreui/react';
import defaultData from "./dfConfig_";
import defaultStages from "./wfConfig_";
import GridComponent from "./Components/GridComponent";
import _ from "lodash";
import { setPackageUILoading, setBundleDataLoading, submitBundle } from "../../_actions";


class NewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      collapse: [true],
      status: "new"
    };
    this.switchPanel = this.switchPanel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const { id, type } = this.props.match.params;
    const { url } = this.props.match;
    const packageType = "web_app";
    let status = url.split("/")[2];
    dispatch(setPackageUILoading(packageType));
    if (id) {
      dispatch(setBundleDataLoading(id));
    }
    this.setState({ status: status })
  }

  handleSubmit(status) {
    let { dispatch, stages, dataServices } = this.props;
    let user = JSON.parse(localStorage.getItem("user")).id;
    let payload = {
      bundleData: {
        bundle_type: "001",
        bundle_ref: "web_app",
        bundle_name: "Launch Web Application (Windows)"
      },
      status: status,
      user: user,
      serviceData: dataServices,
      stages: stages
    }
    dispatch(submitBundle(payload));
    this.setState({
      redirect: "/reqlist/" + status
    });
  }

  switchPanel(i) {
    const col = this.state.collapse;
    col[i] = !col[i];
    this.setState({
      collapse: col
    });
  }

  scrollToService(srv_id) {
    const element = document.getElementById(srv_id);
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
  }
  render() {
    let { uiServices, stages, dataServices } = this.props;
    console.log("uiServices===>", uiServices, "dataServices===>", dataServices);
    function cleanColValues(colValues) {
      let cleanColValues = [];
      colValues.forEach(item => {
        cleanColValues.push(_.omit(item, ["isMandatory", "isShared", "defaultValue"]));
      })
      return cleanColValues;
    }
    if (uiServices && stages && dataServices) {
      const GridFields = service => {
        //let rowValues = getRowValues(dataServices[service.name]);
        let colValues = cleanColValues(service.details);
        return (
          <GridComponent
            service={service}
            dataServices={dataServices}
            status={this.state.status}
            colValues={colValues}
            stages={stages}
            status={this.state.status}
          />
        );
      };
      const TabInfo = uiServices.map((service, i) => {
        return (
          <Row key={service.name + i} >
            <Col xs="12" >
              <Card id={service.name}>
                <CardHeader>
                  <i className={service.logo}>
                    <span style={{ marginLeft: "10px" }}>{service.title}</span>
                  </i>
                  <div className="card-header-actions">
                    <AppSwitch onChange={() => this.switchPanel(i)}
                      variant={'pill'}
                      label color={'success'}
                      size={'lg'}
                      checked={this.state.collapse[i]}
                    />
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse[i]}>
                  <CardBody>
                    {GridFields(service)}
                  </CardBody>
                </Collapse>
              </Card>
            </Col>
          </Row>
        )
      });
      return (
        <div className="animated fadeIn" >
          <ScrollUpButton />
          <Row style={{ marginBottom: "10px" }}>
            <Col xs="12">
              {
                uiServices.map((service, i) =>
                  <Button style={{ padding: "0.375rem", fontSize: "0.8rem" }} key={i} className={this.state.collapse[i] ? "active" : ""} >
                    <Input style={{ margin: "0", position: "relative", right: "5px" }}
                      type="checkbox" checked={this.state.collapse[i]} onChange={() => this.switchPanel(i)} />
                    {service.title}
                    {(this.state.collapse[i] === true) &&
                      <i onClick={() => { this.scrollToService(service.name) }} className="fa fa-angle-down"></i>
                    }
                  </Button>
                )
              }
            </Col>
          </Row>
          {TabInfo}
          < Row >
            <Col xs="12" >
              {this.renderRedirect()}
              <Button type="reset"
                size="sm"
                style={{ marginRight: "5px" }}
                color="primary"
                onClick={() => this.handleSubmit("saved")}>
                < i className="fa fa-disk" > </i> Save
              </Button >
              <Button type="submit"
                size="sm"
                style={{ marginRight: "5px" }}
                color="success"
                onClick={() => this.handleSubmit("inprogress")}>
                < i className="fa fa-dot-circle-o" > </i> Submit
              </Button>
              <Button type="reset"
                size="sm"
                color="danger" >
                < i className="fa fa-ban" > </i> Reset
              </Button >
            </Col>
          </Row>
        </div >
      )
    } else {
      return (<div>Loading...</div>)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    uiServices: state.requestReducer.ui,
    dataServices: state.requestReducer.services,
    stages: state.requestReducer.stages
  }
}

export default connect(
  mapStateToProps
)(NewRequest)