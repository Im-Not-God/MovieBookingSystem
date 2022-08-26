import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Home, GetStarted,SignIn,SignUp,Profile,Search  } from "../screens"
import { COLORS } from "../constants"
import { View } from "react-native";
import { TabIcon } from "../components"
import DeviceStorage from "../database/deviceStorage"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator()

const Tabs = () => {

    const [signInToken,setSignInToken]=React.useState("");
    const [skipToken,setSkipToken]=React.useState("");

    console.log("run tab")

    React.useEffect(()=>{
        getData();
    },[])

    async function getData() {
        console.log("run getData")
      try {
        let value = await AsyncStorage.getItem("signInToken");
        let value2 = await AsyncStorage.getItem("skipToken");
        if (value !== null||value2!==null) {
          setSignInToken(value);
          setSkipToken(value2);
          console.log("signInToken_tabs",value)
          console.log("skipToken_tabs",value2)
        }
      } catch (error) {
        console.log('## ERROR READING ITEM ##: ', error);
      }
    }

    function notGetStarted(){

        if(signInToken=='true'){
            console.log("signIn?",signInToken)
            return Profile
        }
        else{
            console.log("signIn?",signInToken)
            return SignIn
        }
            
    }

    return (
        <Tab.Navigator
            tabBarOptions={{
                labelPosition: "below-icon",
                style: {
                    backgroundColor: COLORS.black,
                    borderTopColor: "transparent",
                    height: 60
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="home"
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Play"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="play-circle"
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="search"
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={signInToken==null?GetStarted:notGetStarted()}
                //component={GetStarted}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="person"
                        />
                    ),
                    tabBarVisible: skipToken=="true"
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;
