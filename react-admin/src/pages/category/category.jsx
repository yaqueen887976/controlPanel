import React, {Component} from 'react';
import {Card, Table, Button, Icon} from 'antd';
export default class Category extends Component{
    render(){
        //lefthand side
        const title = "Primary Category List";
        //card right side
        const extra = (
            <Button type = 'primary'>
                <Icon type = 'plus'></Icon>
                Add
            </Button>
        )

        const dataSource = [
            {
              key: '1',
              name: 'Mike',
              age: 32,
              address: '10 Downing Street',
            },
            {
              key: '2',
              name: 'John',
              age: 42,
              address: '10 Downing Street',
            },
          ];
          
          const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
          ];
        return(
            <Card title={title} extra={extra}>
                <Table dataSource={dataSource} columns={columns} />
            </Card>
        )
    }
}