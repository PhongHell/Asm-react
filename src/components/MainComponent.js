import React, { Component } from "react";
import { Switch, Route, Redirect ,WithRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import StaffList from "./StaffListComponent";
import Staff from "./StaffComponent";
import Header from "./HeaderComponent";
import DepList from "./DepartmentComponent";
import Footer from "./FooterComponent";
import SalaryList from "./SalaryList";
import {connect} from 'react-redux'
import { withRouter } from "react-router";

const mapStateToProps = state =>{
  return{
    staffs : state.staffs,
    departments : state.departments,
  
  }
}
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: this.props.staffs,
    };
  }

  addStaff = (staff)=> {
    this.setState({
      staffs: this.state.staffs.concat([staff]),
    }); 
  }
 
  render() {
    const StaffWithId = ({ match }) => {
      return (
        <Staff staffSelected={ this.state.staffs.filter( 
          (staff) => staff.id === parseInt(match.params.id, 10))[0]}
          department= {this.props.departments}
        />
      );
    };

    return (
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={() => ( <StaffList staffs={this.state.staffs}
             departments={this.props.departments} 
             updateStaff={(newStaff) => this.addStaff(newStaff)}/>)}/>   
            <Route exact path="/staff/:id" component={StaffWithId} />
            <Route exact path="/departments" component={() => <DepList departments={this.props.departments} staffs={this.state.staffs}/>}/>
            <Route path="/salary" component={() => <SalaryList staffs={this.state.staffs} />}/>
            < Redirect to ="/" />
          </Switch>
          <Footer />
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
