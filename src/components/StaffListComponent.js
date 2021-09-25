import React, { Component } from 'react'
import {  Jumbotron ,Modal , Button ,ModalHeader ,ModalBody ,Form,
 FormGroup,FormFeedback, Label ,Input ,Col ,Row , Card ,CardImg ,CardText, Breadcrumb} from 'reactstrap';
import { Link } from "react-router-dom";
import {Control,LocalForm,Errors} from 'react-redux-form'

const required = (val) => val&&val.length;
const maxLength = (len) =>(val) => !(val)|| (val.length <= len);
const minLength = (len) =>(val) => (val)&& (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const requiredVal = (val) => val;
const minVal = (min) => (val) => (val)&& (val >= min);
const maxVal = (max) => (val) =>   (val <= max);
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
      }
    }
    toggleModal = ()=> {
      this.setState({
          isModalOpen: !this.state.isModalOpen
      });
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
    
  }
  //form validation
 
  handleSubmit = (event) =>{ 
   
      const newStaff = {
        id:  this.props.staffs.length,
        name:  this.state.name,
        doB: this.state.dob,
        salaryScale: this.state.salaryscale,
        startDate: this.state.startdate,
        department: { name: this.state.department},
        annualLeave: this.state.annualleave,
        overTime:  this.state.overtime,
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
    
   render(){
   
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
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

              <Row className="mt-2">
                <Label htmlFor="name" md={5}>
                  Tên nhân viên:{" "}
                </Label>
                <Col md={7}>
                  <Control.text model=".name"
                    id="name"
                    name="name"    
                    value={this.state.name} 
                    innerRef ={(value) => this.name =value}
                    onChange={this.handleInputChange}
                    validators ={{
                      required , minLength :minLength(3),maxLength : maxLength(20)
                   }  
                   }
                    /> 
                    <Errors 
                            className="text-danger"
                            model=".name"
                            show ="touched"
                            messages ={{
                                required : "",
                                minLength : "Tên nhân viên nhiều hơn 3 ký tự",
                                maxLength : "Tên nhân viên it hơn 20 ký tự"   
                            } 
                            }
                            />
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="dob" md={5}>
                  Ngày sinh:{" "}
                </Label>
                <Col md={7}>
                  <Control model=".dob"
                   type='date'
                    id="dob"
                    name="dob" 
                    value={this.state.dob}       
                    onChange={this.handleInputChange} 
                    innerRef ={(input) => this.dob = input}        
                    validators ={{
                      required , minLength :minLength(0)
                   }  
                   }
                  />
                 <Errors 
                            className="text-danger"
                            model=".dob"
                            show ="touched"
                            messages ={{
                                required : "yêu cầu nhập ",
                                minLength : "",    
                            } 
                            }
                            />
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="startdate" md={5}>
                  Ngày bắt đầu:{" "}
                </Label>
                <Col md={7}>
                <Control model=".startdate"
                   type='date'
                    id="startdate"
                    name="startdate"    
                    value={this.state.startdate}       
                    onChange={this.handleInputChange}       
                    innerRef ={(input) => this.startdate = input}
                    validators ={{
                      required , minLength :minLength(0)
                    
                   }  
                   }
                  />
                <Errors 
                      className="text-danger"
                      model=".startdate"
                      show ="touched"
                      messages ={{
                          required : "yêu cầu nhập",
                          minLength : "",    
                      } 
                      }
                      />
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="department" md={5}>
                  Phòng ban:{" "}
                </Label>
                <Col md={7}>
                  <Control.select
                    model=".department"
                    id="department"
                    name="department"
                    value={this.state.department} 
                    onChange={this.handleInputChange}
                    innerRef ={(value) => this.department =value}         
                  >
                    <option>Sales</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Control.select>
                  
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="salaryscale" md={5}>
                  Hệ số lương:{" "}
                </Label>
                <Col md={7}>
                  <Control.text
                    model=".salaryscale"
                    id="salaryscale"
                    name="salaryscale" 
                    value={this.state.salaryscale} 
                    onChange={this.handleInputChange}
                    innerRef ={(input) => this.salaryscale = input} 
                    validators ={{
                      requiredVal ,isNumber,
                      minVal : minVal(1),maxVal: maxVal(3)
                   }  
                   }
                  />
               <Errors 
                      className="text-danger"
                      model=".salaryscale"
                      show ="touched"
                      messages ={{
                          requiredVal : " ",                    
                          isNumber : "nhập số ",
                          minVal : " >= 1 : ",
                          maxVal: "  <= 3 "
                      } 
                      }
                      />
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="annualleave" md={5}>
                  Số ngày nghỉ còn lại:{" "}
                </Label>
                <Col md={7}>
                  <Control.text 
                  model = ".annualleave"
                    id="annualleave"
                    name="annualleave"
                    value={this.state.annualleave} 
                    onChange={this.handleInputChange}
                    innerRef ={(input) => this.annualleave = input}
                    validators ={{
                      required,isNumber
                    }}
                  />
                  <Errors 
                      className="text-danger"
                      model=".annualleave"
                      show ="touched"
                      messages ={{
                          required : "",            
                          isNumber : "yêu cầu nhập số"
                      } 
                      }
                      />
                  
                </Col>
              </Row>
              <Row className="mt-1">
                <Label htmlFor="overtime" md={5}>
                  Số ngày làm thêm:{" "}
                </Label>
                <Col md={7}>
                  <Control.text
                  model=".overtime"
                    id="overtime"
                    name="overtime"
                    value={this.state.overtime} 
                    onChange={this.handleInputChange}
                    value={this.state.overtime}                   
                    innerRef ={(input) => this.overtime = input} 
                    validators ={{
                      required,isNumber,              
                    }}
                  />
                <Errors
                  className="text-danger"
                  model = ".overtime"
                  show ="touched"
                  messages ={{
                      required : "Yêu cầu ",            
                      isNumber : "nhập sô"
                  } 
                  }
                
                />
                </Col>
              </Row>
              <Row className="mt-1">
                <Col md={{ size: 3, offset: 3 }}>
                  <Button type="submit">Thêm</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
   


