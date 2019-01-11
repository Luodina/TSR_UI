import React, { Component } from 'react';
import IconPage from "../Components/IconPage";
import { sysConfig } from "../../../_config";
class PackageRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
    this.handleIconButtonClick = this.handleIconButtonClick.bind(this);
    this.getPackageCatelog();
  }

  getPackageCatelog() {
    fetch(sysConfig.API_PREFIX + "/package-defination/search",
      {
        /*method:'GET'*/

        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
          'TSRAuth': "xlNIOEWONXVLSDFOiuLSKNLIUAD",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify(
          {
            criteria: {

            },
            options: {
            }
          }
        )
      }
    ).then(blob => blob.json())
      .then(data => {
        var list = data.map((item) => {
          //item.url="/request/new";
          return item;
        })
        this.setState({
          list: list
        })
      })
      .catch(e => {
        return e;
      });
  }
  handleIconButtonClick(event, data) {
    if (sessionStorage) sessionStorage.setItem("package-name", data.label);
    if (typeof this.props.iconButtonOnClick == "function") {
      return this.props.iconButtonOnClick(event, data);
    }
  }
  render() {
    const iconList = () => {
      return (
        <div className="animated fadeIn">
          <IconPage data={this.state.list} iconButtonOnClick={(event, data) => this.handleIconButtonClick(event, data)} ></IconPage>
        </div>
      );
    };
    return iconList();
  }
}
export default PackageRequest;