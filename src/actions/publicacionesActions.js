import axios from 'axios';
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionesTypes';


export const traerTodos = () => async (dispatch) => {
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch({
            type: TRAER_TODOS,
            payload: respuesta.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Ups, parece que estamos teniendo problemas, intente más tarde.'
        })

    }
}

export const traerPorUsuario = (key) => async(dispatch, getState) => {
    const { users } = getState().usuariosReducer;
    const user_id = users[key].id;
    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);
        dispatch({
            type: TRAER_TODOS,
            payload: respuesta.data
    })
}