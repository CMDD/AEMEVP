import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import {Image, ListItem, Button} from 'react-native-elements';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.state.params.item.id,
      oracional: this.props.navigation.state.params.item,
      dias: null,
      login: '',
    };
    this.getLogin();
  }
  componentDidMount = () => {
    this.getDias();
  };

  getLogin = async () => {
    const result = await AsyncStorage.getItem('login');
    this.setState({
      login: result,
    });
  };
  returnDias = dias => {
    if (dias) {
      return (
        <ListItem
          title={dias.tipo_dia + ' ' + dias.dia}
          subtitle=""
          containerStyle={styles.containerStyle}
          titleStyle={styles.titleStyle}
          subtitleStyle={styles.subtitleStyle}
          onPress={() => this.goToDia(dias)}
          leftIcon={{
            name: 'book-open-page-variant',
            type: 'material-community',
            color: '#ccc',
          }}
          rightIcon={{
            type: 'material-community',
            name: 'chevron-right',
            color: '#ccc',
          }}
        />
      );
    } else {
      return (
        <View style={styles.cargandoDias}>
          <ActivityIndicator size="large" />
          <Text>Cargando días..</Text>
        </View>
      );
    }
  };
  getDias = async () => {
    switch (this.state.oracional.nombre) {
      case 'Kids':
        url = `http://admin.app.elman.minutodedios.fm/api/dias-demo-kids/${this.state.oracional.id}`;
        break;
      case 'Jovenes':
        url = `http://admin.app.elman.minutodedios.fm/api/dias-demo-jovenes/${this.state.oracional.id}`;
        break;
      case 'Adultos':
        url = `http://admin.app.elman.minutodedios.fm/api/dias-demo-adultos/${this.state.oracional.id}`;
        break;
      case 'Puerta':
        url = `http://admin.app.elman.minutodedios.fm/api/dias-demo-puerta/${this.state.oracional.id}`;
        break;
      default:
        break;
    }
    await fetch(url).then(res =>
      res.json().then(res => {
        this.setState({
          dias: res,
        });
      }),
    );
  };
  goToDia = dia => {
    this.props.navigation.navigate('Dia', dia);
  };
  goToEditorial = id => {
    this.props.navigation.navigate('EditorialDemo', id);
  };

  goToScreem = async () => {
    const result = await AsyncStorage.getItem('login');
    const user_id = await AsyncStorage.getItem('user_id');

    this.setState({
      login: result,
      user_id,
    });

    if (result == 'false' || result == null) {
      this.props.navigation.navigate('Login');
      console.log('Pilas', result);
    } else {
      // Logica para pagar
      const formData = {
        oracional: this.state.oracional,
        id: this.state.user_id,
      };
      await fetch('http://admin.app.elman.minutodedios.fm/api/suscripcion', {
        method: 'POST',
        headers: {
          'Content-Type': 'Aplication/json',
        },
        body: JSON.stringify(formData),
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            console.log(res);
            this.props.navigation.navigate('MisOracionales', {
              oracional: formData.oracional.nombre,
            });
          }
          if (res.status == 101) {
            console.log(res);
            this.props.navigation.navigate('Soporte', {
              oracional: formData.oracional.nombre,
            });
          } else {
            this.props.navigation.navigate('MisOracionales', {
              oracional: formData.oracional.nombre,
            });
          }
        });

      // Fin;
    }
  };

  render() {
    const {
      nombre,
      portada,
      descripcion,
      mes,
      ano,
      id,
    } = this.props.navigation.state.params.item;
    let img = `http://admin.app.elman.minutodedios.fm/${portada}`;

    return (
      <ScrollView style={styles.viewBody}>
        <View style={styles.viewImage}>
          <Image
            containerStyle={styles.containerImg}
            style={styles.img}
            source={{uri: img}}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text>
              {mes} {ano}
            </Text>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.goToScreem()}>
              <Text style={styles.btnText}>Suscribirme</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descripcion}>
          {/* <Text>Descripción</Text>
          <Text>{descripcion}</Text> */}
        </View>
        <ListItem
          title={'Editorial'}
          subtitle=""
          containerStyle={styles.containerStyle}
          titleStyle={styles.titleStyle}
          subtitleStyle={styles.subtitleStyle}
          onPress={() => this.goToEditorial(id)}
          leftIcon={{
            name: 'book-open-page-variant',
            type: 'material-community',
            color: '#ccc',
          }}
          rightIcon={{
            type: 'material-community',
            name: 'chevron-right',
            color: '#ccc',
          }}
        />
        {this.returnDias(this.state.dias)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  viewImage: {
    // borderColor: "#f00",
    // borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerImg: {
    margin: 8,
    marginLeft: 30,
    // borderColor: "#f00",
    // borderWidth: 1
  },
  img: {
    width: 150,
    height: 200,
    margin: 6,
    // borderColor: "#f00",
    // borderWidth: 1,
    padding: 20,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  containerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3d3',
  },
  titleStyle: {
    color: 'gray',
    fontWeight: 'bold',
  },
  subtitleStyle: {
    color: 'gray',
  },
  cargandoDias: {
    alignItems: 'center',
  },
  suscribirme: {
    backgroundColor: '#280C54',
    marginTop: 10,
  },
  descripcion: {
    alignItems: 'center',
  },
  containerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3d3',
  },
  btnTitleStyle: {
    fontSize: 15,
  },
  btn: {
    backgroundColor: '#280C54',
    borderRadius: 3,
    padding: 10,
    width: 150,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
