import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Select,
    Input
} from 'antd';

const Item = Form.Item;
const Option = Select.Option;

/**
 * Add Form Component
 */
class UpdateForm extends Component{
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    componentWillMount(){
        this.props.setForm(this.props.form);
    }
    render(){
        const {categoryName} = this.props;
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                
                <Item>
                {
                        getFieldDecorator('categoryName',{
                            initialValue: categoryName,
                            rules: [
                                {required: true, message: 'Category Name cannot be empty'}
                            ]
                        })(
                            <Input placeholder="please input category name"/>
                        )
                    }
                    
                </Item>
                
            </Form>
        )
    }
}

export default Form.create()(UpdateForm);