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
      staffSelected: null,
    };
  }

  // Change state staffSelect from null to the selected staff
  onStaffSelected = (staffId) => {
    this.setState({ staffSelected: staffId });
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <Staff staffSelected={ STAFFS.filter( 
          (staff) => staff.id === parseInt(match.params.id, 10) )[0]}
          department={DEPARTMENTS}
        />
      );
    };

    return (
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={() => ( <StaffList staffs={STAFFS} departments={DEPARTMENTS} onClick={(staffId) => this.onStaffSelected(staffId)}
                />
              )}
            />
            <Route exact path="/staff/:id" component={StaffWithId} />
            <Route exact path="/departments" component={() => <DepList departments={DEPARTMENTS} staffs={STAFFS}/>}/>
            <Route path="/salary" component={() => <SalaryList staffs={STAFFS} />}/>
            < Redirect to ="/" />
          </Switch>
          <Footer />
        </div>
    );
  }
}

export default Main;
