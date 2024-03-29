import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button,Navbar,DropdownButton,Dropdown} from "react-bootstrap";
import update from 'immutability-helper';
import Client from './Client';
import ContactEdit2New from './ContactEdit2New';
import DlgLogin from './DlgLogin';
// import DlgWait from './DlgWait';
// import DlgFolder from './DlgFolder';
// //import DlgFolder2 from './DlgFolder2';
// import DlgStat from './DlgStat';
// import DlgImport from './DlgImport';
// import DlgCheck from './DlgCheck'
// import DlgUrl from './DlgUrl';
// import DlgCopyPack from './DlgCopyPack';
// import DlgItems from './DlgItems';
// import DlgPacks from './DlgPacks';
import "./autosuggest.css"
var host="";
class App extends Component {
  componentDidMount=() => {
    this.load_data();
  }
  constructor(){
    super()
    this.state = {
      connect_error:false,
      contacts: [],
      limit:10,
      user: "AnonymousUser",
      start:0,
      total:0,
      search:"",
      start_input:1,
      currentIndex:null,
      baoxiang:"",
    };
    this.dlglogin=React.createRef();
  }
  load_data=()=>{
    Client.contacts(
      { start:this.state.start,
        limit:this.state.limit,
        search:this.state.search,
        baoxiang:this.state.baoxiang,
      }, 
      (contacts) => {
        var user=contacts.user;
        if(user===undefined){
          user="AnonymousUser"
        }
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
          limit:this.state.limit,
          user: user,
          total:contacts.total,
          start:this.state.start
        });
    },
      error => {
        // console.log(typeof(error));
        console.log(error);
        if (error instanceof SyntaxError) {
          this.openDlgLogin();
        } else {
          this.setState({ connect_error: true });
        }
    });
  };
  openDlgLogin = () => {
    this.dlglogin.current.open();
  };
    keypress = e => {
    if (e.which !== 13) return;
    // console.log('你按了回车键...');

    this.search();
  };

  handleContactChange = (idx,contact) => {
    console.log(idx);
    let contacts2
    if (idx!=null){
      contacts2=update(this.state.contacts,{[idx]: {$set:contact}});
      console.log(contacts2);
    }
    else{
      contacts2=update(this.state.contacts,{$unshift: [contact]});
    }
    this.setState({contacts:contacts2});
  };
  handleUserChange = (user) => {
    if (user === "AnonymousUser") {
      this.setState({
        logined: false
      });
    } else {
      this.setState({
        logined: true
      });
    }
    this.setState({
      user: user,
      contacts: [], //slice(0, MATCHING_ITEM_LIMIT),
    });
    this.load_data();
  };
  handleLogout = () => {
    console.log("logout");
    Client.logout((data) => {
      console.log("logout" + data);
      this.setState({
        logined: false,
        user: "AnonymousUser",
        total:0,
        start:0,
      });
      this.handleUserChange(this.state.user);
    });
  };
  handleSearchChange = (e) => {
    this.setState({search:e.target.value});
  };
  handlePrev = (e) => {
    this.state.start=this.state.start-this.state.limit;
    if(this.state.start<0) {this.state.start=0;}
    this.load_data();
  };
  search = (e) => {
    this.state.start=0;
    this.load_data();
  };
  jump=()=>{
    this.state.start=parseInt(this.state.start_input,10)-1;
    if(this.state.start>this.state.total-this.state.limit) 
        this.state.start=this.state.total-this.state.limit;//total >limit
    if(this.state.start<0)
    {
      this.state.start=0;
    }
    this.load_data();
  };
  handlePageChange= (e) => {
    this.setState({start_input:e.target.value});
  };

  onDetailClick=(contactid)=>{
    console.log(contactid);
    window.open(host+"/parts/showcontact/?id="+contactid, "detail", 'height=800,width=800,resizable=yes,scrollbars=yes');
  }
  handleNext = (e) => {
    this.state.start=this.state.start+this.state.limit;
    if(this.state.start>this.state.total-this.state.limit) 
        this.state.start=this.state.total-this.state.limit;//total >limit
    if(this.state.start<0)
    {
      this.state.start=0;
    }
    this.load_data();
  };
  onSelectBaoxiang=(e) => {
    this.state.start=0;
    this.state.baoxiang=e;
    this.load_data();
  }
  auto_change=(event, value)=>{
    console.log("auto_change");
    if (value.length>1)
    {
      this.setState({ auto_value:value, auto_loading: true });
      Client.get("/rest/Pack",{search:value} ,(items) => {
          this.setState({ auto_items: items.data, auto_loading: false })
      });
    }
    else{
      this.setState({ auto_value:value, auto_loading: false });
    };
  }
  onLoginSubmit= (data) => {
    console.log(data);
    Client.login(data.username, data.password, (res) => {
      if (res.success) {
        this.setState({
          logined: true,
        });
        this.setState({
          user: data.username
        });
        this.handleUserChange(this.state.user);
      }
    });
  };
  handleEdit=(idx)=>{
    //this.setState({currentIndex:idx});
    this.refs.contactedit.open2(idx);
  }
  //<button onClick={()=>this.opendlgurl("/rest/updateMethod",this,idx,contact.id)}>更新方法</button>
  //<button onClick={()=>this.opendlgwait(contact.id)}>全部文件</button>
  opendlgwait=(contactid)=>{
    this.refs.dlgwait.open(contactid); 
  }
  handleContactChange2= (contact) => {
    var idx=this.currentIndex;
    console.log(idx);
    let contacts2
    if (idx!=null){
      contacts2=update(this.state.contacts,{[idx]: {$set:contact}});
      console.log(contacts2);
    }
    else{
      contacts2=update(this.state.contacts,{$unshift: [contact]});
    }
    this.setState({contacts:contacts2});
  };
  opendlgurl=(url,parent,idx,data)=>{
    this.currentIndex=idx;
    this.refs.dlgurl.open(url,data,this.handleContactChange2); 
  }
  openDlgItems=()=>{
    this.refs.dlgitems.open();
  }
  opendlgfolder=(contactid)=>{
   this.refs.dlgfolder.open(contactid); 
  }
  opendlgcheck=(contactid,yiqibh)=>{
   this.refs.dlgcheck.open(contactid,yiqibh); 
  }
  openDlgPacks=()=>{
    this.refs.dlgpacks.open();
  }
  openDlgCopyPack=()=>{
    this.refs.dlgcopypack.open();
  }
  openDlgStat=()=>{
    this.refs.dlgstat.open();
  }
  openDlgImport=()=>{
    this.refs.dlgimport.open();
  }
  render() {
    //console.log("render=========================");
    const contactRows = this.state.contacts.map((contact, idx) => (
      <tr key={idx} >
        <td>{contact.id}</td>
        <td>
          {contact.kaipiao_date}
        </td>
        <td>{contact.danwei}</td>
        <td>{contact.name}</td>
        <td>
          <Button variant="light" onClick={()=>this.handleEdit(idx)}>{contact.bh}</Button>
          <DropdownButton title="">
            <Dropdown.Item onSelect={()=>this.opendlgurl("/rest/updateMethod",this,idx,{id:contact.id})}>更新方法</Dropdown.Item>
            <Dropdown.Item onSelect={()=>this.opendlgwait(contact.id)}>全部文件</Dropdown.Item>
            <Dropdown.Item onSelect={()=>this.opendlgcheck(contact.id,contact.yiqibh)}>核对备料计划</Dropdown.Item>
            <Dropdown.Item onSelect={()=>this.opendlgfolder(contact.id)}>资料文件夹</Dropdown.Item>
            <Dropdown.Item onSelect={() => this.onDetailClick(contact.id)}>详细</Dropdown.Item>
          </DropdownButton>
        </td>
        <td>{contact.duifangdanwei}</td>
        <td>{contact.xianmu}</td>
        <td>{contact.xianmujiancheng}</td>
        <td>{contact.nashuiren_code}</td>
        <td>{contact.money}</td>
        <td>{contact.shui}</td>
        <td>{contact.state}</td>
        <td><input type="checkbox" disabled="disabled" name="quehuo" checked={contact.zzshui} />
        </td>
       </tr>
    ));
    var hasprev=true;
    var hasnext=true;
    let prev;
    let next;
    //console.log(this.state);
    //console.log(this.state);
    if(this.state.start===0){
      hasprev=false;
    }
    //console.log(this.state.start+this.state.limit>=this.state.total);
    if(this.state.start+this.state.limit>=this.state.total){

      hasnext=false;
    }
    if (hasprev){
      prev=(<Button onClick={this.handlePrev}>前一页</Button>);
    }
    else{
      prev=null;
    }
    if(hasnext){
      next=(<Button onClick={this.handleNext}>后一页</Button>);
    }
    else{
      next=null;
    }
    return (
    <div id="todoapp" className="table-responsive">
    <div
          align="center"
          style={{
            display: this.state.connect_error ? '' : 'none',
            textAlign: 'center',
            color: 'red',
          }}
        >
          !!!!!!!!!!连接错误,服务器未运行!!!!!!!
        </div>
    <DlgLogin ref={this.dlglogin} onLoginSubmit={this.onLoginSubmit} />
    {
    // <DlgItems ref="dlgitems" />
    // <DlgPacks ref="dlgpacks" />
    // <DlgCopyPack ref="dlgcopypack" />
    // <DlgStat ref="dlgstat" />
    // <DlgImport ref="dlgimport" />
    // <DlgCheck ref="dlgcheck" />
    // <DlgFolder ref="dlgfolder" />
    // <DlgWait ref="dlgwait" />
    // <DlgUrl ref="dlgurl" />
   }
    <ContactEdit2New ref="contactedit" parent={this}   index={this.state.currentIndex} title="编辑"  />
    <Navbar collapseOnSelect expand="lg" className="navbar-dark bg-dark">
      <Navbar.Brand>
            <span>发票明细</span>
          </Navbar.Brand>
  </Navbar>
    <table>
    <tbody>
    <tr>
   <td>
     <DropdownButton
            variant="light"
            title={this.state.user}
            id="id_dropdown1"
          >
            <Dropdown.Item
              style={{
                display: this.state.user !== 'AnonymousUser' ? 'none' : 'block',
              }}
              onSelect={this.openDlgLogin}
            >
              登录
            </Dropdown.Item>
            <Dropdown.Item
              style={{
                display: this.state.user === 'AnonymousUser' ? 'none' : 'block',
              }}
              onSelect={this.handleLogout}
            >
              注销
            </Dropdown.Item>
          </DropdownButton>
  </td>
  <td>
        <input type="text" onKeyPress={this.keypress} value={this.state.search}  placeholder="姓名 or 发票号 or 单位" onChange={this.handleSearchChange} />
        <button id="id_bt_search" className="btm btn-info" onClick={this.search}>搜索
        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
        </button>
  </td>
  <td>
       <button className="btn btn-primary" onClick={()=>this.handleEdit(null)}>新发票</button>
  </td>
  { 
  //   <td>
  //  <button className="btn btn-info" onClick={this.openDlgImport}>导入标样</button>
  // </td>
  //  <td>
  //  <label>过滤</label>
  //   <DropdownButton title={this.state.baoxiang} id="id_dropdown2">
  //     <Dropdown.Item onSelect={() => this.onSelectBaoxiang("马红权")}>马红权</Dropdown.Item>
  //     <Dropdown.Item onSelect={() => this.onSelectBaoxiang("陈旺")}>陈旺</Dropdown.Item>
  //     <Dropdown.Item onSelect={() => this.onSelectBaoxiang("吴振宁")}>吴振宁</Dropdown.Item>
  //     <Dropdown.Item onSelect={() => this.onSelectBaoxiang("")}>*</Dropdown.Item>
  //   </DropdownButton>
  // </td>
  }
  </tr>
  </tbody>
 </table>
<table className="table-bordered"><thead><tr>
        <th>ID</th>
        <th>日期</th>
        <th>单位</th>
        <th>姓名</th><th>发票号</th>
        <th>对方单位</th>
        <th>项目名称</th>
        <th>项目简称</th>
        <th>纳税人识别号</th>
        
        <th>含税金额</th>
        <th>税额</th>
        <th>入账情况</th>
        <th>增值税发票</th>
</tr></thead><tbody id="contact-list">{contactRows}</tbody>
</table>
{prev}<label id="page">{this.state.start+1}../{this.state.total}</label>{next}
<input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
<button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
  </div>
    );
  }
}
export default App;
// duifangdanwei = models.CharField(max_length=30,verbose_name="对方单位",null=True,blank=True)#对方单位
//     danwei = models.CharField(max_length=30,verbose_name="用户单位",null=True,blank=True)#用户单位
//     xianmu=models.CharField(max_length=30,verbose_name="项目名称",null=True,blank=True)#项目名称
//     xianmujiancheng=models.CharField(unique=True,max_length=30,verbose_name="项目简称",null=True,blank=True)#项目简称
//     name =  models.CharField(max_length=30,verbose_name="姓名",null=True,blank=True)#姓名
//     nashuiren_code =  models.CharField(max_length=30,verbose_name="纳税人识别号")#纳税人识别号
//     kaipiao_date = models.DateField(null=True,blank=True,verbose_name="时间",default=datetime.datetime.now)#时间
//     bh=models.CharField(max_length=30,verbose_name="发票号")#发票号
//     money=  models.FloatField(default=0.0,verbose_name="含税金额")#含税金额
//     shui=  models.FloatField(default=0.0,verbose_name="税额")#税额
//     state =  models.CharField(max_length=30,verbose_name="发票入账情况",null=True,blank=True)#发票入账情况