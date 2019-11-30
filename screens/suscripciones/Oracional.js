import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import {Image, ListItem} from 'react-native-elements';

export default class Oracional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.state.params.oracional.item.id,
      dias: null,
      oracional: this.props.navigation.state.params.oracional.item,
      loading: true,
    };
  }

  componentDidMount = () => {
    this.getDias();
  };

  listItems = ({item}) => (
    <ListItem
      key={item.id}
      title={item.tipo_dia + ' ' + item.dia}
      subtitle=""
      titleStyle={styles.titleStyle}
      subtitleStyle={styles.subtitleStyle}
      onPress={() => this.goToDia(item)}
      leftIcon={{
        name: 'book-open-page-variant',
        type: 'material-community',
        color: '#ccc',
      }}
      bottomDivider
      chevron={{size: 30}}
    />
  );
  getDias = async () => {
    console.log(this.state.oracional);

    switch (this.state.oracional.nombre) {
      case 'Kids':
        url = `http://admin.app.elman.minutodedios.fm/api/dias-kids/${this.state.oracional.id}`;
        break;
      case 'Jovenes':
        url = `http://admin.app.elman.minutodedios.fm/api/dias-jovenes/${this.state.oracional.id}`;
        break;
      case 'Adultos':
        url = `http://admin.app.elman.minutodedios.fm/api/dias-adultos/${this.state.oracional.id}`;
        break;
      case 'Puerta':
        url = `http://admin.app.elman.minutodedios.fm/api/dias-puerta/${this.state.oracional.id}`;
        break;

      default:
        break;
    }
    await fetch(url).then(res =>
      res.json().then(res => {
        this.setState({
          dias: res,
          loading: false,
        });
      }),
    );
  };
  goToDia = dia => {
    this.props.navigation.navigate('SuscripcionDia', dia);
  };
  goToEditorial = id => {
    this.props.navigation.navigate('Editorial', id);
  };
  render() {
    const {
      nombre,
      portada,
      mes,
      ano,
      id,
    } = this.props.navigation.state.params.oracional.item;
    let img = `http://admin.app.elman.minutodedios.fm/${portada}`;
    console.log(id);

    return (
      <View style={styles.viewBody}>
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
          </View>
        </View>
        <ListItem
          title={'Editorial'}
          subtitle=""
          titleStyle={styles.titleStyle}
          subtitleStyle={styles.subtitleStyle}
          onPress={() => this.goToEditorial(id)}
          leftIcon={{
            name: 'book-open-page-variant',
            type: 'material-community',
            color: '#ccc',
          }}
          bottomDivider
          chevron={{size: 30}}
        />
        {this.state.loading ? (
          <View style={styles.cargandoDias}>
            <ActivityIndicator size="large" />
            <Text>Cargando días..</Text>
          </View>
        ) : (
          <FlatList
            data={this.state.dias}
            keyExtractor={item => String(item.id)}
            renderItem={this.listItems}
          />
        )}
      </View>
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
    width: 140,
    height: 210,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  containerStyle: {
    // borderBottomWidth: 1,
    // borderBottomColor: "#e3e3d3"
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
});
