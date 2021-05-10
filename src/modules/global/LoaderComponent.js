/* eslint-disable import/no-cycle */
import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GetToanBoTaiSanData } from '../quanlytaisan/QuanLyTaiSan';
import { maTaiSan, tenTaiSan } from '../../api/config'

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

function LoaderComponent(array, props, screen) {
  if (array && array.length > 0) {
    let maTaiSanKey;
    let tenTaiSanKey;
    array.forEach((item) => {
      maTaiSan.forEach(e => {
        const mataisan = Object.keys(item).find(x => x === e);
        if (mataisan) {
          maTaiSanKey = mataisan;
        }
      })
      tenTaiSan.forEach(e => {
        const tentaisan = Object.keys(item).find(x => x === e);
        if (tentaisan) {
          tenTaiSanKey = tentaisan;
        }
      })
    })
    const items = () => array.map((item, index) => (
      <View key={`loader-component-${index + 1}`} style={styles.listItem}>
        <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#0080FF' size={15} />
        <View style={styles.infor}>
          <Text numberOfLines={1} style={[{fontWeight: "bold"}, styles.infoText]}>EPC: {item[maTaiSanKey]}</Text>
          <Text numberOfLines={1} style={styles.infoText}>{item[tenTaiSanKey]}</Text>
          <Text numberOfLines={1}>{item.phongBanQL ? item.phongBanQL : item.phongBanQuanLy}</Text>
        </View>
        <TouchableOpacity
          style={{ height: 40, width: 20, alignItems: "flex-end"}}
          onPress={() => props.navigation.navigate(screen, {paramKey: item, tabKey: props.tab})}
        >
          <Icon name="chevron-right" color='#0080FF' size={15} />
        </TouchableOpacity>
      </View>
          )) 

    return (
      <View>{items()}</View>
    );
  }
  return (
    <TouchableOpacity onPress={() => GetToanBoTaiSanData({datas: props.DvqlDataFilter, tab: props.tab})}><Text>Không có dữ liệu</Text></TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    flex: 1,
    width: deviceWidth - 50,
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    height: 95,
  },
  infor: {
    marginLeft: 10,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    height: 50,
    width: "85%",

  },
  infoText: {
    paddingBottom: 3,
    
  }
});

export default LoaderComponent;