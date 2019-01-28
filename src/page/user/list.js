import React from 'react';
import { Table, Modal, Button, Form, Input, DatePicker, Divider } from 'antd';
import * as dataService from '../../service/user';
import request from '../../util/request';

const FormItem = Form.Item;

class List extends React.Component {
  state = {
    visible: false, 
    id: null,
    list: [],
    isLoading: false
  };

  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    }, 
    {
      title: '出生日期',
      dataIndex: 'birthDay',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render:(text,record)=> {
        return (
          <>
          <a >修改</a>
          <Divider type="vertical"/>
          <a onClick={()=>this.onAction("remove",record)}>删除</a>
          </>
        );
      },
    }, 
  ];

  componentDidMount() {
    this.queryUsers();
  }

  onAction = (type,record)=>{
    console.log(record);
     switch(type){
       case "remove":
        this.onRemove(record.id);
        break; 
     }
  } 

  onRemove = (id)=>{
    if(!id || id=="")
      return;

    dataService.removeUser(id).then(response=>{
      console.log(response);
      this.queryUsers(); 
   })
  }

  onSave = (data)=>{
    dataService.saveUser(data).then(response=>{
      console.log(response);
      this.queryUsers(); 
   })
  }

  queryUsers = ()=>{
    this.setState({ isLoading: true });
    dataService.getUsers().then((response)=>{ 
      this.setState({ isLoading: false });
      if(response && response instanceof Array){
        this.setState({
          list: response
        });
      }
     
    })
  }

  showModal = () => {
    this.setState({ visible: true });
  }; 

  handleOk = () => {
    const {  form: { validateFields } } = this.props;
    this.setState({ visible: false });
    validateFields((err, data) => {
      if (!err) { 
        this.onSave(data); 
      }
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  } 

  render() {
    const { visible,list,isLoading } = this.state;
    const { getFieldDecorator } = this.props.form; 

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>添加</Button> 
        <Table columns={this.columns} dataSource={list} loading={isLoading} rowKey="id" /> 
        
        <Modal
          title="新建记录"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
          <FormItem>
              {getFieldDecorator('id')(
                <Input type="hidden"/>
              )}
            </FormItem>
            <FormItem label="姓名">
              {getFieldDecorator('name', {
                rules: [{ required: true }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="年龄">
              {getFieldDecorator('age')(
                <Input />
              )}
            </FormItem>
            <FormItem label="出生日期">
              {getFieldDecorator('birthDay')(
                <DatePicker />
              )}
            </FormItem> 
            <FormItem label="地址">
              {getFieldDecorator('address')(
                <Input />
              )}
            </FormItem> 
          </Form>
        </Modal> 
      </div>
    );
  }
}

 

export default Form.create()(List);