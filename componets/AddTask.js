import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import instance from './api/api';

export default function AddTaskScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
        const response = await instance.post("/api/v1/items/addItem", data);
        console.log(response.data); 
        if (response) {
            Alert.alert("Success" , "Item has been added Successfully");
            navigation.push('My Tasks')
          }
          if(!response){
            Alert.alert("Error" , "Item could not be added");
          }

        
      } catch (error) {
        console.error(error);
        console.log(error);
      }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="title"
        rules={{ required: "Please enter task title" }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              placeholder="Enter task title"
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
            {errors.title && (
              <Text style={styles.errorText}>{errors.title.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="description"
        rules={{ required: "Please enter task description" }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              placeholder="Enter task description"
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
            {errors.description && (
              <Text style={styles.errorText}>{errors.description.message}</Text>
            )}
          </View>
        )}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  btn: {
    height: 40,
    marginTop: 20,
    backgroundColor: "#0080ff",
    width: 250,
    borderRadius: 6,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    marginTop: 9,
    fontSize: 16,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginTop: 10,
    height: 45,
    margin: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
