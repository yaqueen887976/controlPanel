import React, {Component} from 'react';
import {Card, Table, Button, Icon, message, Modal} from 'antd';
import LinkButton from '../../components/link-button';
import {reqCategorys} from '../../api';

export default class Category extends Component{
  state = {
    loading: false,
    categories: [],
    subCategories: [],
    parentId: '0', 
    parentName: '',
    showStatus: 0 //check whether add/update dialog show or not, 0 means invisible  1: add 2: update
  }

  initColumns = () =>{
    this.columns = [
      {
        title: 'Category Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Modify',
        width:300,
        render: (category) => (
          <span>
            <LinkButton onClick = {this.showUpdate}>Modify Category</LinkButton>
            {this.state.parentId === '0'?<LinkButton onClick = {() => this.showSubCategories(category)}>Sub Category</LinkButton>:null}
            
          </span>

          )
      },
      
    ];
  }

  showSubCategories = (category) =>{
    //update state first
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, ()=>{ //execute after update state and re-render
      //get sub categories
      this.getCategories()
    })
    
  }

  showCategories = () =>{
    
    this.setState({
      parentId: '0',
      parentName: '',
      subCategories :[]
    })
  }

  getCategories = async() => {
    //before send request, laoding is true 
    this.setState({loading : true});
    const {parentId} = this.state;

    const result = await reqCategorys(parentId);
    this.setState({loading : false});
    if (result.status === 0 ){
      const categories = result.data;
      if(parentId === '0'){ //if it's parentId is 0, then it is primary category
        this.setState({
          categories: categories
        })
      }else{
        this.setState({
          subCategories : categories
        })
      }
    }else{
      message.error("Cannot Get Categories");
    }
  }

  //when click candle, hide dialog box
  handleCancel = () =>{
    this.setState({
      showStatus: 0
    })
  }

  showAdd = () =>{
    this.setState({
      showStatus: 1
    })
  }

  addCategory = () =>{
    console.log('add category');
  }

  showUpdate = () =>{
    this.setState({
      showStatus:2
    })
  }
  updateCategory = () =>{
    console.log('update category');
  }

  componentWillMount () { //prepare data for render
    this.initColumns();
  }

  //send request, get async ajax request
  componentDidMount (){
    this.getCategories();
  }

  render(){
        const {categories, subCategories, parentId,parentName, loading, showStatus} = this.state;
        //lefthand side
        const title = parentId === '0'? "Primary Category List":(
          <span>
            <LinkButton onClick = {this.showCategories}>Primary Category List</LinkButton>
            <Icon type="arrow-right" style={{marginRight:5}}/>
        <span>{parentName}</span>
          </span>
        );
        //card right side
        const extra = (
            <Button type = 'primary' onClick = {this.showAdd}>
                <Icon type = 'plus'></Icon>
                Add
            </Button>
        )

       
          
        return(
            <Card title={title} extra={extra}>
                <Table 
                  bordered
                  rowKey="_id"
                  dataSource={parentId === '0'? categories : subCategories} 
                  columns={this.columns} 
                  loading = {loading}
                  pagination = {{defaultPageSize: 5, showQuickJumper: true}}
                />

              <Modal
                  title="Add Category"
                  visible={showStatus===1}
                  onOk={this.addCategory}
                  onCancel={this.handleCancel}
                  okButtonProps={{ disabled: true }}
                  cancelButtonProps={{ disabled: true }}
                >
                  <p>Add Category</p>
                  
              </Modal>

              <Modal
                title="Modify Category"
                visible={showStatus===2}
                onOk={this.updateCategory}
                onCancel={this.handleCancel}
                okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
              >
                <p>Update Category</p>
               
              </Modal>
            </Card>
        )
    }
}