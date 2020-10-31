import React from 'react';
import { connect } from 'react-redux';

const Tabla = (props) => {

   const putRows = () => (
        props.users.map((user) => (
            <tr key={user.id}>
                <td>
                    {user.name}
                </td>
                <td>
                    {user.email}
                </td>
                <td>
                    {user.website}
                </td>
            </tr>
        )

        )
    )
    return (
        <div>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Enlace</th>
                    </tr>
                </thead>
                <tbody>
                    {putRows()}
                </tbody>
            </table>
        </div>
    )
};
const mapStateToProps =(reducers)=>{
    return reducers.usuariosReducer;
}
export default connect(mapStateToProps)(Tabla);