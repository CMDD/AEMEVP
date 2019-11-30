import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {Overlay, Icon, Slider} from 'react-native-elements';

export default class OverlayOneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      cargando: false,
      dia: '',
      id: this.props.dia,
      oracional_id: this.props.oracional_id,
      mostrar: false,
      fuente: '0',
      titulo: 20 + parseInt(this.fuente),
      subtitulo: 16 + parseInt(this.fuente),
      contenido: 15 + parseInt(this.fuente),
    };
    this.props.props.navigation.setParams({
      mostrar: this.mostrar,
    });
    this.getFontSize();
    this.getDia(this.state.id, this.state.oracional_id);
  }
  //FontSize
  mostrar = () => {
    this.setState({
      mostrar: true,
    });
  };
  overLay = () => {
    return (
      <Overlay
        isVisible={this.state.mostrar}
        onBackdropPress={() => this.setState({mostrar: false})}
        height={140}>
        <View>
          <Text>Tamaño de fuente!</Text>
          <View style={styles.indicator}>
            <Text style={styles.menos}>-</Text>
            <Text style={styles.mas}>+</Text>
          </View>

          <Slider
            maximumValue={13}
            minimumValue={1}
            value={this.state.fuente}
            onValueChange={value => this.setFontSize(value)}
          />
        </View>
      </Overlay>
    );
  };

  setFontSize = async value => {
    await AsyncStorage.setItem('fuente', String(value));
    console.log(value);
    this.getFontSize();
  };
  getFontSize = async () => {
    const fuente = parseInt(await AsyncStorage.getItem('fuente'));
    if (!fuente) {
      this.setFontSize(1);
    }
    this.setState({
      fuente: fuente,
      title: 20 + parseInt(fuente),
      subtitle: 16 + parseInt(fuente),
      content: 15 + parseInt(fuente),
    });
  };
  //Fin
  paginarNext = () => {
    let value = parseInt(this.state.id);
    let idDia = value + 1;
    this.setState({
      id: idDia,
      cargando: false,
    });
    this.getDia(idDia, this.state.oracional_id);
  };
  paginarBack = () => {
    let value = parseInt(this.state.id, this.state.oracional_id);
    let idDia = value - 1;

    this.setState({
      id: idDia,
      cargando: false,
    });
    if (idDia <= 0) {
      this.setState({
        id: 1,
        cargando: false,
      });
      this.getDia(1, this.state.oracional_id);
    } else {
      this.getDia(idDia, this.state.oracional_id);
    }
  };

  getDia = async (id, oracional_id) => {
    await fetch(
      'http://admin.app.elman.minutodedios.fm/api/get-dia-jovenes/' +
        id +
        '/' +
        oracional_id,
    )
      .then(res =>
        res.json().then(res => {
          this.setState({
            dia: res,
            cargando: true,
          });
        }),
      )
      .catch(error => {
        this.setState({
          id: 1,
        });
        this.getDia(1, oracional_id);
      });
  };
  renderDetalle = () => {
    const {
      autor,
      ejercicio,
      editorial,
      mes,
      fecha,
      dia,
      oracion_manana,
      reflexion,
      oracion_noche,
      tipo_dia,
    } = this.state.dia;
    if (this.state.cargando) {
      return (
        <View style={styles.viewContenedor}>
          <View style={styles.header}>
            <View style={styles.iconLeft}>
              <Icon
                name="chevron-left"
                type="material-community"
                color="#517fa4"
                size={70}
                onPress={() => this.paginarBack()}
              />
            </View>
            <View style={styles.fechaContainer}>
              <Text style={styles.fecha}>{tipo_dia}</Text>
              <Text style={styles.fecha}>{dia}</Text>
            </View>
            <View style={styles.iconRight}>
              <Icon
                name="chevron-right"
                type="material-community"
                color="#517fa4"
                size={70}
                onPress={() => this.paginarNext()}
              />
            </View>
          </View>

          <View style={styles.viewContenido}>
            <Text style={[styles.title, {fontSize: this.state.title}]}>
              ORACIÓN DE LA MAÑANA
            </Text>
            <Text style={[styles.content, {fontSize: this.state.content}]}>
              {oracion_manana}
            </Text>
            <Text style={[styles.title, {fontSize: this.state.title}]}>
              REFLEXIÓN
            </Text>
            <Text style={[styles.content, {fontSize: this.state.content}]}>
              {reflexion}
            </Text>
            <Text style={[styles.title, {fontSize: this.state.title}]}>
              EJERCICIO
            </Text>
            <Text style={[styles.content, {fontSize: this.state.content}]}>
              {ejercicio}
            </Text>
            <Text style={[styles.title, {fontSize: this.state.title}]}>
              ORACIÓN DE LA NOCHE
            </Text>
            <Text style={[styles.content, {fontSize: this.state.content}]}>
              {oracion_noche}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.header}>
            <View style={styles.iconLeft}>
              <Icon
                name="chevron-left"
                type="material-community"
                color="#517fa4"
                size={70}
                onPress={() => this.paginarBack()}
              />
            </View>
            <View style={styles.fechaContainer}></View>
            <View style={styles.iconRight}>
              <Icon
                name="chevron-right"
                type="material-community"
                color="#517fa4"
                size={70}
                onPress={() => this.paginarNext()}
              />
            </View>
          </View>
          <ActivityIndicator size="large" color="gray" />
        </View>
      );
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.viewBody}>
        {this.overLay()}
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
  title: {
    fontWeight: 'bold',
    marginTop: '8%',
  },
  subtitle: {
    fontWeight: 'bold',
    marginTop: '2%',
    textAlign: 'center',
    margin: 15,
  },
  content: {
    margin: 15,
    textAlign: 'justify',
    color: 'gray',
  },
  indicator: {
    flexDirection: 'row',
  },
  menos: {
    fontSize: 30,
    flex: 1,
  },
  mas: {
    fontSize: 30,
  },
});
