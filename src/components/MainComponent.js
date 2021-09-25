import React, { Component } from "react";
import { Switch, Route, Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import StaffList from "./StaffListComponent";
import Staff from "./StaffComponent";
import Header from "./HeaderComponent";
import DepList from "./DepartmentComponent";
import Footer from "./FooterComponent";
import SalaryList from "./SalaryList";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      departments :DEPARTMENTS,

    };
  }
 
  //add newStaff
  addStaff = (staff)=> {
    const currentStaffs = this.state.staffs;
    this.setState({
      staffs: currentStaffs.concat([staff]),
    });

  }
 
 

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <Staff staffSelected={ this.state.staffs.filter( 
          (staff) => staff.id === parseInt(match.params.id, 10))[0]}
          department= {this.state.departments}
        />
      );
    };

    return (
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={() => ( <StaffList staffs={this.state.staffs}
             departments={this.state.departments} 
             updateStaff={(newStaff) => this.addStaff(newStaff)}/>)}/>   
            <Route exact path="/staff/:id" component={StaffWithId} />
            <Route exact path="/departments" component={() => <DepList departments={this.state.departments} staffs={this.state.staffs}/>}/>
            <Route path="/salary" component={() => <SalaryList staffs={this.state.staffs} />}/>
            < Redirect to ="/" />
          </Switch>
          <Footer />
        </div>
    );
  }
}

export default Main;
