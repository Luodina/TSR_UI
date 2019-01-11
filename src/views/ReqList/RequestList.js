import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import { connect } from 'react-redux';
import { setBundleListDataLoading } from '../../_actions';

class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "saved"
    }
    this.onGridReady = this.onGridReady.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { url } = this.props.match;
    let status = url.replace("/reqlist/", "");
    let user = JSON.parse(localStorage.getItem("user")).id;
    dispatch(setBundleListDataLoading(status, { user: user }))
    this.setState({ status: status });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // params.api.sizeColumnsToFit();
    //this.gridColumnApi.sizeColumnsToFit();
  }

  // getService(item) {
  //   return <Redirect to="/reqlist/inprogress/:id" />
  // }

  serviceDetails(e) {
    console.log("status", this.state.title)
    let rowInfo = e.data;
    this.setState({
      redirect: "/reqlist/" + this.state.title + "/" + rowInfo._id
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
  }

  render() {
    const { data } = this.props;
    let colValues = [];
    let rowValues = [];
    let style = {
      "width": "100%",
      "height": "300px"
    };
    if (data !== null && data !== undefined) {
      data.forEach(item => {
        let dataObj = {};
        Object.keys(item).forEach((field) => {
          colValues.push({ headerName: field, field: field });
          dataObj[field] = item[field];
        });
        rowValues.push(dataObj);
      })
    }
    return (
      <Row>
        {this.renderRedirect()}
        <Col xs="12" >
          <Card>
            <CardHeader>
              <i className='fa fa-save'>
                <span style={{ marginLeft: "10px" }}>Request List ({this.state.status})</span>
              </i>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" >
                  <div className="ag-theme-balham"
                    style={style}>
                    <AgGridReact
                      onGridReady={this.onGridReady}
                      columnDefs={colValues}
                      rowData={rowValues}
                      onRowDoubleClicked={(e) => this.serviceDetails(e)}
                    >
                    </AgGridReact>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row >
    )
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.bundleReducer.data
  }
}

export default connect(
  mapStateToProps
)(RequestList);
