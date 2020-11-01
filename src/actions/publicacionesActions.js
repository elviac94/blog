import axios from 'axios';
import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionesTypes';

export const traerPorUsuario = (key) => async(dispatch, getState) => {
    const { users } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const user_id = users[key].id;

    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);

    const publicaciones_actualizadas = [
        ...publicaciones,
        respuesta.data
    ];

    
        dispatch({
            type: TRAER_POR_USUARIO,
            payload: publicaciones_actualizadas
    })
}