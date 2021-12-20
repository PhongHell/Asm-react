import React, { Component } from "react";
import { Switch, Route, withRouter ,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import StaffList from "./StaffListComponent";
import Staff from "./StaffComponent";
import Header from "./HeaderComponent";
import DepList from "./DepartmentComponent";
import Footer from "./FooterComponent";
import SalaryList from "./SalaryList";
import DepWithId from "./DepWithId";
import { postStaff, fetchStaffs, fetchDeps, fetchSalaries, delStaff, editStaff } from "../redux/ActionCreator";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    staffs : state.staffs,
    departments : state.departments,
    staffsSalaries : state.staffsSalaries,
  }
}

const mapDispatchToProps = (dispatch) => ({
  postStaff: ( name, doB, startDate, department, salaryScale, annualLeave, overTime
  ) =>
    dispatch(
      postStaff(  name, doB, startDate, department, salaryScale, annualLeave, overTime
      )
    ),
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDeps: () => {dispatch(fetchDeps())},
  fetchSalaries: () => {dispatch(fetchSalaries())},
  delStaff: (staffId) => {dispatch(delStaff(staffId))},
  editStaff: (id, name, doB, startDate, department, salaryScale, annualLeave, overTime
  ) =>
    dispatch(
      editStaff( id, name, doB, startDate,  department, salaryScale, annualLeave, overTime
      )
    ),
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDeps();
    this.props.fetchSalaries();
  }

  render() {
    const StaffWithId = ({ match }) => {    
    const staffSelected = this.props.staffs.staffs.filter(
        (staff) => staff.id === parseInt(match.params.id, 10)
      )[0];
      console.log({match})
      return (
        <Staff
          delStaff={this.props.delStaff}
          editStaff={this.props.editStaff}
          departments={this.props.departments.departments}
          staffSelected={staffSelected ? staffSelected :null}
          department={this.props.departments.departments}
          isLoading={this.props.staffs.isLoading}
          errMes={this.props.staffs.errMes}
        />
      );
    };

    return (
        <div>
          <Header />
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={500}>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <StaffList
                  staffs={this.props.staffs.staffs}
                  departments={this.props.departments.departments}
                  postStaff={this.props.postStaff}
                  isLoading={this.props.staffs.isLoading}
                  errMes={this.props.staffs.errMes}
                />
              )}
            />
          
            <Route path="/staff/:id" component={StaffWithId} />
            <Route path="/department/:id" 
                  component={(match) => (<DepWithId match={match}
                  fetchDepStaffs={this.props.fetchDepStaffs} 
                  depStaffs={this.props.depStaffs} 
                  departments={this.props.departments.departments}/>)} />
            <Route path="/departments"
                  component={() => <DepList 
                  departments={this.props.departments.departments}
                  isLoading={this.props.departments.isLoading}
                  errMes={this.props.departments.errMes} />}
            />
            <Route path="/salary"
                  component={() => <SalaryList staffsSalaries={this.props.staffsSalaries.staffsSalaries}
                  isLoading={this.props.staffsSalaries.isLoading}
                  errMes={this.props.staffsSalaries.errMes} />}
            />
            <Redirect to="/" />
          </Switch>
          </CSSTransition>
          </TransitionGroup>
          <Footer />
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
