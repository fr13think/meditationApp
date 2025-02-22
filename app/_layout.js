// import { Stack } from "expo-router";

// export default function Layout() {
//     return (
//         <Stack>
//             <Stack.Screen name="index" options={{ headerShown: false }} />
//             <Stack.Screen name="meditation-details/MeditationDetails" options={{ headerShown: true }} />
//         </Stack>
//     );
// }
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}
