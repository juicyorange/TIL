import React, { Component } from 'react' ;

class PhoneForm extends Component {
    state = {
        name: '',
        phone: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        // 기존에 submit을 하게 되면 페이지 리로딩이 되는데, 이를 통해 원래 이벤트가 해야하는 작업을
        // 하지 못하게 하여 리로딩을 막는다. 
        e.preventDefault(); 
        // 상태값을 onCreate를 통하여 부모에게 전달
        this.props.onCreate(this.state);
        this.setState({
            name: '',
            phone: ''
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    placeholder="이름"
                    value={this.state.name}
                    onChange={this.handleChange}
                    name="name"
                />
                <input
                    placeholder="전화번호"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    name="phone"
                />
                <div>{this.state.name} {this.state.phone}</div>
                <button type="submit">등록</button>
            </form>
        );
    }
}

export default PhoneForm;