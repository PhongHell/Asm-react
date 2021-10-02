import React, { Component } from "react";
import { fetchDepStaffs } from "../redux/ActionCreator";
import { connect } from "react-redux";
import {Card, CardImg, CardText} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from "./LoadingComponent";

const mapStateToProps = state => {
    return {
      depStaffs: state.depStaffs
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    fetchDepStaffs: (depId) => {dispatch(fetchDepStaffs(depId))},
});
  class DepStaffs extends Component {

    render() {
      const STAFFS = this.props.depStaffs.map((staff) => {
        return (
          <Link
            to={`/staff/${staff.id}`}
            className="col col-6 col-md-4 col-lg-2 text-dark mb-2"
            style={{ textDecoration: "none" }} key={staff.id}
          >
            <div>
              <Card tag="li" className="mt-2 p-1">
                <CardImg src={staff.image}></CardImg>
                <CardText>{staff.name}</CardText>
              </Card>
            </div>
          </Link>
        );
      });
    
      return (
        <div className="container">
          <h1 className="pb-3 text-left">Phòng {this.props.depName} </h1> 
          <div>
            <p>
              * Danh sách nhân viên phòng.
            </p>
          </div>
    
          <div className="row">
            {this.props.depStaffs.isLoading? <Loading /> 
            : this.props.depStaffs.errMes != null ? this.props.depStaffs.errMes 
            : STAFFS} 
          </div>
    
        </div>
      );
    }
  }
class DepWithId extends Component {

  componentDidMount(){
      const id = this.props.match.match.params.id;
      this.props.fetchDepStaffs(id);
      //fetch Dept
      console.log(this.props.match.match)
  }

  render() {
      const dep = this.props.departments.filter(
        (dep) => dep.id === this.props.match.match.params.id
      )[0];
     const depName = dep? dep.name : null ;
     //dep.id => Dept => depName

    return (
 
        <DepStaffs
            depName={depName}
            depStaffs={this.props.depStaffs.depStaffs}
        />
        );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepWithId);


