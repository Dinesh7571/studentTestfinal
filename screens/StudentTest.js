import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, ScrollView,KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { setDoc, doc, addDoc, collection, query, where, getDocs } from 'firebase/firestore';

import db from '../Firebase';

export default function StudentScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '', '']);
  const [questions, setQuestions] = useState([]);
  const [timeStarted, setTimeStarted] = useState(null);
  const [proficiencyLevel, setProficiencyLevel] = useState('beginner');
  const [subject, setSubject] = useState('physics');
  const [selectedTopic, setSelectedTopic] = useState('electrostatics');
  const [topicOptions, setTopicOptions] = useState([]);
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    // Update topic options based on the selected subject
    if (subject === 'physics') {
      setTopicOptions([
        { label: 'Electrostatics', value: 'electrostatics' },
        { label: 'Modern Physics', value: 'modern physics' },
        { label: 'EMF', value: 'emf' },
      ]);
    } else if (subject === 'chemistry') {
      setTopicOptions([
        { label: 'Solid State', value: 'solid state' },
        { label: 'Electrochemistry', value: 'electrochemistry' },
        { label: 'Organic Chemistry', value: 'organic chemistry' },
      ]);
    } else if (subject === 'maths') {
      setTopicOptions([
        { label: 'Integration', value: 'integration' },
        { label: 'Differentiation', value: 'differentiation' },
        { label: 'Vector', value: 'vector' },
      ]);
    }
  }, [subject]);

  useEffect(() => {
    // Fetch questions from Firestore when the component mounts and test has started
    if (testStarted) {
      const fetchQuestions = async () => {
        const collectionName = 'Test';
        const questionCollectionRef = collection(db, collectionName);

        // Build the query based on selected criteria
        const queryRef = query(
          questionCollectionRef,
          where('proficiencyLevel', '==', proficiencyLevel),
          where('subject', '==', subject),
          where('topic', '==', selectedTopic)
        );

        try {
          const querySnapshot = await getDocs(queryRef);

          const questionData = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.questions) {
              questionData.push(data.questions);
            }
          });

          if (questionData.length > 0) {
            setQuestions(questionData[0]);
            setTimeStarted(new Date().getTime()); // Record the start time
          } else {
            console.log('No questions found for the selected criteria.');
          }
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };

      fetchQuestions();
    }
  }, [proficiencyLevel, subject, selectedTopic, testStarted]);

  const startTest = () => {
    setTestStarted(true);
  };

  const submitTest = async () => {
    // Calculate the time taken
    const timeEnded = new Date().getTime();
    const timeTaken = (timeEnded - timeStarted)/1000;

    // Prepare student data
    const studentData = {
      name: name,
      email: email,
      answers: answers,
      timeTaken: timeTaken,
    };

    // Save student data to Firestore
    const studentsCollection = collection(db, 'Students');
    try {
      const docRef = await addDoc(studentsCollection, studentData);
      console.log('Student data saved with ID:', docRef.id);
    } catch (error) {
      console.error('Error saving student data:', error);
    }
  };

  return (

   
    
   
  
    <View style={{marginTop:30,padding:10}}>
     
      <KeyboardAvoidingView>
      <ScrollView >
      {/* Input fields for name and email */}
      <Text>Name:</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text >Email:</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Start Test button */}
      {!testStarted && (
        <View>
       
        <Text>Select Proficiency Level:</Text>
        <Picker
          selectedValue={proficiencyLevel}
          onValueChange={(itemValue) => setProficiencyLevel(itemValue)}
        >
          <Picker.Item label="Beginner" value="beginner" />
          <Picker.Item label="Intermediate" value="intermediate" />
          <Picker.Item label="Advanced" value="advanced" />
        </Picker>

        {/* Select Subject */}
        <Text>Select Subject:</Text>
        <Picker
          selectedValue={subject}
          onValueChange={(itemValue) => setSubject(itemValue)}
        >
          <Picker.Item label="Physics" value="physics" />
          <Picker.Item label="Chemistry" value="chemistry" />
          <Picker.Item label="Maths" value="maths" />
        </Picker>

        {/* Select Topic */}
        <Text>Select Topic:</Text>
        <Picker
          selectedValue={selectedTopic}
          onValueChange={(itemValue) => setSelectedTopic(itemValue)}
        >
          {topicOptions.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
        <Button title="Start Test" onPress={startTest} />
        </View>
      )}

      {/* Select Proficiency Level */}
      {testStarted && (
        <View>
         

          {/* Questions and answers input fields */}
          <Text>Questions:</Text>
          {questions.map((question, index) => (
            <View key={index}>
              <Text>Question {index + 1}:</Text>
              <Text>{question}</Text>
              <TextInput
                placeholder={`Answer to Question ${index + 1}`}
                value={answers[index]}
                onChangeText={(text) => {
                  const updatedAnswers = [...answers];
                  updatedAnswers[index] = text;
                  setAnswers(updatedAnswers);
                }}
              />
            </View>
          ))}

          {/* Submit Test button */}
          <Button title="Submit Test" onPress={submitTest} />
        </View>
      )}
      </ScrollView>
      </KeyboardAvoidingView>
      </View>
 

  );
}
