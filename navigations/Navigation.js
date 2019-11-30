import React from 'react';
import {Icon} from 'react-native-elements';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import OracionalesScreenStack from './OracionalesStack';
import SuscripcionesStack from './SuscripcionesStack';
import myAccountSwitc from './MiCuentaSwitc';

const NavigationStack = createBottomTabNavigator({
  Oracionales: {
    screen: OracionalesScreenStack,
    navigationOptions: () => ({
      tabBarLabel: 'Oracionales',
      tabBarIcon: ({tintColor}) => (
        <Icon
          type="material-community"
          name="home"
          size={30}
          size={22}
          color={tintColor}
        />
      ),
    }),
  },
  Suscripciones: {
    screen: SuscripcionesStack,
    navigationOptions: () => ({
      tabBarLabel: 'Mi Suscripcion',
      tabBarIcon: ({tintColor}) => (
        <Icon
          type="material-community"
          name="library-shelves"
          size={30}
          size={22}
          color={tintColor}
        />
      ),
    }),
  },
  MiCuenta: {
    screen: myAccountSwitc,
    navigationOptions: () => ({
      tabBarLabel: 'Mi cuenta',
      tabBarIcon: ({tintColor}) => (
        <Icon
          type="material-community"
          name="home"
          size={30}
          size={22}
          color={tintColor}
        />
      ),
    }),
  },
});

export default createAppContainer(NavigationStack);
