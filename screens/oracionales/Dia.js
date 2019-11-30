import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, AsyncStorage} from 'react-native';
import {Icon, Divider, Overlay, Slider, Button} from 'react-native-elements';
import DetalleKid from '../components/Kids';
import DetalleJoven from '../components/Jovenes';
import DetalleAdulto from '../components/Adultos';
import DetallePuerta from '../components/Puerta';

export default class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dia: '',
      idPaginacion: '',
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Día',
      // headerStyle: {
      //   backgroundColor: "#ffeecc"
      // },
      // headerTintColor: "red",
      headerRight: () => (
        <Button
          titleStyle={{fontSize: 25}}
          type="clear"
          onPress={navigation.getParam('mostrar')}
          title="Aa+"
        />
      ),
    };
  };

  render() {
    const {
      nombre_oracional,
      dia,
      oracional_id,
    } = this.props.navigation.state.params;

    if (nombre_oracional == 'Kids') {
      return (
        <View>
          <DetalleKid
            props={this.props}
            dia={dia}
            oracional_id={oracional_id}></DetalleKid>
        </View>
      );
    }
    if (nombre_oracional == 'Jovenes') {
      return (
        <View>
          <DetalleJoven
            props={this.props}
            dia={dia}
            oracional_id={oracional_id}></DetalleJoven>
        </View>
      );
    }
    if (nombre_oracional == 'Adultos') {
      return (
        <View>
          <DetalleAdulto
            props={this.props}
            dia={dia}
            oracional_id={oracional_id}></DetalleAdulto>
        </View>
      );
    }
    if (nombre_oracional == 'Puerta') {
      return (
        <View style={styles.contenedor}>
          <DetallePuerta
            props={this.props}
            dia={dia}
            oracional_id={oracional_id}></DetallePuerta>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBody: {
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
  iconLeft: {
    flex: 1,
  },
  fechaContainer: {
    alignItems: 'center',
    flex: 1,
    // borderColor: "#f00",
    // borderWidth: 1
  },
  iconRight: {
    flex: 1,
  },
  fecha: {
    fontSize: 30,
    color: 'gray',
    fontWeight: '700',
  },
  viewDivider: {
    width: '90%',
    marginTop: 20,
  },
  viewContenido: {
    flex: 1,
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
    // borderColor: "#f00",
    // borderWidth: 1
  },
  contenidoEditorial: {
    alignItems: 'center',
  },
  titleEditorial: {
    fontWeight: 'bold',
  },
  textoEditorial: {
    margin: 15,
    textAlign: 'justify',
    color: 'gray',
  },
});
