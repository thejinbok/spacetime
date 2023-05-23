import { StatusBar } from 'expo-status-bar'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { styled } from 'nativewind'

import backgroundBlur from './assets/background-blur.png'
import Stripes from './assets/stripes.svg'
import Logo from './assets/logo.svg'

const StyledStripes = styled(Stripes)

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={backgroundBlur}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      imageStyle={{position: 'absolute', left: '-100%'}}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <Logo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Your time capsule
          </Text>

          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Collect memorable moments from your journey and share (if you like) with the world.
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} className="rounded-full bg-green-500 px-5 py-2">
          <Text className="font-alt text-sm uppercase text-black">Create memory</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Made with 💜 by Jin Bok.
      </Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}
