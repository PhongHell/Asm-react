import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Button, CardImg, Modal, ModalBody, ModalHeader, Row, Label, Col, Input,CardText} from "reactstrap";
import { Link, withRouter } from 'react-router-dom';
import dateFormat from "dateformat";
import { Loading } from './LoadingComponent';
import { LocalForm, Errors, Control } from "react-redux-form";
import  {FadeTransform}  from 'react-animation-components';

const required = (value) => value && value.length > 0 ;
const maxLength = (len) => (value) => !(value) || (value.length <= len);
const isNumber = (value) => !(value) ||!isNaN(Number(value));

class Staff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen1: false,
      modalOpen2: false,
      startDate: '',
      doB: '',
    }
  }

  componentDidMount = () =>{
    const oldDoB = this.props.staffSelected ? this.props.staffSelected.doB ? this.props.staffSelected.doB.slice(0, 10) : '' : '';
    const oldStartDate = this.props.staffSelected ? this.props.staffSelected.startDate ? this.props.staffSelected.startDate.slice(0, 10) : '' : '';
    this.setdoB(oldDoB);
    this.setstartDate(oldStartDate);
  }


  setModalOpenDelete =()=>{
    this.setState({
      modalOpen1: !this.state.modalOpen1
    })
  }

  setModalOpen2 =() =>{
    this.setState({
      modalOpen2: !this.state.modalOpen2
    })
  }

  handleClickNo = () =>{
    this.setModalOpenDelete();
  }

  handleClickYes =(staff) =>{
    this.props.delStaff(staff.id);
  }

  setdoB =(value)=> {
    this.setState({
      doB: value
    })
  }


  setstartDate =(value) => {
    this.setState({
      startDate: value
    })
  }

  handleSubmitEdit =(values)=> {
   
    this.props.editStaff(this.props.staffSelected.id, values.name, this.state.doB, this.state.startDate, values.departmentId, values.salaryScale, values.annualLeave, values.overTime);
   //hidden
    this.setModalOpen2();
  }

  renderStaff(staff) {
    const department = this.props.departments.filter(
      (dep) => dep.id === staff.departmentId
    )[0];
    const depName = department ? department.name : '';

    return (
      <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)'}}>
      <div className="mb-4 row mt-4">
        <div className="col-lg-2"></div>
        <div className="col-12 col-lg-3">
          <CardImg src={staff.image} className="staff-card-img"></CardImg>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-12 col-lg-6">
          <h5>Họ và tên: {staff.name}</h5>

         
          <CardText>Ngày sinh: {staff.doB ? dateFormat(staff.doB, "dd/mm/yyyy") : 'N/A'}</CardText>
          <CardText>Ngày vào công ty: {staff.startDate ? dateFormat(staff.startDate, "dd/mm/yyyy") : 'N/A'}</CardText>
          <CardText>Phòng ban: { depName }</CardText>
          <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
          <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
          <Button
            className="btn btn-danger mt-2"
            onClick={this.setModalOpenDelete}
          >
            Xóa nhân viên
          </Button>

          <Button
            className="btn btn-primary mt-2 ml-1"
            onClick={this.setModalOpen2}
          >
            Sửa thông tin
          </Button>
        </div>
      </div>
      </FadeTransform>
    );
  }

  render() {
    let rendered = <div></div>;
    let name = <div></div>;
    
    const oldDoB = this.props.staffSelected ? this.props.staffSelected.doB ? this.props.staffSelected.doB.slice(0, 10) : '' : '';
    const oldStartDate = this.props.staffSelected ? this.props.staffSelected.startDate ? this.props.staffSelected.startDate.slice(0, 10) : '' : '';

    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      )
    } else if (this.props.errMes != null) {
      return (
        <div className="container">
          <div className="row">
            {this.props.errMes}
          </div>
        </div>
      )
    } else if (this.props.staffSelected) {
      rendered = this.renderStaff(this.props.staffSelected);
      name = this.props.staffSelected.name;
    }

    return (
      <div className="container">

        <div>
          <Breadcrumb
            style={{ backgroundColor: "#ffffff" }}
          >
            <BreadcrumbItem>
              <Link to="/">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{name}</BreadcrumbItem>
          </Breadcrumb>
        </div>

        <h1 className="pb-3 text-dark">Thông tin nhân viên</h1>
        <div>{rendered}</div>
        <div>
        <Modal
          isOpen={this.state.modalOpen1}
          toggle={this.setModalOpenDelete}
        >
          <ModalHeader isOpen={this.state.modalOpen1}
          toggle={this.setModalOpenDelete}>Bạn muốn xóa nhân viên  <b>{this.props.staffSelected.name}</b> </ModalHeader>
          <ModalBody>   
            <button className="btn btn-danger mt-1" onClick={() => this.handleClickYes(this.props.staffSelected)}>Xóa</button> <button className="btn btn-secondary mt-1 ml-1" onClick={this.handleClickNo}>Trở lại</button>
          </ModalBody>
        </Modal>
      </div>

      <div>
        {/* Modal edit */}
        <Modal
          isOpen={this.state.modalOpen2}
          toggle={this.setModalOpen2}
        >
          <ModalHeader
            isOpen={this.state.modalOpen12}
            toggle={this.setModalOpen2}
          >
            Thêm nhân viên
          </ModalHeader>
          <ModalBody>
            <LocalForm
              onSubmit={(values) => this.handleSubmitEdit(values)}
            >
              <Row className="mt-2">
                <Label htmlFor="name" md={3}>
                  Tên nhân viên
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    className="form-control"
                    validators={{ required, maxLength: maxLength(15) }}
                    defaultValue={this.props.staffSelected.name}
                  ></Control.text>
                  <Errors
                    model=".name"
                    show={(field) => field.touched && !field.focus}
                    messages={{
                      required: "Yêu cầu nhập.",
                      maxLength: "Hãy nhập dưới 15 ký tự.",
                    }}
                    className="text-danger"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="doB" md={3}>
                  Ngày sinh
                </Label>
                <Col md={9}>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    onChange={(event) => {
                      return this.setdoB(event.target.value);
                    }}
                    defaultValue={oldDoB}
                  ></Input>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="startDate" md={3}>
                  Ngày bắt đầu
                </Label>
                <Col md={9}>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    onChange={(event) => {
                      return this.setstartDate(event.target.value);
                    }}
                    defaultValue={oldStartDate}
                  ></Input>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="departmentId" md={3}>
                  Phòng ban
                </Label>
                <Col md={9}>
                  <Control.select
                    model=".departmentId"
                    id="departmentId"
                    name="departmentId"
                    className="form-control"
                    defaultValue={this.props.staffSelected.departmentId}
                  >
                    <option value="Dept01">Sale</option>
                    <option value="Dept02">HR</option>
                    <option value="Dept03">Marketing</option>
                    <option value="Dept04">IT</option>
                    <option value="Dept05">Finance</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="salaryScale" md={3}>
                  Hệ số lương 
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    className="form-control"
                    validators={{ isNumber }}
                    defaultValue={this.props.staffSelected.salaryScale}
                  ></Control.text>
                  <Errors
                    model=".salaryScale"
                    show={(field) => field.touched && !field.focus}
                    messages={{
                      isNumber: "Hãy nhập số.",
                    }}
                    className="text-danger"
                  ></Errors>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="annualLeave" md={3}>
                  Nghỉ phép
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    className="form-control"
                    validators={{ isNumber }}
                    defaultValue={this.props.staffSelected.annualLeave}
                  ></Control.text>
                  <Errors
                    model=".annualLeave"
                    show={(field) => field.touched && !field.focus}
                    messages={{
                      isNumber: "Hãy nhập số.",
                    }}
                    className="text-danger"
                  ></Errors>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="overTime" md={3}>
                  Làm thêm giờ
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".overTime"
                    id="overTime"
                    name="overTime"
                    className="form-control"
                    validators={{ isNumber }}
                    defaultValue={this.props.staffSelected.overTime}
                  ></Control.text>
                  <Errors
                    model=".overTime"
                    show={(field) => field.touched && !field.focus}
                    messages={{
                      isNumber: "Hãy nhập số.",
                    }}
                    className="text-danger"
                  ></Errors>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={{ size: 3, offset: 3 }}>
                  <Button type="submit" className="btn btn-secondary">
                    Sửa thông tin
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        </div>
      
      </div>
    );
  }
}

export default withRouter(Staff);


