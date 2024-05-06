import React from "react";
import Tabs from "../components/Tabs";
import { createStackNavigator } from "@react-navigation/stack";
import CommentScreen from "../screens/CommentScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import MyQuestionsScreen from "../screens/MyQuestionsScreen";
import UpdateQuestionScreen from "../screens/UpdateQuestionScreen";

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={Tabs} />
            <Stack.Screen name="Comment" component={CommentScreen}/>
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}/>
            <Stack.Screen name="MyQuestions" component={MyQuestionsScreen}/>
            <Stack.Screen name="UpdateQuestion" component={UpdateQuestionScreen}/>

        </Stack.Navigator> 
    );
}

export default MainStack;
