import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { ListItem, Screen, Text, TextField, Button } from "../components"
import { useStores } from "../models"
import { Todo } from "../models/TodoModel"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"

const $flatListStyle: ViewStyle = {
  paddingHorizontal: spacing.extraSmall,
  backgroundColor: colors.palette.neutral200,
  flex: 1,
  overflow: "scroll",
}

export const DemoTodo: FC<DemoTabScreenProps<"DemoTodo">> = observer(
  function DemoTodo(_props) {
    const { todoStore } = useStores()
    const [newTodo, setNewTodo] = useState<{ name: string, isTaskCompleted: boolean }>(() => ({ name: '', isTaskCompleted: false }))
    
    const flatListData = todoStore.currenTodos.map((item) => item.name.trim())
    console.log(flatListData)
    return (
      <Screen preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <Text>Todo List</Text>
        <Text>Add a new Todo</Text>
        <View>
          <TextField
            value={newTodo.name}
            onChangeText={(e: any) => setNewTodo(() => ({name: e, isTaskCompleted: false}))}
            autoCapitalize="none"
          />
        </View>
        <View style={{ height: 500 }}>
          <FlatList<string>
            data={flatListData}
            style={$flatListStyle}
            renderItem={({ item, index }) => (
              <ListItem
                text={item}
                rightIcon="caretRight"
                TextProps={{ numberOfLines: 1 }}
                topSeparator={index !== 0}
              />
            )}
          />
          <Button
            testID="login-button"
            tx="loginScreen.tapToSignIn"
            preset="reversed"
            onPress={() => todoStore.setCurrentTodos(newTodo as Todo)}
          />
        </View>
      </Screen>
    )
  }
)