import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export const styles = StyleSheet.create({


  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },

  containerProfile : {
    flexDirection:"row"
  },
  
  cont :{
    flex: 1,
    flexDirection: 'column',
  },

 

  containerSafe : {
    flex: 1,
    marginTop: Constants.statusBarHeight
    },

    scrollView: {
      backgroundColor: '#f2f2f2',
      
  },

  text: {
   
    fontSize : 25,
    textAlign: "center", 
    color : '#e85050',
    fontWeight :'bold'
},

categorie:{
  color : 'black',
  fontSize:30,
  fontWeight: "bold",
  alignItems: 'center',
  marginTop : 60
},

viewPokemons: {
  marginTop : 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'black',
    padding:10,
    // justifyContent:'space-between',
 
},

  inputStyle: {
    height: 40,
    width: 200,
    textAlign: 'center',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: 'white',
    marginBottom: 20,
    borderRadius: 30,
    borderBottomWidth: 1,

  },

  case : {
    
  backgroundColor : '#d4d4d4',
  borderWidth: 1,
  borderColor: 'white',
  borderRadius: 10,
  borderBottomWidth: 1,
  alignSelf:'stretch',
  justifyContent:'center',
  marginBottom: 20
  },

  star:{
    width: 30,
    height : 30,
    marginLeft :10
    
  },

  pokeball:{
    width: 30,
    height : 30,
  },



  textPrincipal:{
    color : "white",
    textAlign: "center",
    fontSize : 25,
    marginTop : 10,
    fontWeight: "bold",

  },


  contentPrincipal:{
 
    padding : 20,
    fontSize: 15,
    fontWeight: "bold",
  
  },

  contentColum:{
    flexDirection:'row',
    marginLeft : 50
  },

  buttonStyle:{
  marginBottom:10,
  },

});

