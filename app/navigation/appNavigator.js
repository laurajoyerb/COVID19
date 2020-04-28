import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/homeScreen';
import summaryScreen from '../screens/summaryScreen';
import globalScreen from '../screens/globalScreen';
import countryScreen from '../screens/countryScreen';

const AppNavigator = createStackNavigator({
    HomeScreen: { screen: Home },
    SummaryScreen: { screen: summaryScreen },
    GlobalScreen: { screen: globalScreen },
    CountryScreen: { screen: countryScreen },
});

export default createAppContainer(AppNavigator);