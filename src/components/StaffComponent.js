import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, CardImg } from "reactstrap";
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";

class Staff extends Component {
  constructor(props) {
    super(props);
  }

  renderStaff(staff) {
    return (
      <div className="mb-4 row mt-4">
        <div className="col-lg-2"></div>
        <div className="col-12 col-lg-3">
          <CardImg src={staff.image} className="staff-card-img"></CardImg>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-12 col-lg-6">
          <h5>Họ và tên: {staff.name}</h5>
          <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
          <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
          <p>Phòng ban: {staff.department.name}</p>
          <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
          <p>Số ngày đã làm thêm: {staff.overTime}</p>
        </div>
      </div>
    );
  }

  render() {
    const staff = this.props.staffSelected;
    let rendered = <div></div>;
    let name = <div></div>;
    if (staff !=null) {
      console.log(staff)
      rendered = this.renderStaff(staff);
      name = staff.name;
    }

    return (
      <div className="container">
        <div>
          <Breadcrumb
            style={{ backgroundColor: "#ffffff", padding: 0, margin: 0 }}
          >
            <BreadcrumbItem>
              <Link to="/home">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem >{name}</BreadcrumbItem>
          </Breadcrumb>
        </div>

        <h1 className="pb-3 text-dark">Thông tin nhân viên</h1>
        <div>{rendered}</div>
        <div className="row">
        </div>
      </div>
    );
  }
}

export default Staff;


