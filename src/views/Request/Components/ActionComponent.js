import React from 'react';
import { Button, Row, Col, Modal, Label, Input, FormGroup, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import Steps, { Step } from 'rc-steps';
import axios from 'axios';
import { sysConfig } from "../../../_config";
class ActionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.data.rowValues,
      steps: props.data.stages,
      current: 0
    };
    console.log("props", props.data)
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.apply = this.apply.bind(this);
  }

  apply(event, field) {
    let tmp = this.state.value;
    this.props.onGridEditinModal(tmp)
  }
  toggle() {
    this.props.onGridEditinModal()
  }
  handleChange(event, field) {
    var value = event.target.value;
    let tmp = this.state.value;
    tmp[field] = value;
    this.setState({
      value: tmp
    })
  }

  approve(approved_id, pending_id) {
    console.log("================>", approved_id, pending_id)
    let url = sysConfig.API_TEST_PREFIX + '/approve'
    axios.post(url, {
      approved_id: approved_id,
      pending_id: pending_id
    }).then((response) => {
      console.log("response", response)
    })
    // .catch((err) => { console.log(err) })
  }
  render() {
    let colValues = this.props.data.colValues;
    let rowValues = this.props.data.rowValues;
    const stages = this.state.steps;
    const current = 1;//stages.findIndex(step => step.status === 'pending') + 1;
    const description = '';
    const displayFields = () => {
      let fields = [];
      let cnt = (colValues.length % 2 === 0) ? colValues.length : colValues.length + 1;
      for (let i = 0; i < cnt; i = i + 2) {
        let html = <Row key={i}>
          <Col xs="6" >
            <FormGroup >
              <Label htmlFor="ccnumber" > {colValues[i].headerName} </Label>
              <Input value={rowValues[colValues[i].field]}
                type="text"
                onChange={(event) => this.handleChange(event, colValues[i].field)}
              />
            </FormGroup>
          </Col>
          <Col xs="6" >
            {
              colValues[i + 1] &&
              (<FormGroup >
                <Label htmlFor="ccnumber" > {colValues[i + 1].headerName} </Label>
                <Input value={rowValues[colValues[i + 1].field]}
                  type="text"
                  onChange={(event) => this.handleChange(event, colValues[i + 1].field)}
                />
              </FormGroup>)
            }
          </Col>
        </Row>;
        fields.push(html);
      }
      return fields;
    };
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className={this.props.className}
        style={{ "maxWidth": "80%", "maxHeight": "80%" }}
      >
        <ModalHeader>{this.props.data.service.title}</ModalHeader>
        <ModalBody

        >
          <Row>
            <Col xs="7">
              {colValues &&
                displayFields()}</Col>
            <Col xs="5" style={{ "backgroundColor": "#e4e5e6" }}>
              <Row >
                Comments:

              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Steps labelPlacement="vertical" current={current}>
                <Step title="Request Submitted" description={description} />
                {stages.map((stage, i) => {
                  return <Step key={stage._id} title={stage.name} description={description} />
                })}
                <Step title="Request Completed" description={description} />
              </Steps>
            </Col>
          </Row>

          <Row><button type="button" onClick={() => { this.approve(stages[current - 1]._id, stages[current]._id) }}>Approve</button></Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.apply}>Apply</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

    );
  }
}

export default ActionComponent;