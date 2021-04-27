import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions } from "react-native";
import React from 'react';
import { connect } from "react-redux";
import { screens } from '../../api/config';
import { store } from "../../redux/store";
import { hideFilter } from "../../redux/actions/filter.actions";
import QuanLyTaiSanFilterComponent from '../quanlytaisan/filter/QuanLyTaiSanFilter';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

const getFilterView = (screen) => {
  switch (screen) {
    case screens.quan_ly_tai_san:
      return <QuanLyTaiSanFilterComponent />
    case screens.toan_bo_tai_san:
      return <QuanLyTaiSanFilterComponent />
    default:
      return null;
  }
}

const FilterComponent = (props) => (
  <Modal
    animationType="slide"
    transparent
    visible={props.isShowFilter}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}
  >
    <View style={styles.modalView}>
      <View style={styles.underLine}>
        <Text style={styles.titleStyle}>Bộ lọc</Text>
      </View>
      <View style={styles.container}>
        {getFilterView(props.screen)}
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => store.dispatch(hideFilter())}
      >
        <Text style={styles.textStyle}>Xong</Text>
      </Pressable>
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    width: deviceWidth - 100
  },
  modalView: {
    margin: 20,
    marginTop: 95,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: deviceHeight - 200,
  },
  underLine: {
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 0.7,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10,
    color: '#2196F3'
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    color: 'white'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    width: 100,
    backgroundColor: "#2196F3",
  },

});

const mapStateToProps = state => ({
  isShowFilter: state.filterReducer.isShowFilter,
  screen: state.currentScreenReducer.screenName
});

export default connect(mapStateToProps)(FilterComponent);