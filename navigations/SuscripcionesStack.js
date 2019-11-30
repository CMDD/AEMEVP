import {createStackNavigator} from 'react-navigation-stack';

import suscripcionesScreen from '../screens/suscripciones/Index';
import oracionalesScreen from '../screens/suscripciones/Oracionales';
import DiaScreem from '../screens/suscripciones/Dia';
import OracionalScreen from '../screens/suscripciones/Oracional';
import EditorialScreen from '../screens/components/Editorial';

export default SuscripcionesStack = createStackNavigator({
  Suscripciones: {
    screen: suscripcionesScreen,
    navigationOptions: () => ({
      title: 'Suscripciones',
    }),
  },
  MisOracionales: {
    screen: oracionalesScreen,
    navigationOptions: () => ({
      title: 'Mis Suscripciones',
    }),
  },
  Oracional: {
    screen: OracionalScreen,
    navigationOptions: () => ({
      title: 'Oracional',
    }),
  },
  SuscripcionDia: {
    screen: DiaScreem,
    navigationOptions: () => ({
      title: 'Dia',
    }),
  },
  Editorial: {
    screen: EditorialScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Editorial',
    }),
  },
});
