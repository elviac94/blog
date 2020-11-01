import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Tabla from './Tabla'
import * as usuariosActions from '../../actions/usuariosActions';

class Usuarios extends Component {

    componentDidMount() {
        if(!this.props.users.length){
            this.props.traerTodos()
        }
    }
    putContent = () => {
        if(this.props.cargando){
            return <Spinner/>
        }
        if(this.props.error){
            return <Fatal mensaje ={this.props.error}/>
        }
        return <Tabla/>
    }


    render() {
        console.log(this.props.cargando);
        console.log(this.props.error);
        return (
            <div>
                <h1>Usuarios</h1>
                {this.putContent()}
            </div>
        );
    }
}

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
}

export default connect(mapStateToProps, usuariosActions)(Usuarios);