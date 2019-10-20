import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
  ActivityIndicator,
  View,
} from 'react-native';
import styled from 'styled-components'

const MessageContainer=styled.View`
    margin: 0 10px 10px 10px;
    padding: 20px;
    background-color:#fff;
    box-shadow: 0px 2px 2px #00000055;
    elevation: 2;
    border-radius: 5px;
`;

const MessageTitle=styled.Text`
    font-size: 20px;
    margin-bottom: 10px;
`;

const MessageTime=styled.Text`
    color: #aaa;
    margin-top: 10px;
`;

class MessageBox extends React.Component {
  render() {
    var date = new Date(this.props.message.timestamp*1000);
    // Hours part from the timestamp
    var hours = "0" + date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    // Will display time in 10:30 format
    var formattedTime = hours.substr(-2) + ':' + minutes.substr(-2);

    return <MessageContainer>
        <View>
          <MessageTitle>
            {this.props.message.title}
          </MessageTitle>
          <Text style={styles.messageText}>
            {this.props.message.text}
          </Text>
          <MessageTime>
            {formattedTime}
          </MessageTime>
        </View>
      </MessageContainer>;
  }
}

class MessagesScreen extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      dataSource: [],
    };
    this.onRefresh = this.onRefresh.bind(this);
  }

  loadData() {
    this.setState({
      isLoading: true,
      dataSource: [],
    });
    return fetch(this.props.auth.api_url + '/notification?hash=' + this.props.auth.hash)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  componentDidMount(){
    this.loadData();
  }

  onRefresh() {
    this.loadData();
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={this.isLoading} onRefresh={this.onRefresh} />
          }>
          {this.state.dataSource.map((message, i) => {
            return <MessageBox message={message} key={i}></MessageBox>
          })}
       </ScrollView>
      </View>
    );
  }
}

MessagesScreen.navigationOptions = {
  title: 'Nachrichten',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 20,
  },
});

const mapStateToProps = function(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(MessagesScreen);
