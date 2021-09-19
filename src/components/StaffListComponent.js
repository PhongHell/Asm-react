import React from "react";
import { Card, CardImg, CardText } from "reactstrap";
import { Link } from "react-router-dom";

const StaffList = ({staffs}) => {
    const STAFFS = staffs.map((staff) => {
      return (
        <Link to={`/staff/${staff.id}`} className=" col-6 col-md-4 col-lg-2 text-dark mb-2"
         style={{ textDecoration: "none" }}>
          <div key={staff.id} style={{textAlign : "center"}}>
            <Card tag="li" className="mt-2 p-1">
              <CardImg src={staff.image}></CardImg>
              <CardText >{staff.name}</CardText>
            </Card>
          </div>
        </Link>
      );
    });
    return (
      <div className="container">
        <h1 className="pb-3 text-dark">Danh sách nhân viên</h1>
        <div className="pb-2 text-dark">
          <h4> Bấm vào tên nhân viên để xem thông tin chi tiết.</h4>
        </div>
        <div className="bg-light" style={{ 'width' : '300px'}}>
        </div>
        <div className="row"> {STAFFS}</div>
      </div>
    );
  }

export default StaffList;
