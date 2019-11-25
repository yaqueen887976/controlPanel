import React, {Component} from 'react';
import {Card, Table, Button, Icon, message} from 'antd';
import LinkButton from '../../components/link-button';
import {reqCategorys} from '../../api';

export default class Category extends Component{
  state = {
    loading: false,
    categories: [],
    subCategories: [],
    parentId: '0', 
    parentName: '',
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
            <LinkButton>Modify Category</LinkButton>
            <LinkButton onClick = {() => this.showSubCategories(category)}>Sub Category</LinkButton>
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

  componentWillMount () { //prepare data for render
    this.initColumns();
  }

  //send request, get async ajax request
  componentDidMount (){
    this.getCategories();
  }

  render(){
        const {categories, subCategories, parentId,parentName, loading} = this.state;
        //lefthand side
        const title = "Primary Category List";
        //card right side
        const extra = (
            <Button type = 'primary'>
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
            </Card>
        )
    }
}