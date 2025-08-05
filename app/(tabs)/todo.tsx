import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ColorScheme, useTheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import LoadingSpiner from "@/components/LoadingSpiner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/EmptyState";
type Todo = Doc<"todos">;

const Todo = () => {
  const { toggleDarkMode, colors } = useTheme();


  const [editId, seteditId] = useState<Id<"todos"> | null>(null);
  const [editText, seteditText] = useState("");

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toogleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const editTodo= useMutation(api.todos.updateTodo)
  const addTodo = useMutation(api.todos.addTodo);
  const cleanTodos = useMutation(api.todos.clearAllTodos);

  const handleToggleTodo =async(id:Id<'todos'>)=>{
    try {
      await toggleTodo({id})
    } catch (error) {
      Alert.alert("Fail to toggle todo")
    }
  }
  const handledelteTodo=async(id:Id<'todos'>)=>{
    Alert.alert("Delete Todo","Are you sure you want to delete this todo?",[
        {text:"Cancel",style:"cancel"},
        {text:"Delete",style:'destructive', onPress:()=>deleteTodo({id})}
    ])
  }

  const handleEditTodo=(todo:Todo)=>{
    seteditText(todo.text);
    seteditId(todo._id);
  }
  const handleSaveTodo=async()=>{
    try {
      if(editId){
        await editTodo({id:editId,text:editText.trim()});
      }
      seteditId(null);
      seteditText("");
    } catch (error) {
      Alert.alert("Failed to save todo", "Please try again later.");
      
    }

  }

  const handleCancelTodo=()=>{
    seteditId(null);
    seteditText("");
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editId === item._id;
    return (
      <View style={homestyles.todoItemWrapper}>
        <LinearGradient
          style={homestyles.todoItem}
          colors={colors.gradients.surface}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homestyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homestyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >{
              item.isCompleted && <Ionicons name="checkmark" size={16} color="white"/>
            }</LinearGradient>
          </TouchableOpacity>
          {isEditing ?(
            <View style={homestyles.editContainer}>
              <TextInput
                style={[homestyles.editInput, {color: colors.text}]}
                value={editText}
                autoFocus
                multiline
                placeholderTextColor={colors.textMuted}
                placeholder="Edit your todo"
                onChangeText={seteditText}
              />
              <View style={homestyles.editButton}>
                <TouchableOpacity
                onPress={handleSaveTodo}
                activeOpacity={0.8}
                >
                  <LinearGradient colors={colors.gradients.success} style={homestyles.editButton}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={homestyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={handleCancelTodo}
                activeOpacity={0.8}
                >
                  <LinearGradient colors={colors.gradients.muted} style={homestyles.editButton}>
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homestyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          ):(
            <View style={homestyles.todoTextContainer}>
            <Text style={[homestyles.todoText,item.isCompleted&&{
            textDecorationLine:"line-through",
            opacity:0.6,
            color:colors.textMuted
          }]}>
            {item.text}
          </Text>
          <View style={homestyles.todoActions}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>handleEditTodo(item)}>
              <LinearGradient colors={colors.gradients.warning} style={homestyles.actionButton}>
                <Ionicons name="pencil" size={14} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>handledelteTodo(item._id)}>
              <LinearGradient colors={colors.gradients.danger} style={homestyles.actionButton}>
                <Ionicons name="trash" size={14} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  const homestyles = createHomeStyles(colors);
  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpiner />;

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homestyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homestyles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homestyles.todoList}
          ListEmptyComponent={<EmptyState/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={homestyles.todoListContent}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Todo;
