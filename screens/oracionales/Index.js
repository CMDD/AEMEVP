import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {Image, Button} from 'react-native-elements';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oracionales: null,
      isLoading: true,
    };
  }
  goTo = nameScreem => {
    this.props.navigation.navigate(nameScreem);
  };
  demo = oracional => {
    this.props.navigation.navigate('Detalle', oracional);
  };

  async componentDidMount() {
    this.getOracionales();
  }
  getOracionales = async () => {
    await fetch('http://admin.app.elman.minutodedios.fm/api/oracionales').then(
      res =>
        res.json().then(res => {
          this.setState({
            oracionales: res,
          });
        }),
    );
  };

  renderRow = oracionales => {
    const {nombre, mes, ano, descripcion, portada} = oracionales.item;
    let image = `http://admin.app.elman.minutodedios.fm/${portada}`;

    return (
      <TouchableOpacity onPress={() => this.demo(oracionales)}>
        <View style={styles.containerOracional}>
          <ImageBackground
            source={{uri: image}}
            style={styles.portada}
            resizeMode="contain"
            PlaceholderContent={<ActivityIndicator />}>
            <View style={styles.viewDemo}>
              <Text style={styles.textDemo}>DEMO</Text>
            </View>
          </ImageBackground>
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
          data={this.state.oracionales}
          horizontal={false}
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
  render() {
    const {oracionales} = this.state;
    return (
      <View style={styles.viewBody}>{this.renderFlatList(oracionales)}</View>
    );
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
  viewOracional: {
    // borderColor: "#30b680",
    // borderWidth: 1,
    width: '100%',
  },
  containerOracional: {
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 10,
  },
  viewDemo: {
    // borderColor: "#f00",
    // borderWidth: 1,
    alignItems: 'flex-end',
  },
  textDemo: {
    backgroundColor: '#280C54',
    color: '#fff',
    padding: 5,
  },
  containerPortada: {
    // height: 20
    // width: 100
    // alignItems: "center"
    marginTop: 20,
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
