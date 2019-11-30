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
      suscripciones: null,
      isLoading: true,
      nombre: this.props.navigation.state.params.oracional,
    };
    console.log(this.props.navigation.state.params.oracional);
    this.getLogin();
  }
  componentDidMount() {
    this.setState({});
  }

  getLogin = async () => {
    const result = await AsyncStorage.getItem('login');
    const user_id = await AsyncStorage.getItem('user_id');
    this.setState({
      login: result,
      user_id,
    });
    this.getOracionales();
  };

  getOracionales = async () => {
    await fetch(
      'http://admin.app.elman.minutodedios.fm/api/suscripcion-oracionales/' +
        this.state.nombre,
    ).then(res =>
      res.json().then(res => {
        this.setState({
          suscripciones: res,
        });
      }),
    );
  };
  renderRow = oracionales => {
    const {nombre, mes, ano, portada} = oracionales.item;

    let image = `http://admin.app.elman.minutodedios.fm/${portada}`;

    return (
      <TouchableOpacity onPress={() => this.detalle(oracionales)}>
        <View style={styles.containerOracional}>
          <Image
            source={{uri: image}}
            style={styles.portada}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.nombre}>{nombre}</Text>
          <Text style={{textAlign: 'center'}}>
            {mes} {ano}
          </Text>
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
    this.props.navigation.navigate('Oracional', {oracional});
  };
  render() {
    const {suscripciones} = this.state;

    if (this.state.login == 'true') {
      return (
        <View style={styles.viewBody}>
          {this.renderFlatList(suscripciones)}
        </View>
      );
    } else {
      return (
        <View style={styles.viewNosuscripto}>
          <Text>No tienes suscripciones activas</Text>
          <Button title="Actualizar" onPress={() => this.getLogin()}></Button>
        </View>
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
