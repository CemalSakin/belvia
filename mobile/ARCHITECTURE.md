# Belvia architecture

Expo SDK 51 managed. React Native 0.74. TypeScript strict. Expo Router v3. NativeWind v4.

Rules in force:
- no `any`
- `Platform.select` only for OS splits (shadow vs elevation, maps scheme)
- `useSafeAreaInsets` on chrome and tab bar
- FlashList + `estimatedItemSize` for schedule/bag/places/tickets
- Pressable + haptics, iOS `active:opacity-70`, Android ripple
- Zustand persist on device, no server
- Discriminated `AsyncState<T>` ready for later server state
