import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const TodoInput = () => {
  const { colors } = useTheme();
  const homestyles = createHomeStyles(colors);
  const [newTodo, setnewTodo] = useState("");
  const addTodo = useMutation(api.todos.addTodo);

  const handleAddTodo = async () => {
    if(newTodo.trim()){
        try {
            await addTodo({text:newTodo})
            setnewTodo("");
        } catch (error) {
            Alert.alert("Fail to add todo");
        }
    }
  };

  return (
    <View style={homestyles.inputSection}>
      <View style={homestyles.inputWrapper}>
        <TextInput
          style={homestyles.input}
          value={newTodo}
          placeholder="What needs to be done?"
          onChangeText={setnewTodo}
          multiline
          onSubmitEditing={handleAddTodo}
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
          style={homestyles.addButton}
          onPress={handleAddTodo}
        >
          <LinearGradient
            style={[
              homestyles.addButton,
              !newTodo.trim() && homestyles.addButtonDisabled,
            ]}
            colors={
              newTodo.trim() ? colors.gradients.primary : colors.gradients.muted
            }
          >
            <Ionicons name="add" size={25} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
