import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
  Button,
} from 'react-native';
import {Image} from 'react-native-elements';
import Nosuscripciones from './components/NoScripciones';
import {NavigationEvents} from 'react-navigation';

export default class TopFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        adultos: true,
        jovenes: true,
        kids: false,
        puerta: false,
      },
      login: '',
      user_id: '',
      suscripciones: [],
      isLoading: true,
    };
    this.getLogin();
  }
  componentDidMount() {
    this.props.navigation.setParams({
      tapOnTabNavigator: this.tapOnTabNavigator,
    });
  }

  // Call on tab bar tap
  tapOnTabNavigator = () => {
    this.getLogin();
  };
  getLogin = async () => {
    console.log('ejecutando');

    const result = await AsyncStorage.getItem('login');
    const user_id = await AsyncStorage.getItem('user_id');
    this.setState({
      login: result,
      user_id,
    });
    this.getOracionales();
    if (this.state.login == 'false') {
      this.props.navigation.navigate('Login');
    }
  };

  getOracionales = async () => {
    await fetch(
      'http://admin.app.elman.minutodedios.fm/api/suscripciones/' +
        this.state.user_id,
    ).then(res =>
      res.json().then(res => {
        this.setState({
          suscripciones: res,
        });
      }),
    );
  };
  renderRow = oracionales => {
    const {
      nombre_oracional,
      mes_oracional,
      ano,
      portada_oracional,
    } = oracionales.item;

    let image = `http://admin.app.elman.minutodedios.fm/${portada_oracional}`;

    return (
      <TouchableOpacity onPress={() => this.detalle(nombre_oracional)}>
        <View style={styles.containerOracional}>
          <Image
            source={{uri: image}}
            style={styles.portada}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.nombre}>{nombre_oracional}</Text>
          <Text style={{textAlign: 'center'}}>
            {mes_oracional} {ano}
          </Text>
          <NavigationEvents
            onWillFocus={payload => this.getLogin()}
            // onDidFocus={payload => console.log('did focus', payload)}
            // onWillBlur={payload => console.log('will blur', payload)}
            // onDidBlur={payload => console.log('did blur', payload)}
          />
        </View>
      </TouchableOpacity>
    );
  };
  renderFlatList = oracionales => {
    if (oracionales) {
      return (
        <FlatList
          data={this.state.suscripciones}
          numColumns={2}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    } else {
      return (
        <View style={styles.startLoadOracionales}>
          <ActivityIndicator size="large" />
          <Text style={styles.textCargando}>Cargando oracionales</Text>
        </View>
      );
    }
  };
  detalle = oracional => {
    this.props.navigation.navigate('MisOracionales', {oracional});
  };
  render() {
    const {suscripciones} = this.state;

    if (this.state.login == 'true') {
      if (suscripciones.length > 0) {
        return (
          <View style={styles.viewBody}>
            {this.renderFlatList(suscripciones)}
          </View>
        );
      } else {
        return (
          <Nosuscripciones
            getLogin={this.getLogin}
            props={this.props}></Nosuscripciones>
        );
      }
    } else {
      return (
        // <View style={styles.viewNosuscripto}>
        //   <Text>No tienes suscripciones activas</Text>
        //   <Button title="Actualizar" onPress={() => this.getLogin()}></Button>
        // </View>
        <Nosuscripciones
          getLogin={this.getLogin}
          props={this.props}></Nosuscripciones>
      );
    }
  }
}

const styles = StyleSheet.create({
  viewNosuscripto: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBody: {
    flex: 1,
    // borderColor: "#30b680",
    // borderWidth: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },

  containerOracional: {
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 10,
  },
  portada: {
    width: 140,
    height: 210,
    margin: 4,
  },
  nombre: {
    fontWeight: 'bold',
    marginTop: 2,
    textAlign: 'center',
  },
  startLoadOracionales: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCargando: {
    marginTop: 20,
  },
});
