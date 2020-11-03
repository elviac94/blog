import axios from 'axios';
import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionesTypes';
import * as usuariosTypes from '../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async(dispatch, getState) => {
    const { users } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const user_id = users[key].id;
    const publicaciones_actualizadas = { ...publicaciones };
    let respuesta;

    console.log(users);
    console.log(`user_id: ${user_id}`);
    console.log(`key: ${key}`);
    if (!publicaciones_actualizadas[key]){
        respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);
        publicaciones_actualizadas[key] = respuesta.data;
    }

    const publicaciones_key = Object.keys(publicaciones_actualizadas).length -1;
    const usuarios_actualizados =[...users];
    usuarios_actualizados[key] ={
        ...users[key],
        publicaciones_key// esto es igual que poner publicaciones_key:publicaciones_key, se puede poner asi cuando la nomenclatura de la variable es igual a la del atributo
    }

    console.log('lanzar dispatch de usuarios actualizados')

        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuarios_actualizados
        });

    console.log('lanzar dispath publicaciones actualizadas')

        dispatch({
            type: TRAER_POR_USUARIO,
            payload: publicaciones_actualizadas
    })

    console.log('publicaciones actualizadas enviadas')
}