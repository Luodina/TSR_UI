import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import NumericEditor from "./numericEditor";
import OSEditor from "./osEditor";
import OSRenderer from "./osRenderer";
import ModalComponent from "./ModalComponent";
import ActionComponent from "./ActionComponent";
import { Row, Col, Button } from 'reactstrap';
import defaultData from "./../dfConfig_";
import _ from 'lodash';
import { connect } from 'react-redux';
// import defaultStages from "./../wfConfig_";
function deepObjCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

class GridComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log('in datagrid props', this.props);
    this.state = {
      // service: props.service,
      // colValues: props.colValues,
      // status: props.status,
      // dataServices: props.dataServices,
      frameworkComponents: {
        numericEditor: NumericEditor,
        osRenderer: OSRenderer,
        osEditor: OSEditor,
      },
      isModalOpen: false,
      selectedRows: [],
    };

    this.onGridReady = this.onGridReady.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.onGridEditinModal = this.onGridEditinModal.bind(this);
    this.exitModal = this.exitModal.bind(this);
    this.addRowHandler = this.addRowHandler.bind(this);
    this.onRemoveSelected = this.onRemoveSelected.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }
  componentWillMount() {
    console.log(" componentWillMount")
  }
  componentDidUpdate() {
    console.log(" componentDidUpdate", this.state.selectedRows)
    let tmp = this.state.selectedRows;
    if (tmp.length === 0) {
      this.selectLastRow();
    }
  }
  componentDidMount() {
    console.log(" componentDidMount")
  }
  onGridReady(params) {
    console.log("onGridReady")
    this.gridApi = params.api;
    this.selectLastRow();
    this.gridColumnApi = params.columnApi;
    // params.api.sizeColumnsToFit();
    //this.gridColumnApi.sizeColumnsToFit();
  }
  selectLastRow() {
    // let rowNodeID = this.gridApi.getLastDisplayedRow();
    // let lastRow = this.gridApi.getRowNode(rowNodeID);
    // console.log("lastRow", lastRow);
    // if (lastRow) { lastRow.setSelected(true, true); }
  }
  addRowHandler(srv) {
    let rowData = deepObjCopy(defaultData["services"][srv][0]);
    // let stageData = deepObjCopy(defaultStages["services"][srv][0]);
    let ds = deepObjCopy(this.state.dataServices);
    //ds[srv].push({ data: rowData, stages: stageData });
    ds[srv].push(rowData);
    console.log("rowData", rowData, "ds", ds);
    this.setState({
      dataServices: ds,
      selectedRows: []
    });

    //this.props.rowUpdates(ds)
  }
  clearData() {
    this.gridApi.setRowData([]);
  }
  onRemoveSelected(srv) {
    let selectedData = this.gridApi.getSelectedRows();
    this.gridApi.updateRowData({ remove: selectedData });
    let rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    this.gridApi.redrawRows();
    let ds = this.state.dataServices;
    ds[srv] = rowData;
    this.setState({ dataServices: ds, selectedRows: [] });
  }
  onSelectionChanged(params) {
    this.gridApi = params.api;
    let selectedData;
    console.log("xxxx", this.gridApi)
    if (this.gridApi.getSelectedRows().length > 0) {

      selectedData = this.gridApi.getSelectedRows()[0];
    } else {
      selectedData = [];
    }
    console.log("selectedData", selectedData)

    this.setState({
      selectedRows: selectedData
    });
  }
  openEditModal() {
    this.setState({ isModalOpen: true });
  }

  exitModal() {
    this.setState({
      isModalOpen: false
    });
  }
  onGridEditinModal(value, service) {
    if (!value) {
      this.setState({
        isModalOpen: []
      });
    }
    let rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    this.gridApi.redrawRows()
    this.setState({
      isModalOpen: []
    });
  }
  render() {

    let { service, dataServices, status, colValues, stages } = this.props;
    function getRowValues(srv) {
      if (status === "new") {
        return srv;
      } else {
        return srv.map(function (item) { return item.data; });
      }
    }
    if (service && dataServices && status && colValues && stages && status) {
      //let dataServices = this.state.dataServices;
      let rowValues = getRowValues(dataServices[service.name]);
      return (
        <Row key={service.name + "_grid"} >
          <Col xs="12" >
            <div className="ag-theme-balham"
              style={service.style}>
              <AgGridReact
                onGridReady={this.onGridReady}
                frameworkComponents={this.state.frameworkComponents}
                columnDefs={colValues}
                rowData={rowValues}
                rowSelection='single'
                onSelectionChanged={this.onSelectionChanged}>
              </AgGridReact>
            </div>
            <div style={{ float: "right", marginTop: "10px" }}>
              <Button
                style={{ marginRight: "5px" }}
                size="sm"
                color="success"
                onClick={() => this.addRowHandler(service.name)}>
                <i className="fa fa-plus-circle" >Add </i>
              </Button>
              <Button
                disabled={this.state.selectedRows.length === 0}
                style={{ marginRight: "5px" }}
                size="sm"
                color="warning"
                onClick={this.openEditModal}>
                <i className="fa fa-pencil" >
                  {status === "new" ? "Edit" : "Action"}
                </i>
              </Button>
              {
                this.state.isModalOpen === true && status === "new" &&
                (<ModalComponent isOpen={this.state.isModalOpen}
                  data={
                    {
                      rowValues: this.state.selectedRows,
                      colValues: colValues,
                      service: service
                    }
                  }
                  exitModal={this.exitModal}
                  onGridEditinModal={this.onGridEditinModal}
                />)
              }
              {
                this.state.isModalOpen === true && status !== "new" &&
                (<ActionComponent isOpen={this.state.isModalOpen}
                  data={
                    {
                      rowValues: this.state.selectedRows,
                      colValues: colValues,
                      service: service,
                      stages: stages
                    }
                  }
                  onGridEditinModal={this.onGridEditinModal}

                />)
              }
              <Button
                size="sm"
                color="danger"
                disabled={this.state.selectedRows.length === 0}
                onClick={() => this.onRemoveSelected(service.name)}>
                <i className="fa fa-trash">Delete</i>
              </Button>
            </div>
          </Col>
        </Row>
      );
    } else {
      return (<div>Loading...</div>)
    }
  }
}

export default connect(
  //mapStateToProps
)(GridComponent);