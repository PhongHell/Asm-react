import {  Jumbotron ,Modal , Button ,ModalHeader ,ModalBody ,Form,
 FormGroup,FormFeedback, Label ,Input ,Col ,Row , Card ,CardImg ,CardText, Breadcrumb} from 'reactstrap';
import { Link } from "react-router-dom";
import React, { Component } from 'react'
export default class StaffList extends Component{
  constructor(props){
    super(props);
      this.state ={
        isModalOpen : false,
        search : "",
        name: "",
        dob : "",
        startdate : "",
        department: "Sale",
        salaryscale:"",
        annualleave: "",
        overtime : "",
        touched :{
          name:false,
          dob :false,
          startdate :false,
          salaryscale:false,
          annualleave:false,
          overtime :false,
      },
    
      }
      this.handleSearch = this.handleSearch.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
    
    }
    toggleModal = ()=> {
      this.setState({
          isModalOpen: !this.state.isModalOpen
      });
    }
    handleBlur =(field) =>(evt) =>{
      this.setState({
      touched : {...this.state.touched,[field] :true}
      })
  }
    handleSearch = () =>{
      this.setState({
        search : this.search.value,
      })
  //console.log(this.search.value)
    }
    handleInputChange = (event) =>{
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
          [name] : value,
      })
      console.log(this.state.department)
  }
  //form validation
  validate(name,dob,startdate,salaryscale,annualLeave,overtime){
    const errors = {
      name: "",
      dob : "",
      startdate : "",
      salaryscale:"",
      annualleave: "",
      overtime : "",
    }

    if(this.state.touched.name && name.length < 3){
       errors.name =  " Tên nhân viên nhiều hơn 3 chữ cái .";
    }else if(this.state.touched.name && name.length >30){
        errors.name =  "tên nhân viên nên ít hơn 30 chữ cái .";
    }

    if(this.state.touched.dob && dob == ""){
        errors.dob =  "Không được bỏ trống.";
     }
  
     if(this.state.touched.startdate && startdate == ""){
      errors.startdate =  "Không được bỏ trống.";
   }
     const req = /^\d+$/;
     if(this.state.touched.salaryscale && !req.test(salaryscale)){
        errors.salaryscale=  "hệ số lương kiểu chữ số và không được bỏ trống";
     }else if(this.state.touched.salaryscale && salaryscale <1){
       errors.salaryscale=  "hệ số lương  > 1 ";
     }else if(this.state.touched.salaryscale && salaryscale >3){
      errors.salaryscale=  "hệ số lương < 3 ";
    }

     if(this.state.touched.annualleave && !req.test(annualLeave)){
      errors.annualleave=  "Số nhày nghỉ còn lại kiểu số và không được bỏ trống";
      }
      if(this.state.touched.overtime && !req.test(overtime)){
        errors.overtime =  "Số ngày tăng ca kiểu số và không được bỏ trống";
        }
    
    return errors;

}
  handleSubmit = (event) =>{
    const errors = this.validate(this.state.name,this.state.dob,this.state.startdate,this.state.salaryscale,this.state.annualleave,this.state.overtime)
    event.preventDefault();

  
    if( this.state.name===""||this.state.dob===""||this.state.startdate===""
    ||this.state.salaryscale===""||this.state.annualleave===""||this.state.overtime===""
    ||errors.name!==""||errors.dob!==""||errors.startdate!==""||errors.salaryscale!==""
    ||errors.annualleave!==""||errors.overtime!==""
  )
    {
      alert("yêu cầu nhập đầy đủ và chính xác thông tin nhân viên")
    }else{
      const newStaff = {
        id:  this.props.staffs.length,
        name:  this.name.value,
        doB: this.dob.value,
        salaryScale: this.salaryscale.value,
        startDate: this.startdate.value,
        department: { name: this.department.value},
        annualLeave: this.annualleave.value,
        overTime:  this.overtime.value,
        image: '/assets/images/alberto.png',
      };
      console.log("thêm nhân viên có id :" + newStaff.id)
//function callback
      this.props.updateStaff(newStaff);
      this.setState({
        name: "",
        dob : "",
        startdate : "",
        salaryscale:"",
        annualleave: "",
        overtime : "",
      })
console.log("new" + newStaff);
//hidden modal
      this.setState({
      isModalOpen: !this.state.isModalOpen});
    }
  
}
    
   render(){
    const errors = this.validate(this.state.name,this.state.dob,this.state.startdate,this.state.salaryscale,this.state.annualleave,this.state.overtime)
    const STAFFS = this.props.staffs.filter((staff) =>{
        if(this.state.search ==null ){
          return staff;  
        }
        else if(staff.name.toLowerCase().includes(this.state.search.toLowerCase())){
          return staff;
        }
      })
     .map((staff) => {
      return (
        <Link
          to={`/staff/${staff.id}`}
          className="col col-6 col-md-4 col-lg-2 text-dark mb-2"
          style={{ textDecoration: "none" }}
        >
          <div key={staff.id}>
            <Card
              tag="li"
              className="mt-2 p-1"
            >
              <CardImg src={staff.image}></CardImg>
              <CardText>{staff.name}</CardText>
            </Card>
          </div>
        </Link>
      );
    }
    );
    return (
      <div className="container">
        <h1 className="pb-3 text-dark">Danh sách nhân viên</h1>
        <div className="pb-2 text-dark">
          <h4> Bấm vào tên nhân viên để xem thông tin chi tiết.</h4>
        </div>
        <div className="row"  >
        <div className="col-lg-1 col-md-3 m-2">
          <Button
            className="btn btn-primary "
            onClick={this.toggleModal}
          >
            +
          </Button>
          </div>
          <div className="col-lg-5 col-md-4 m-2 text-center">
         <Input type="text"  placeholder="Tìm kiếm theo tên nhân viên" 
            name="search"
            innerRef ={(input) => this.search = input}
           />
           <Button onClick={this.handleSearch} className="m-1" > Tìm kiếm</Button>
           </div>
           </div>
            
        <div className="bg-light" style={{ 'width' : '300px'}}>
        </div>
        <div className="row"> {STAFFS}</div>
        <Modal isOpen={this.state.isModalOpen} toggle ={this.toggleModal}>
          <ModalHeader  toggle ={this.toggleModal}>
            Thêm nhân viên
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>

              <Row className="mt-2">
                <Label htmlFor="name" md={5}>
                  Tên nhân viên:{" "}
                </Label>
                <Col md={7}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    valid ={errors.name === ""}
                    invalid ={errors.name !== ""}
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    onBlur = {this.handleBlur("name")}
                    innerRef ={(value) => this.name =value}
                    /> 
                    <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="dob" md={5}>
                  Ngày sinh:{" "}
                </Label>
                <Col md={7}>
                  <Input
                    type="date"
                    id="dob"
                    name="dob"
                    valid ={errors.dob === ""}
                    invalid ={errors.dob !== ""}
                    onChange={this.handleInputChange}
                    onBlur = {this.handleBlur("dob")}
                    value={this.state.dob}    
                    innerRef ={(input) => this.dob = input}        
                  ></Input>
                  <FormFeedback>{errors.dob}</FormFeedback>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="startdate" md={5}>
                  Ngày bắt đầu:{" "}
                </Label>
                <Col md={7}>
                  <Input
                    type="date"
                    id="startdate"
                    name="startdate"
                    value={this.state.startdate}  
                    valid ={errors.startdate === ""}
                    invalid ={errors.startdate !== ""}
                    onChange={this.handleInputChange}
                    onBlur = {this.handleBlur("startdate")} 
                    innerRef ={(input) => this.startdate = input}
                  ></Input>
                   <FormFeedback>{errors.startdate}</FormFeedback>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="department" md={5}>
                  Phòng ban:{" "}
                </Label>
                <Col md={7}>
                  <Input
                    type="select"
                    id="department"
                    name="department"
                    value = {this.state.department}
                    innerRef ={(value) => this.department =value}
                    onChange={this.handleInputChange}
                  >
                    <option>Sales</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Input>
                  
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="salaryscale" md={5}>
                  Hệ số lương:{" "}
                </Label>
                <Col md={7}>
                  <Input
                    type="text"
                    id="salaryscale"
                    name="salaryscale"
                    value={this.state.salaryscale}
                    valid ={errors.salaryscale === ""}
                    invalid ={errors.salaryscale !== ""}
                    onChange={this.handleInputChange}
                    onBlur = {this.handleBlur("salaryscale")}
                    innerRef ={(input) => this.salaryscale = input} 
                  ></Input>
                  <FormFeedback>{errors.salaryscale}</FormFeedback>
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="annualleave" md={5}>
                  Số ngày nghỉ còn lại:{" "}
                </Label>
                <Col md={7}>
                  <Input
                    type="text"
                    id="annualleave"
                    name="annualleave"
                    value={this.state.annualleave}     
                    valid ={errors.annualleave === ""}
                    invalid ={errors.annualleave !== ""}
                    onChange={this.handleInputChange}
                    onBlur = {this.handleBlur("annualleave")} 
                    innerRef ={(input) => this.annualleave = input}
                  ></Input>
                   <FormFeedback>{errors.annualleave}</FormFeedback>
                </Col>
              </Row>
              <Row className="mt-1">
                <Label htmlFor="overtime" md={5}>
                  Số ngày làm thêm:{" "}
                </Label>
                <Col md={7}>
                  <Input
                    type="text"
                    id="overtime"
                    name="overtime"
                    value={this.state.overtime}   
                    valid ={errors.overtime === ""}
                    invalid ={errors.overtime !== ""}
                    onChange={this.handleInputChange}
                    onBlur = {this.handleBlur("overtime")}
                    innerRef ={(input) => this.overtime = input} 
                  ></Input>
                   <FormFeedback>{errors.overtime}</FormFeedback>
                </Col>
              </Row>
              <Row className="mt-1">
                <Col md={{ size: 3, offset: 3 }}>
                  <Button type="submit">Thêm</Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
   


