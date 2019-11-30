import {createStackNavigator} from 'react-navigation-stack';
import OracionalesScreen from '../screens/oracionales/Index';
import DetailScreen from '../screens/oracionales/Detail';
import DetailDiaScreen from '../screens/oracionales/Dia';
import EditorialScreen from '../screens/components/Editorial';

export default OracionalesScreenStack = createStackNavigator({
  Oracionales: {
    screen: OracionalesScreen,
    navigationOptions: () => ({
      title: 'Oracionales',
    }),
  },
  Detalle: {
    screen: DetailScreen,
    navigationOptions: () => ({
      title: 'Detalle',
    }),
  },
  Dia: {
    screen: DetailDiaScreen,
    navigationOptions: () => ({
      title: 'Dia',
    }),
  },
  EditorialDemo: {
    screen: EditorialScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Editorial',
    }),
  },
});
