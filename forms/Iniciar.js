import React from 'react';
import t from 'tcomb-form-native';
import InputTemplate from './template/Input';
import formValidate from '../utils/validation';

export const LoginStruct = t.struct({
  email: formValidate.email,
  password: formValidate.password,
});

export const LoginOptions = {
  fields: {
    email: {
      template: InputTemplate,
      config: {
        placeholder: 'Ingresa tu Correo',
      },
    },
    password: {
      template: InputTemplate,
      config: {
        placeholder: 'Ingresa tu contraseña',
        password: true,
        secureTextEntry: true,
      },
    },
  },
};

// export const IniciarOptions = {
//   fields: {
//     email: {
//       template: InputTemplate,
//       config: {
//         placeholder: "Ingrese Usuario",
//         iconType: "material-community",
//         iconName: "at"
//       }
//     },
//     password: {
//       template: InputTemplate,
//       config: {
//         placeholder: "Ingrese Contraseña",
//         password: true,
//         secureTextEntry: true,
//         iconType: "material-community",
//         iconName: "lock-outline"
//       }
//     }
//   }
// };
