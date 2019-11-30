import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Overlay, Input, Button, Icon, Divider} from 'react-native-elements';

export default class OverlayOneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      cargando: true,
      editorial: '',
      id: this.props.navigation.state.params,
    };
  }
  componentDidMount() {
    this.getEditorial();
  }
  getEditorial = async () => {
    await fetch(
      `http://admin.app.elman.minutodedios.fm/api/editorial/${this.state.id}`,
    ).then(res =>
      res.json().then(res => {
        this.setState({
          editorial: res,
        });
      }),
    );
  };
  renderDetalle = () => {
    const {titulo, contenido, autor} = this.state.editorial;
    if (this.state.cargando) {
      return (
        <View style={styles.viewContenedor}>
          <View style={styles.header}>
            <View style={styles.fechaContainer}>
              <Text style={styles.fecha}>Editorial</Text>
              {/* <Text style={styles.fecha}>{dia}</Text> */}
            </View>
          </View>

          <View style={styles.viewContenido}>
            <View style={styles.contenidoEditorial}>
              <Text style={styles.titleEditorial}>{titulo}</Text>

              {/* <Text style={styles.titleEditorial}>{contenido}</Text> */}
              <Text style={styles.textoEditorial}>{contenido}</Text>
              <Text style={styles.titleEditorial}>{autor}</Text>
              {/* <Text style={styles.textoEditorial}>{ejercicio}</Text> */}
            </View>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.viewBody}>
        {this.renderDetalle()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    alignItems: 'center',
  },
  viewContenedor: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    // borderColor: "#f00",
    // borderWidth: 1
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
    marginTop: 80,
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
