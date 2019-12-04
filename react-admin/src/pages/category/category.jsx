import React, {Component} from 'react';
import {Card, Table, Button, Icon, message, Modal} from 'antd';
import LinkButton from '../../components/link-button';
import {reqCategorys, reqUpdateCategory, reqAddCategory} from '../../api';
import AddForm from './add-form';
import UpdateForm from './update-form';

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
            <LinkButton onClick = {()=>this.showUpdate(category)}>Modify Category</LinkButton>
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

  getCategories = async(parentId) => {
    //before send request, laoding is true 
    this.setState({loading : true});
    parentId = parentId || this.state.parentId;

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
    this.form.resetFields();
    this.setState({
      showStatus: 0
    })
  }

  showAdd = () =>{
    this.setState({
      showStatus: 1
    })
  }

  addCategory =  () =>{
    console.log('add category');

    this.form.validateFields(async (err, values)=>{
        if(!err){
            //hide modal when hit ok
            this.setState({
                showStatus: 0
            })

            //collect data and submit add request
            //const {parentId, categoryName} = this.form.getFieldsValue();
            const {parentId, categoryName} = values;
            this.form.resetFields();
            const result = await reqAddCategory(categoryName, parentId);

            if(result.status ===0){
                //re show category
                if(parentId === this.state.parentId){
                    this.getCategories();
                }else if(parentId ==='0'){
                    this.getCategories(parentId);
                }
                
            }
        }
    })
    
    
  }

  showUpdate = (category) =>{
    //save category object
    this.category = category;
    //update state
    this.setState({
      showStatus:2
    })
  }

  updateCategory =  () =>{
    console.log('update category'); 

    //validate form,
    this.form.validateFields(async (err, values)=>{
        if(!err){
            //1. close window
            this.setState({
                showStatus: 0
            })

            //prepare data
            const categoryId = this.category._id;
            this.form.resetFields();
            //const categoryName = this.form.getFieldValue('categoryName');
            const {categoryName} = values;

            

            //2. send request to update form
            const result = await reqUpdateCategory({categoryId,categoryName});
            if(result.status ===0){//success
                //3. reshow the updated form
                this.getCategories();
            }
        }
    });
    
    

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
        const category = this.category || {};
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
                  
                >
                  <AddForm 
                    categories ={categories} 
                    parentId = {parentId}
                    setForm = {(form) =>{this.form = form}}
                />
                  
              </Modal>

              <Modal
                title="Modify Category"
                visible={showStatus===2}
                onOk={this.updateCategory}
                onCancel={this.handleCancel}
                
              >
                <UpdateForm 
                    categoryName = {category.name} 
                    setForm = {(form) =>{this.form = form}}
                />
               
              </Modal>
            </Card>
        )
    }
}