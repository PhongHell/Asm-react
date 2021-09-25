import React, { Component } from "react";
import {Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from "react-router-dom";

const basicSalary = 5000000;
const overTimeSalary = 1000000;

// sorted by salary staff  
function salary(a, b) {
  const salaryA = a.salaryScale * basicSalary + a.overTime * overTimeSalary;
  const salaryB = b.salaryScale * basicSalary + b.overTime * overTimeSalary;
  return salaryA -salaryB;
  }

//sorted by staff id
  function staffId(a,b){
    return a.id - b.id;
  }

class SalaryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: null
    }
  }

  setSort = (sort) =>{
    this.setState(
      {sort: sort}
    )
  }
  //method sort 
  renderSalary(sort) {//salary up
    if (sort === "up") {
      return this.props.staffs.sort(salary).map((staff) => {
        return (
          <div key={staff.id} className="col col-12 col-md-6 col-lg-4 p-2 ">
            <Card tag="li" className="mt-2 p-1">
              <CardTitle>{staff.name}</CardTitle>
              <CardText className="pl-2 pb-2">
                Mã nhân viên: {staff.id}
              </CardText>
              <CardText className="pl-2 pb-2">
                Hệ số lương: {staff.salaryScale}
              </CardText>
              <CardText className="pl-2 pb-2">
                Số giờ làm thêm: {staff.overTime}
              </CardText>
              <CardText
                className="pl-2 pb-2 bg-light" >
               <b> Lương:</b> {(
                  staff.salaryScale * basicSalary +
                  staff.overTime * overTimeSalary
                )/1000000} triệu đồng
              </CardText>
            </Card>
          </div>
        );
      });
    } else if (sort === "down") {//salary down
      return this.props.staffs.sort(salary).reverse().map((staff) => {
        return (
          <div key={staff.id} className="col col-12 col-md-6 col-lg-4 p-2">
            <Card tag="li" className="mt-2 p-1">
              <CardTitle>{staff.name}</CardTitle>
              <CardText className="pl-2 pb-2">Mã nhân viên: {staff.id}</CardText>
              <CardText className="pl-2 pb-2">
                Hệ số lương: {staff.salaryScale}
              </CardText>
              <CardText className="pl-2 pb-2">
                Số giờ làm thêm: {staff.overTime}
              </CardText>
              <CardText
                className="pl-2 pb-2 bg-light"
              >
               <b> Lương:</b> {(
                  staff.salaryScale * basicSalary +
                  staff.overTime * overTimeSalary
                )/1000000} triệu đồng
              </CardText>
            </Card>
          </div>
        );
      });
    }else {// default
      return this.props.staffs.sort(staffId).map((staff) => {
          return (
            <div key={staff.id} className="col col-12 col-md-6 col-lg-4 p-2">
              <Card tag="li" className="mt-2 p-1">
                <CardTitle>{staff.name}</CardTitle>
                <CardText className="pl-2 pb-2">Mã nhân viên: {staff.id}</CardText>
                <CardText className="pl-2 pb-2">
                  Hệ số lương: {staff.salaryScale}
                </CardText>
                <CardText className="pl-2 pb-2">
                  Số giờ làm thêm: {staff.overTime}
                </CardText>
                <CardText
                  className="pl-2 pb-2 bg-light"
                >
                <b> Lương:</b>  {(
                    staff.salaryScale * basicSalary +
                    staff.overTime * overTimeSalary
                  ) / 1000000}triệu đồng
                </CardText>
              </Card>
            </div>
          );
        });
      }
    };

  render() {
    return (
      <div className="container">
        <div>
          <Breadcrumb style={{ backgroundColor: "#ffffff", padding: 0, margin: 0 }}>
            <BreadcrumbItem>
              <Link to="/">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active >Bảng lương </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <h1 className="pb-3 text-dark">Danh sách nhân viên</h1>
        <div>
          <span>Sắp xếp theo</span>
          <button className="btn btn-secondary m-2" onClick={() => { this.setSort() }}>
           Mã nhân viên
          </button>
          
          <button className="btn btn-secondary m-2" onClick={() => { this.setSort("up") }}>
            Thấp &#8594; Cao
          </button>

          <button className="btn btn-secondary m-2" onClick={() => { this.setSort("down") }}>
            Cao &#8594; Thấp{" "}
          </button>
        </div>
        <div className="row">{ this.renderSalary(this.state.sort) }</div>
      </div>
    );
  }
}

export default SalaryList;
