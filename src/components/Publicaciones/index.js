import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;

class Publicaciones extends Component {
    async componentDidMount() {
        const {
            usuariosTraerTodos,
            publicacionesTraerPorUsuario,
            match: { params: { key } }
        } = this.props

        if (!this.props.usuariosReducer.users.length) {
            await usuariosTraerTodos()
        }
        if (this.props.usuariosReducer.error) {
            return;
        }
        if (!('publicaciones_key' in this.props.usuariosReducer.users[key])) {
            publicacionesTraerPorUsuario(key);
        }
    }
    ponerUsuario = () => {
        const {
            usuariosReducer,
            match: { params: { key } }
        } = this.props;
        if (usuariosReducer.error) {
            return <Fatal mensaje={usuariosReducer.error} />
        }
        if (!usuariosReducer.users.length || usuariosReducer.cargando) {
            return <Spinner />
        }

        const nombre = usuariosReducer.users[key].name

        return (
            <h1>Publicaciones de { nombre }</h1>
        )
    };

     ponerPublicaiones = () => {
        const {
            usuariosReducer,
            usuariosReducer:{ usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: { key } }
        } = this.props

            console.log(publicaciones)
            console.log(key);
            if (key && publicaciones[key]) {
                return <ul>{publicaciones[key].map(publicacion=><li>{publicacion.title}</li>)}</ul>
            } else {
                return '';
            }
         
    }


    render() {
        console.log(this.props);
        return (
            <div>
                {this.ponerUsuario()}
                {this.ponerPublicaiones()}
            </div>
        );
    }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer,
        publicacionesReducer
    }
};

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
