/* eslint-disable import/no-cycle */
import React from 'react';
import {
    Animated,
    SafeAreaView,
    StatusBar,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { endPoint } from '../../../api/config';
import { createGetMethod, createPostMethodWithToken } from '../../../api/Apis';
import { colors, fonts } from '../../../styles';
import { deviceWidth } from '../../global/LoaderComponent';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { connect } from 'react-redux';
import { buildTree } from '../../global/Helper';

class TaomoiDonviScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maDonvi: '',
            tenDonvi: '',
            donviChaId: '',
            diachiId: '',
            ghiChu: '',
            dvList: [],
            diachiList: [],
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => this.saveNewDonvi()}
                    style={{
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                    }
                    }
                >
                    <View style={{ marginLeft: 15, backgroundColor: 'transparent' }}>
                        {/* <Icon name="save" color="white" size={20} /> */}
                        <Text style={{
                            fontFamily: fonts.primaryRegular,
                            color: colors.white,
                            fontSize: 18,
                            alignSelf: 'center'
                        }}
                        > Lưu
              </Text>

                    </View>
                </TouchableOpacity>
            )
        })
        this.buildTreedvlist(this.props.DvqlData);
        this.getAllVitridialy();
    }
    buildTreedvlist(data) {
        let list = buildTree(data);
        if (list) {
            this.setState({
                dvList: list,
            });
        }
    };

    getAllVitridialy() {
        const url = `${endPoint.getVitriDialy}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    const list = res.result.map(e => ({
                        name: e.displayName,
                        id: e.id
                    }));
                    this.setState({
                        diachiList: list,
                    });
                }
            })
    }

    saveNewDonvi() {
        const {
            maDonvi,
            tenDonvi,
            donviChaId,
            diachiId,
            ghiChu,
            dvList,
            diachiList,
        } = this.state;
        let s = '';
        let check = false;
        switch ("") {
            case maDonvi:
                {
                    s = "mã đơn vị";
                    check = true;
                    break;
                }
            case tenDonvi: {
                s = "tên đơn vị";
                check = true;
                break;
            }
            case donviChaId:
                {
                    s = "đơn vị quản lý";
                    check = true;
                    break;
                }
            case diachiId: {
                s = "địa chỉ";
                check = true;
                break;
            }
        }
        if (check) {
            Alert.alert(
                '',
                'Hãy nhập ' + s,
                [
                    { text: 'OK', style: "cancel" },
                ],

            );
            return;
        }
        const url = `${endPoint.CreatDonvi}`;
        const params = {
            ghiChu: ghiChu,
            maToChuc: maDonvi,
            tenToChuc: tenDonvi,
            trucThuocToChucId: donviChaId[0],
            viTriDiaLyId: diachiId[0],
        }

        createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
            if (res.success) {
                Alert.alert(
                    '',
                    'Thêm mới đơn vị thành công',
                    [
                        { text: 'OK', onPress: this.props.navigation.goBack() },
                    ],

                );

            }
        })
    }

    render() {
        const {
            maDonvi,
            tenDonvi,
            donviChaId,
            diachiId,
            ghiChu,
            dvList,
            diachiList,
        } = this.state;
        return (
            <Animated.View>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <Animated.ScrollView
                    >
                        <View style={styles.container}>
                            <Text style={styles.boldText}>Mã đơn vị*</Text>
                            <TextInput
                                placeholderTextColor="black"
                                placeholder="Nhập tên"
                                style={styles.bordered}
                                onChangeText={(maDonvi) => {
                                    this.setState({
                                        maDonvi,
                                    });
                                }}
                            />
                            <Text style={styles.boldText}>Tên đơn vị*</Text>
                            <TextInput
                                placeholderTextColor="black"
                                style={styles.bordered}
                                onChangeText={(tenDonvi) => {
                                    this.setState({
                                        tenDonvi
                                    });
                                }}
                            />
                            <Text style={styles.boldText}>Đơn vị quản lý</Text>
                            <MultiSelect
                                ref={(component) => { this.multiSelect = component }}
                                getCollapsedNodeHeight={{ height: 200 }}
                                isTree
                                items={dvList}
                                single={true}
                                IconRenderer={Icon}
                                searchInputPlaceholderText="Tìm kiếm..."
                                styleListContainer={dvList && dvList.length > 9 ? { height: 200 } : null}
                                uniqueKey="id"
                                displayKey="displayName"
                                selectText="Chọn ..."
                                onSelectedItemsChange={(donviChaId) => this.setState({
                                    donviChaId
                                })}
                                selectedItems={donviChaId}
                                submitButtonColor="#2196F3"
                            />
                            <Text style={styles.boldText}>Địa chỉ</Text>
                            <MultiSelect
                                ref={(component) => { this.multiSelect = component }}
                                getCollapsedNodeHeight={{ height: 200 }}
                                items={diachiList}
                                single={true}
                                IconRenderer={Icon}
                                searchInputPlaceholderText="Tìm kiếm..."
                                styleListContainer={diachiList && diachiList.length > 9 ? { height: 200 } : null}
                                uniqueKey="id"
                                selectText="Chọn ..."
                                onSelectedItemsChange={(diachiId) => this.setState({
                                    diachiId
                                })}
                                selectedItems={diachiId}
                                submitButtonColor="#2196F3"
                            />

                            <Text style={styles.boldText}>Ghi chú</Text>
                            <TextInput
                                placeholderTextColor="black"
                                style={styles.bordered}
                                onChangeText={(ghiChu) => {
                                    this.setState({
                                        ghiChu
                                    });
                                }}
                            />
                        </View>

                    </Animated.ScrollView>
                </SafeAreaView>

            </Animated.View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerModal: {
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderRadius: 5,
    },
    icon: {
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: deviceWidth,
        paddingBottom: 5,
        paddingLeft: 10
    },
    title: {
        alignSelf: 'center',
        fontSize: 18,
        fontStyle: 'italic'
    },
    bordered: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 20,
        height: 50,
        marginLeft: 5,
    },
    boldText: {
        fontWeight: 'bold',
        alignItems: 'flex-start',
        padding: 10,
    },
    selectContainer: {
        flexDirection: "row",
        padding: 5,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    datePickerStyle: {
        width: '100%',
        marginTop: 0,

    },
    button: {
        width: 150,
        height: 30,
        marginLeft: 50,
        backgroundColor: '#1273DE',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginBottom: 12
    },
    button2: {
        width: 150,
        height: 60,
        backgroundColor: '#1273DE',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        marginBottom: 12
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    }
});
const mapStateToProps = state => ({
    DvqlData: state.filterDVQLDataReducer.dvqlDataFilter,
});
export default connect(mapStateToProps)(TaomoiDonviScreen);