import React from 'react';
import t from 'tcomb-form-native';
import InputTemplate from '../forms/template/Input';

import formValidate from '../utils/validation';

export const RegisterStruct = t.struct({
  name: t.String,
  email: formValidate.email,
  password: formValidate.password,
  passwordConfirmation: formValidate.password,
});

export const RegisterOptiones = {
  fields: {
    name: {
      template: InputTemplate,
      config: {
        placeholder: 'Nombre de usuario',
        iconName: 'account-outline',
        iconType: 'material-community',
      },
    },
    email: {
      template: InputTemplate,
      config: {
        placeholder: 'Ingresar correo',
        iconName: 'at',
        iconType: 'material-community',
      },
    },
    password: {
      template: InputTemplate,
      config: {
        password: true,
        secureTextEntry: true,
        placeholder: 'Ingrese Contraseña',
        iconName: 'lock-outline',
        iconType: 'material-community',
      },
    },
    passwordConfirmation: {
      template: InputTemplate,
      config: {
        placeholder: 'Confirme contraseña',
        password: true,
        secureTextEntry: true,
        iconName: 'lock-outline',
        iconType: 'material-community',
      },
    },
  },
};
