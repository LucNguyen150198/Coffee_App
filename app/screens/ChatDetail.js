import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import {
  GiftedChat,
  Bubble,
  Send,
  MessageText,
  Message,
  SystemMessage,
  Composer,
  InputToolbar,
} from 'react-native-gifted-chat';
import { Colors, FontStyle, Icons, RADIUS, SPACING, w } from '../constants';
import { CustomHeaderScreen } from '../components';

export const ChatDetail = ({ navigation }) => {
  const onBack = () => navigation.goBack();
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = React.useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.sendContainer}>
      <Image source={Icons.send} style={styles.send} />
    </Send>
  );

  const renderMessageText = (props) => {
    return (
      <MessageText
        {...props}
        textStyle={{
          left: { color: Colors.text },
          right: { color: Colors.white },
        }}
        customTextStyle={FontStyle.p1}
      />
    );
  };

  const renderComposer = (props) => (
    <Composer
      {...props}
      textInputStyle={{
        paddingTop: 8.5,
      }}
    />
  );

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: Colors.primary,
        },
      }}
    />
  );
  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputContainer}
      primaryStyle={{ alignItems: 'center' }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeaderScreen
        title="Driver. Mr Steven"
        subTitle="Last seen 2 mins ago"
        leftAction={onBack}
      />
      <GiftedChat
        renderAvatar={null}
        isTyping={true}
        alwaysShowSend={true}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        placeholder="Type a message"
        user={{
          _id: 1,
        }}
        renderSend={renderSend}
        renderBubble={renderBubble}
        renderMessageText={renderMessageText}
        renderComposer={renderComposer}
        renderInputToolbar={renderInputToolbar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  sendContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  send: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: Colors.primary,
  },
  txtMessage: {
    color: Colors.white,
    backgroundColor: 'red',
  },
  inputContainer: {
    backgroundColor: Colors.ghost_white,
    paddingHorizontal: SPACING,
    alignItems: 'center',
    marginHorizontal: SPACING * 1.5,
    marginTop: SPACING * 2,
    borderRadius: RADIUS,
    borderTopWidth: 0,
  },
});
