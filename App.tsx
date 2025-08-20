// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import TutorsScreen from "./src/screens/TutorsScreen";
import ChatScreen from "./src/screens/ChatScreen";

export type RootStackParamList = {
  Home: undefined;
  Tutors: { skillId: number; skillName: string };
  Chat: { tutorId: number; tutorName: string; prefill?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tutors" component={TutorsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
