import React from 'react';
import { Button, Row, Col, Modal, Label, Input, FormGroup, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.data.rowValues,
      rowValues: props.data.rowValues
    };
    console.log('in modal props', this.props);
    this.handleChange = this.handleChange.bind(this);

    this.toggle = this.toggle.bind(this);
    this.apply = this.apply.bind(this);
  }

  apply(event, field) {
    let tmp = this.state.value;
    this.props.onGridEditinModal(tmp)
  }
  toggle() {
    console.log()
    this.props.exitModal()
  }
  handleChange(event, field) {
    var value = event.target.value;
    console.log('value', value, 'field', field);
    let tmp = this.state.value;
    tmp[field] = value;
    this.setState({
      value: tmp
    })
    console.log('this.state.value', this.state.value);
  }
  render() {
    let colValues = this.props.data.colValues;
    let rowValues = this.state.rowValues;//props.data.rowValues;
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
      console.log('fields', fields);
      return fields;
    };
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className}>
        <ModalHeader>{this.props.data.service.title}</ModalHeader>
        <ModalBody>
          {colValues &&
            displayFields()}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.apply}>Apply</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

    );
  }
}

export default ModalComponent;