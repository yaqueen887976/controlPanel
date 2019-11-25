import React, {Component} from 'react';
import {Card, Table, Button, Icon, message} from 'antd';
import LinkButton from '../../components/link-button';
import {reqCategorys} from '../../api';

export default class Category extends Component{
  state = {
    loading: false,
    categories: [],
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
        render: () => (
          <span>
            <LinkButton>Modify Category</LinkButton>
            <LinkButton>Sub Category</LinkButton>
          </span>

          )
      },
      
    ];
  }

  getCategories = async() => {
    //before send request, laoding is true 
    this.setState({loading : true});
    const result = await reqCategorys('0');
    this.setState({loading : false});
    if (result.status === 0 ){
      const categories = result.data;
      this.setState({
        categories
      })
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
        const {categories, loading} = this.state;
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
                  dataSource={categories} 
                  columns={this.columns} 
                  loading = {loading}
                  pagination = {{defaultPageSize: 5, showQuickJumper: true}}
                />
            </Card>
        )
    }
}