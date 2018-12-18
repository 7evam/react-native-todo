import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import Note from './Note';


export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noteArray:[{'note':'No notes...yet'}],
      noteText: '',
    }
  }

  render() {

    let notes = this.state.noteArray.map((val,key) => {
      return <Note key={key} keyval={key} val={val}
      deleteMethod={ () => this.deleteNote(key) } />
    })

    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Jot some notes!</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {notes}
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
        style={styles.textInput}
        onChangeText={(noteText) => this.setState({noteText})}
        value={this.state.noteText}
        placeholder='Write your note here'
        placeholderTextColor='white'
        underlineColorAndroid='transparent'
        >
        </TextInput>
      </View>

      <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
        <Text style={styles.addButtonText}>Add note</Text>
      </TouchableOpacity>
      </View>
    );
  }

  addNote() {

    if (this.state.noteText) {
      let d = new Date();
      this.state.noteArray.push({
      'date':(d.getMonth() + 1) +
      "/" + d.getDate() +
      "/" + d.getFullYear(),
      'note': this.state.noteText
      });
      this.setState({ noteArray: this.state.noteArray});
      this.setState({ noteText: '' });
    } else {
      alert('Write a note below to add!')
    }
  }

  deleteNote(key) {
    this.state.noteArray.splice(key, 1);
    this.setState({ noteArray: this.state.noteArray })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    paddingTop: 12,
    backgroundColor:'#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText:{
    color: 'white',
    fontSize: 18,
    padding: 26,
  },
  textInput:{
    alignSelf: 'stretch',
    color: "#fff",
    padding:20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed'
  },
  scrollContainer:{
    flex: 1,
    marginBottom: 100,
  },
  footer:{
    position: 'absolute',
    bottom:0,
    left:0,
    right:0,
    zIndex: 10,
  },
 addButton:{
  position: 'absolute',
  zIndex: 11,
  right:20,
  bottom:90,
  backgroundColor: '#E91E63',
  width:70,
  height:70,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 3,
 },
 addButtonText:{
  color: '#fff',
  fontSize:18,
 }

});
