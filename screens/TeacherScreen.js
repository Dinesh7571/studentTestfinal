import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { setDoc,doc } from 'firebase/firestore';


import db from '../Firebase';


export default function TeacherScreen() {
  const [proficiencyLevel, setProficiencyLevel] = useState('beginner');
  const [subject, setSubject] = useState('physics');
  const [topic, setTopic] = useState('electrostatics');
  const [questions, setQuestions] = useState(['', '', '', '', '']);
  const [topicOptions, setTopicOptions] = useState([
    { label: 'Electrostatics', value: 'electrostatics' },
    { label: 'Modern Physics', value: 'modern physics' },
    { label: 'EMF', value: 'emf' },
  ]);

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

  const addQuestions = async() => {
    
    questions.forEach((questionText, index) => {
      if (questionText.trim() !== '') {
  

        const collectionName = 'Test'; 
const documentName = 'questions'; 

const data = {
  proficiencyLevel: proficiencyLevel,
  subject: subject,
  topic: topic,
  questions: questions,
  // difficultyLevel: difficultyLevel
};

const documentRef = doc(db, collectionName, documentName);

// Now, set the document data
setDoc(documentRef, data)
  .then(() => {
    console.log('Document successfully written!');
  })
  .catch((error) => {
    console.error('Error writing document: ', error);
  });


      }
    });

    // Clear the question input fields
    setQuestions(['', '', '', '', '']);
  };

  return (
    <SafeAreaView style={{marginTop:40}}>
      <Text>Select Proficiency Level:</Text>
      <Picker
        selectedValue={proficiencyLevel}
        onValueChange={(itemValue) => setProficiencyLevel(itemValue)}
      >
        <Picker.Item label="Beginner" value="beginner" />
        <Picker.Item label="Intermediate" value="intermediate" />
        <Picker.Item label="Advanced" value="advanced" />
      </Picker>

      <Text>Select Subject:</Text>
      <Picker
        selectedValue={subject}
        onValueChange={(itemValue) => setSubject(itemValue)}
      >
        <Picker.Item label="Physics" value="physics" />
        <Picker.Item label="Chemistry" value="chemistry" />
        <Picker.Item label="Maths" value="maths" />
      </Picker>

      <Text>Select Topic:</Text>
      <Picker
        selectedValue={topic}
        onValueChange={(itemValue) => setTopic(itemValue)}
      >
        {topicOptions.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>

      <Text>Enter Five Questions:</Text>
      {questions.map((question, index) => (
        <TextInput
          key={index}
          placeholder={`Question ${index + 1}`}
          value={question}
          onChangeText={(text) => {
            const updatedQuestions = [...questions];
            updatedQuestions[index] = text;
            setQuestions(updatedQuestions);
          }}
        />
      ))}

      <Button title="Add Questions" onPress={addQuestions} />
    </SafeAreaView>
  );
}
