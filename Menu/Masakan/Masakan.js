import React, {Component} from 'react';
import {View, Image,TouchableOpacity} from 'react-native';
import Footers from '../Footers';
import {
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Left,
  Right,
  Icon,
} from 'native-base';
import axios from 'axios';

export default class Masakan extends Component {

  static navigationOptions = {headerShown: false};

  constructor() {
    super();
    this.state = {
      JenisMasakan: [],
      dataRestaurant: [],
    };
  }

  getJenisMasakan = () => {
    axios
      .get(`https://developers.zomato.com/api/v2.1/cuisines?city_id=74`, {
        headers: {'user-key': '6d0885c8f71ca044d1d39f36d49b8c0e'},
      })
      .then(res => {
        this.setState({
          JenisMasakan: res.data.cuisines,
        });
      });
  };

  getDataRestaurant = () => {
    axios
      .get(`https://developers.zomato.com/api/v2.1/search?start=6&count=10`, {
        headers: {'user-key': '6d0885c8f71ca044d1d39f36d49b8c0e'},
      })
      .then(res => {
        this.setState({
          dataRestaurant: res.data.restaurants,
        });
      });
  };

  componentDidMount() {
    this.getJenisMasakan();
    this.getDataRestaurant();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Content>
          <Text style={{marginTop: 20, marginLeft: 10}}>Jenis Masakan</Text>
          <Content horizontal style={{marginTop: 20, marginLeft: 10}}>
            {this.state.JenisMasakan.map((data, key) => {
              return (
                <View key={key}>
                  <Button style={{margin: 10}}>
                    <Text>{data.cuisine.cuisine_name}</Text>
                  </Button>
                </View>
              );
            })}
          </Content>
          <Text style={{marginTop: 20, marginLeft: 10}}>Restaurant</Text>
          <Content horizontal style={{marginTop: 20, marginLeft: 10}}>
            {this.state.dataRestaurant.map((data, key) => {
              var image = '';
              if (data.restaurant.thumb === '') {
                image =
                  'https://topekacivictheatre.com/wp-content/uploads/2019/01/no-image.jpg';
              } else {
                image = data.restaurant.thumb;
              }
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    this.props.navigation.navigate('Restaurant', {
                      nama_restaurant: data.restaurant.name,
                      res_id: data.restaurant.R.res_id,
                    });
                  }}>
                <Card style={{width: 350}}>
                  <CardItem>
                    <Left>
                      <Text>{data.restaurant.name}</Text>
                    </Left>
                    <Right>
                      <Icon name="home" />
                    </Right>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      style={{height: 200, width: null, flex: 1}}
                      source={{
                        uri: image,
                      }}
                    />
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Text>Jenis Masakan</Text>
                    </Left>
                    <Right>
                      <Text>Alamat</Text>
                    </Right>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Text>{data.restaurant.cuisines}</Text>
                    </Left>
                  </CardItem>
                </Card>
                </TouchableOpacity>
              );
            })}
          </Content>
          <Content horizontal></Content>
        </Content>
        <Footers />
      </View>
    );
  }
}
