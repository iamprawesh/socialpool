import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {connect} from 'react-redux';

const AlertModal = ({state}) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View>
      <Button
        title="Show Dialog"
        onPress={() => {
          setVisible(true);
        }}
      />
      {visible && (
        <Dialog
          visible={visible}
          onTouchOutside={() => {
            setVisible(false);
          }}>
          <DialogContent>
            <Text>hello</Text>
          </DialogContent>
        </Dialog>
      )}
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    state,
  };
};
export default connect(mapStateToProps, null)(AlertModal);

const styles = StyleSheet.create({});
