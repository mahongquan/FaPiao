import React, { Component } from 'react';
import {Modal} from "react-bootstrap";
import update from 'immutability-helper';
import Client from './Client';
import Autosuggest from 'react-autosuggest';
var moment = require('moment');
// eslint-disable-next-line 
var locale=require('moment/locale/zh-cn');
var DateTime=require('react-datetime');
class ContactEdit2New  extends Component{
  state={ 
      showModal: false,
      contact:{
        kaipiao_date:moment(),
          },
      hiddenPacks:true,
      bg:{},
      date_open:false,
  }

  close=()=>{
  	console.log("close");
    this.setState({ showModal: false });
  }
 open2=(idx)=>{
    this.setState({ showModal: true });
    this.setState({bg:{}});
    this.parent=this.props.parent;
    this.index=idx;
    if (this.index==null){
      this.old={
        zzshui:false,
        kaipiao_date:moment().format("YYYY-MM-DD"),
        name:"",
        danwei:"",
        xianmujiancheng:"",
        xianmu:"",
        duifangdanwei:"",
        bh:"",
        nashuiren_code:"",
        money:0,
        shui:0,
        state:""
      };
      this.setState({hiddenPacks:true});
    }
    else{
      this.old=this.parent.state.contacts[this.index];
      this.setState({hiddenPacks:false});
    }
    this.setState({contact:this.old});
  }
  // handleClear (data) {
  //   console.log("clear");
  //   var contact2={id:"",hetongbh:"",name:"",addr:""};
  //   console.log(contact2);
  //   this.setState({contact:contact2});
  // },
  handleCopy=(data)=> {
     console.log("copy");
     this.index=null;
     var contact2=update(this.state.contact,{id:{$set:""}});
     console.log(contact2);
     this.setState({contact:contact2});
     this.setState({hiddenPacks:true});
  }
  handleSave=(data)=>{
    var url="/rest/Contact";
    Client.postOrPut(url,this.state.contact,(res) => {
      if(res.success){
        console.log("===result=====")
        console.log(this.state.contact)
        console.log(res.data)
        this.setState({contact:res.data});
        //console.log("after save======================")
        //console.log(this.index);
        this.parent.handleContactChange(this.index,res.data);
        if(this.index){
          //console.log("true");

        }else{
          //console.log("false");
          this.index=0;
        }
        console.log(this.index)
        this.old=res.data;
        this.setState({bg:{}});
        this.setState({hiddenPacks:false});
      }
      else{
        alert(res.message);
      }
    });
  }
  tiaoshi_date_change=(value)=>{
    //this.state.yujifahuo_date=value;
    var e_target_name="tiaoshi_date";
    console.log(this.old[e_target_name]);
    var t=null;
    if (typeof value==="string")
    {
      t=value;
    }
    else{
      t=value.format("YYYY-MM-DD");
    }
    console.log(t);
    if(this.old[e_target_name]===t)
    {
      const bg2=update(this.state.bg,{[e_target_name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
      //console.log("not equal")
      //this.state.bg[e_target_name]="#8888ff"; 
      const bg2=update(this.state.bg,{[e_target_name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    const contact2=update(this.state.contact,{[e_target_name]: {$set:t}});
    console.log(contact2);
    this.setState({contact:contact2});
  }

  kaipiao_date_change=(value)=>{
    //this.state.yujifahuo_date=value;
    var e_target_name="kaipiao_date";
    console.log(this.old[e_target_name]);
    var t=null;
    if (typeof value==="string")
    {
      t=value;
    }
    else{
      t=value.format("YYYY-MM-DD");
    }
    console.log(t);
    if(this.old[e_target_name]===t)
    {
      const bg2=update(this.state.bg,{[e_target_name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
     const bg2=update(this.state.bg,{[e_target_name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    const contact2=update(this.state.contact,{[e_target_name]: {$set:t}});
    console.log(contact2);
    this.setState({contact:contact2});
  }
  danwei_change=(event, { newValue })=>{
    this.change1(newValue);
  }
  channels_change_fetch=()=>{}
  danwei_select=(event,data)=>{
    this.change1(data.suggestion);
  }
  change1=(item)=>{
      console.log("selected");
      console.log(item);
      if(this.old.danwei===item)
      {
       const bg2=update(this.state.bg,{danwei:{$set:"#ffffff"}})
        this.setState({bg:bg2});
      }
      else{
        const bg2=update(this.state.bg,{danwei:{$set:"#8888ff"}})
        this.setState({bg:bg2});
      }
      const contact2=update(this.state.contact,{danwei: {$set:item}});
      console.log(contact2);
      this.setState({contact:contact2});
  }
  yiqixinghao_change=(event, { newValue })=>{
    this.change2(newValue);
  }
  yiqixinghao_select=(event,data)=>{
    this.change2(data.suggestion);
  }
  change2=(item)=>{
      console.log("selected");
      console.log(item);
      if(this.old.xianmujiancheng===item)
      {
       const bg2=update(this.state.bg,{xianmujiancheng:{$set:"#ffffff"}})
        this.setState({bg:bg2});
      }
      else{
        const bg2=update(this.state.bg,{xianmujiancheng:{$set:"#8888ff"}})
        this.setState({bg:bg2});
      }
      const contact2=update(this.state.contact,{xianmujiancheng: {$set:item}});
      console.log(contact2);
      this.setState({contact:contact2});
  }
  handleChange=(e)=>{
    console.log("change");
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.name);
    if(this.old[e.target.name]===e.target.value)
    {
     const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    const contact2=update(this.state.contact,{[e.target.name]: {$set:e.target.value}});
    console.log(contact2);
    this.setState({contact:contact2});
  }
  matchStateToTerm=(state, value)=>{
     return      state.toLowerCase().indexOf(value.toLowerCase()) !== -1 ;
  }
  zzshuiChange=(e)=>{
    var quehuo=this.state.contact.zzshui;
    quehuo=!quehuo;
    if(this.old.quehuo===quehuo)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      this.setState({bg:bg2}); 
    }
    const contact2=update(this.state.contact,{zzshui: {$set:quehuo}});
    console.log(contact2);
    this.setState({contact:contact2});
  }
  render=()=>{
    // var o=[
    //                     "1O(低氧)",
    //                     "1O(高氧)",
    //                     "1O(低氧)+2N",
    //                     "1C(低碳)+2S",
    //                     "1C(高碳)+2S",
    //                     "2C+1S(低硫)",
    //                     "2C+1S(高硫)",
    //                     "2C+2S",
    //                     "2O+2N",
    //                     "2O",
    //                   ];
    // var options_channels=[];
    // for(var i in o){
    //   options_channels.push({label:o[i],value:o[i]});
    // }
    return (
        <Modal show={this.state.showModal} 
        onHide={this.close}  
                dialogClassName="modal-90w">
          <Modal.Header closeButton>
            <Modal.Title>编辑发票信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="table_input" className="table-condensed" >
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" disabled="disabled"    value={this.state.contact.id} />
                </td>
                <td>
                    <label>增值税发票:</label>
                </td>
                <td>
                <input type="checkbox"  name="zzshui" checked={this.state.contact.zzshui}  onChange={this.zzshuiChange} />
                </td>
                
            </tr><tr>
            <td>
                    <label>姓名:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.name}} type="text" id="baoxiang" name="name" value={this.state.contact.name}  onChange={this.handleChange} />
                </td>
                
                <td>
                    单位:
                </td>
                <td><Autosuggest
                      inputProps={
                        { 
                          id: 'danwei-autocomplete',
                          style:{backgroundColor:this.state.bg.danwei},
                          value:this.state.contact.danwei,
                          onChange:this.danwei_change
                        }
                      }
                      suggestions={[
                        "1O(低氧)",
                        "1O(高氧)",
                        "1O(低氧)+2N",
                        "1C(低碳)+2S",
                        "1C(高碳)+2S",
                        "2C+1S(低硫)",
                        "2C+1S(高硫)",
                        "2C+2S",
                        "2O+2N",
                        "2O",
                      ]}
                      getSuggestionValue={(item) => item}
                      onSuggestionSelected={this.danwei_select}
                      onSuggestionsFetchRequested={()=>{}}
                      onSuggestionsClearRequested={()=>{}}
                      renderSuggestion={(item) => (
                        <span>{item}</span>
                      )}
                    />
                </td>
            </tr><tr>
                <td>
                    <label>项目简称:</label>
                </td>
                <td>
                    <Autosuggest
                       inputProps={
                        { 
                          id: 'xianmujiancheng-autocomplete',
                          style:{backgroundColor:this.state.bg.xianmujiancheng},
                          value:this.state.contact.xianmujiancheng,
                          onChange:this.yiqixinghao_change
                        }
                      }
                      suggestions={[
                        "CS-1011C",
                        "CS-2800",
                        "CS-3000",
                        "CS-3000G",
                        "HD-5",
                        "N-3000",
                        "O-3000",
                        "OH-3000",
                        "ON-3000",
                        "ON-4000",
                        "ONH-3000"
                      ]}
                      getSuggestionValue={(item) => item}
                      onSuggestionsFetchRequested={()=>{}}
                      onSuggestionsClearRequested={()=>{}}
                      onSuggestionSelected={this.yiqixinghao_select}
                      renderSuggestion={(item) => (
                        <span>{item}</span>
                      )}
                    />
                </td>
                <td>
                    <label>项目名称:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.xianmu}}  type="text" id="danwei" name="xianmu" value={this.state.contact.xianmu} onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    对方单位:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.duifangdanwei}}  type="text" id="duifangdanwei" name="duifangdanwei" value={this.state.contact.duifangdanwei} onChange={this.handleChange} />
                </td>
                <td>纳税人识别号:</td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.nashuiren_code}} type="text" id="shenhe" name="nashuiren_code" value={this.state.contact.nashuiren_code}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>日期:</label>
                </td>
                <td>
                    <DateTime  ref="datetime1" timeFormat={false} 
                    inputProps={
                      {"style":
                        {"backgroundColor":this.state.bg.kaipiao_date}
                      }
                    } 
                    id="yujifahuo_date" name="kaipiao_date"  
                    value={this.state.contact.kaipiao_date} 
                    onChange={this.kaipiao_date_change} 
                    />
                </td>
                <td>含税金额:</td>
                <td>
                <input style={{"backgroundColor":this.state.bg.money}} type="text" id="shenhe" name="money" value={this.state.contact.money}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>发票号:</label>
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.bh}}  type="text" id="hetongbh" name="bh" value={this.state.contact.bh}  onChange={this.handleChange} />
                </td>
                <td>
                    税额:
                </td>
                <td>
                <input style={{"backgroundColor":this.state.bg.shui}} type="text" id="shenhe" name="shui" value={this.state.contact.shui}  onChange={this.handleChange} />
                </td>
            </tr>        
            </tbody>
            </table>
       <div> 
       <button className="btn btn-primary" id="bt_save" onClick={this.handleSave} >保存</button> 
       <button className="btn" style={{margin:"20px 20px 20px 20px"}} id="bt_clearid" onClick={this.handleCopy}>复制</button>
       </div>
      {
      //  <div id="id_usepacks" hidden={this.state.hiddenPacks}>
      //    <UsePacks2  contact_hetongbh={this.state.contact.hetongbh} contact_id={this.state.contact.id}/>
      //  </div>
      }
                </Modal.Body>
        </Modal>
    );
  }
};
export default ContactEdit2New;