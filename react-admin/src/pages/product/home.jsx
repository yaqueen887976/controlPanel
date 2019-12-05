import React, {Component} from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Icon, 
    Table
} from 'antd';
import LinkButton from '../../components/link-button';
import {reqProducts} from '../../api';
import {PAGE_SIZE} from '../../utils/constants';

const Option = Select.Option;
export default class ProductHome extends Component{
    state ={
        products: [], //products array, initial is empty
        total: 0, //total quantity of a product 
        loading: false
    }
    //initialize table columns
    initColumns =()=>{
        this.columns = [
            {
                title: 'Product Name',
                dataIndex: 'name',
               
              },
              {
                title: 'Product Description',
                dataIndex: 'desc',
              },
              {
                title: 'Price',
                dataIndex: 'price',
                render:(price) => '$' +price
              },
              {
                width: 100,
                title: 'Status',
                dataIndex: 'status',
                render:() =>{
                    return(
                        <span>
                            <Button type='primary'>discontinued</Button>
                            <span>On Sale</span>
                        </span>
                    )
                }
              },
              {
                width: 100,
                title: 'Modify',
                render:(product) =>{
                    return(
                        <span>
                           <LinkButton>Details</LinkButton>
                           <LinkButton>Modify</LinkButton>
                        </span>
                    )
                }
              },
          ];
    }

    getProducts = async (pageNum) =>{
        this.setState({loading: true}); //show loading
        const result = await reqProducts(pageNum,PAGE_SIZE);
        this.setState({loading: false}); //hide loading
        if(result.status ===0){
            const {total,list} = result.data;
            this.setState({
                total,
                products: list
            })
        }
    }

    componentWillMount(){
        this.initColumns();
    }

    componentDidMount(){
        this.getProducts(1);
    }
    render(){
        const {products, total, loading} = this.state;
  
        const title = (
            <span>
                <Select value = '1' style={{width:150}}>
                    <Option value = '1'>Search By Name</Option>
                    <Option value = '2'>Search By Description</Option>
                </Select>
                <Input placeholder="keywords" style={{width:150, margin:'0 15px'}}/>
                <Button type = "primary">Search</Button>
            </span>
        )
        //right side button
        const extra = (
            <Button type = "primary">
                <Icon type ="plus"/>
                Add product
            </Button>
        )
        return(
            <Card title ={title} extra = {extra}>
                <Table 
                    bordered
                    rowKey="_id"
                    loading = {loading}
                    dataSource={products} 
                    columns={this.columns} 
                    pagination ={{
                        total, 
                        defaultPageSize:PAGE_SIZE, 
                        showQuickJumper: true,
                        onChange: (pageNum)=>{this.getProducts(pageNum)}
                    }}
                />
            </Card>
        )
    }
}