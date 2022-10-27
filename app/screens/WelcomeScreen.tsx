import { observer } from "mobx-react-lite"
import React, {
  FC,
  useLayoutEffect, // @demo remove-current-line
} from "react"
import { FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Button, // @demo remove-current-line
  Header, ListItem, // @demo remove-current-line
  Text,
} from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { colors, spacing } from "../theme"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {} // @demo remove-current-line

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props, // @demo remove-current-line
) {
  // @demo remove-block-start
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  function goNext() {
    navigation.navigate("Users")
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header rightTx="common.logOut" onRightPress={logout} />,
    })
  }, [])
  // @demo remove-block-end
  const someUser = "Jose Lora"
  const text = `Hola, ${someUser}`
  const balance = `Balance: 50 USD`
  const movements = ['Withdraw: 50.00', 'Deposit: 3000.00', 'Tax: 1']

  return (
    <View style={$container}>
      <View style={$topContainer}>
        {/* <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" /> */}
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          text={text}
          preset="heading"
        />
        <Text
          testID="blanace"
          style={$welcomeHeading}
          text={balance}
          preset="subheading"
        />
        <View style={{ paddingTop: spacing.large}}>
          <Button
            testID="next-screen-button"
            preset="reversed"
            text="Enviar"
            onPress={goNext}
          />
        </View>
        {/* <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" /> */}
      </View>
      <SafeAreaView style={$bottomContainer} edges={["bottom"]}>
        <View style={{paddingHorizontal: spacing.large,}}>
          <Text
            testID="blanace"
            style={$welcomeHeading}
            text="Movimientos"
            preset="subheading"
          />
        </View>
        <View style={$bottomContentContainer}>
          <FlatList<string>
            data={movements}
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
        </View>
      </SafeAreaView>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 0,
  flexGrow: 0,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.background,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
}

const $bottomContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}

const $flatListStyle: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
  overflow: "scroll",
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.small,
}
