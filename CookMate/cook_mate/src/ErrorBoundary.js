import React from 'react';

class ErrorBoundary extends React.Component{
    constructor(){
        super();
        this.state={
            has_error:false,
            error:null,
            error_info:null
        }
    }
    componentDidCatch = (error,error_info)=>{
        this.setState({has_error:true, error, error_info})
        // console.log(error_info);
    }
    render(){
        if (this.state.has_error){
            return <details><p>Oops...{this.state.error.message}</p></details>
        }
        return this.props.children
    }
}

export default ErrorBoundary