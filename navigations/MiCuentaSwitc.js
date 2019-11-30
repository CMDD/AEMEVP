import {createSwitchNavigator} from 'react-navigation';

import LoginScreem from '../screens/cuenta/Login';
import RegisterScreem from '../screens/cuenta/Register';

export default myAccountSwitc = createSwitchNavigator(
  {
    Login: {
      screen: LoginScreem,
      navigationOptions: ({navigation}) => ({
        title: 'Inicio de sesion',
      }),
    },
    Register: {
      screen: RegisterScreem,
      navigationOptions: ({navigation}) => ({
        title: 'Registro',
      }),
    },
  },
  {
    initialRouteName: 'Login',
  },
);
