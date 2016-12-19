'use strict';

import React from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Dimensions
} from 'react-native';

import {getTagFeedsOfPage} from './api/TagAPI';
var TagFeedCell = require('./TagFeedCell');
var FeedDetail = require('../FeedDetail');
var HomePage = require('./HomePage');

const windowWidth = Dimensions.get('window').width;

var TagFeeds = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    getTagFeedsOfPage(29, 1, this);
  },


  render: function() {
    const { onScroll = () => {} } = this.props;
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
        <View style={{flex: 1}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderFeed}
            style={styles.listView}
          />
        </View>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>

      </View>

    );
  },

  selectFeed: function(feed, avatarCanClick=true) {
    let navigator = this.props.navigator;
    this.props.navigator.push({
      title: '正文',
      component: FeedDetail,
      params: {token:this.props.token, navigator, feed, nav2TagDetail:this.props.nav2TagDetail, avatarCanClick:avatarCanClick}
    });
  },

  pressAvatar: function(feed) {
    let navigator = this.props.navigator;
    this.props.navigator.push({
      title: feed.user_name,
      component: HomePage,
      params: {token:this.props.token,feed,navigator, selectFeed: this.selectFeed, nav2TagDetail:this.props.nav2TagDetail},
    });
  },


  renderFeed: function(feed) {
    return(
      <TagFeedCell
        navigator={this.props.navigator}
        onSelect={() => this.selectFeed(feed)}
        token={this.props.token}
        feed={feed}
        nav2TagDetail={this.props.nav2TagDetail}
        pressAvatar={() =>this.pressAvatar(feed)}
        push2FeedDetail={() => this.selectFeed(feed)}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  listView: {
    backgroundColor: 'white',
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:50,
    backgroundColor: '#00B5AD',
  },
  back: {
    marginLeft:10,
    marginTop:23,
  },
  title: {
    alignSelf:'center',
    marginTop: 10,
  },
  right: {
    marginRight:10,
    marginTop:23,
  },



});

module.exports = TagFeeds;