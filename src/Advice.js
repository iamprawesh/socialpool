// import React from 'react';
// import {StyleSheet, View} from 'react-native';
// import {connect} from 'react-redux';
// import {
//   Modal,
//   Portal,
//   Text,
//   Button,
//   Provider,
//   ActivityIndicator,
// } from 'react-native-paper';

// import axios from 'axios';
// const Advice = () => {
//   const [visible, setVisible] = React.useState(false);

//   const showModal = () => setVisible(true);

//   const hideModal = () => setVisible(false);
//   const fetchData = async () => {
//     console.log(advice);
//     axios
//       .get('https://api.adviceslip.com/advice')
//       .then(({data}) => setAdvice(data.slip.advice))
//       .then(() => setVisible(true));
//   };
//   const clearState = () => {
//     setVisible(false);
//   };
//   return (
//     <Provider>
//       <Portal>
//         <Modal visible={visible} onDismiss={hideModal}>
//           <Text>Example Modal</Text>
//         </Modal>
//         <Button onPress={showModal}>Show</Button>
//       </Portal>
//     </Provider>
//   );
// };

// export default Advice;

// const styles = StyleSheet.create({});
