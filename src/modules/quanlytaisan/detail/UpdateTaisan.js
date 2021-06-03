/* eslint-disable import/no-cycle */
import React from 'react';
import moment from 'moment';
import { 
    Animated, 
    SafeAreaView, 
    StatusBar, 
    Text, 
    StyleSheet, 
    View, 
    TextInput, 
    Image, 
    TouchableOpacity, 
    FlatList,
    Alert,
    Platform,
    ImageBackground,
    TouchableHighlight
 } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { endPoint } from '../../../api/config';
import { convertDateToIOSString, addYearToDate, getLinkFile } from '../../global/Helper';
import { createGetMethod, createPostMethodWithToken, createPostMultiFiles } from '../../../api/Apis';
import { colors, fonts } from '../../../styles';
import { deviceWidth } from '../../global/LoaderComponent';

class UpdateTaisanScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollYValue: new Animated.Value(0),
            tenTS: '',
            loaiTaisan: '',
            SN: '',
            PN: '',
            hangSx: '',
            nguyenGia: '',
            nguonKinhphiList: [],
            ngayMua: '',
            ngayHetBh: '',
            ngayHetSd: '',
            maSudung: '',
            maSudungList: [],
            nhaCungcap: '',
            trichKhauhao: '',
            imageList: [],
            loaiTSList: [],
            nhaCCList: [],
        };
        this.chosenPicker = this.chosenPicker.bind(this)
    }

    componentDidMount() {
        this.props.navigation.setOptions({headerRight: () => (
          <TouchableOpacity
            onPress={() => this.saveNewTaiSan()}
            style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }
                }
          >
            <View style={{ marginLeft: 15, backgroundColor: 'transparent' }}>
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
            )})
        Promise.all([
            this.danhsachLoaiTS(this.props.LoaiTSData),
            this.danhsachNhaCC(this.props.NhaCCData),
            this.danhsachMaSD(this.props.MaSuDungData),
            this.getNguonKinhPhi()
        ]);
    }

    getNguonKinhPhi() {
        const url = `${endPoint.getAllNguonKinhPhi}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    const list = res.result.map(e => ({
                        label: e.displayName,
                        value: e.id 
                    }));
                    this.setState({
                        nguonKinhphiList: list,
                    });
                }
            })
    }

    chosenPicker = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            compressImageMaxHeight: 400,
            compressImageMaxWidth: 400,
            multiple: true
        }).then(images => {
            // console.log(images);
            if (images && images.length < 4) {
                if (Platform.OS === 'ios') {
                    this.setState({
                        imageList: images.map(e => ({
                            tenFile: e.path.split('/').pop() || moment().toString(),
                            linkFile: e.sourceURL,
                            path: e.path,
                            mime: e.mime,
                        }))
                    });
                } else {
                    this.setState({
                        imageList: images.map(e => ({
                            tenFile: e.path.split('/').pop(),
                            linkFile: e.path,
                        }))
                    });
                }
            }
        });
    }

    saveNewTaiSan() {
        const { 
            maSudung, 
            hangSx, 
            imageList, 
            loaiTaisan,
            ngayHetBh,
            nguonKinhphi,
            nguyenGia,
            nhaCungcap,
            PN,
            SN,
            tenTS,
            trichKhauhao,
            ngayHetSd,
            ngayMua
         } = this.state;
        const url = `${endPoint.TsAllCreateOrEdit}`;
        const urlUpload = `${endPoint.ToanBoTSUpload}`;

        let s = '';
        let check = false;
        switch ("") {
            case tenTS:
                {
                    s = "tên tài sản";
                    check = true;
                    break;
                }
            case loaiTaisan: {
                s = "loại tài sản";
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
        // eslint-disable-next-line no-undef
        const fromData = new FormData();

            imageList.forEach((e, index) => {
                fromData.append(`${index + 1}`, { type: e.mime, uri: e.path, name: e.tenFile })
            });
            
            if (imageList.length > 0) {
                createPostMultiFiles(urlUpload, fromData).then((res) => {
                    if (res.success) {
                        const images = imageList.map(e => ({
                                tenFile: e.tenFile,
                                linkFile: getLinkFile(res, e.tenFile)
                            }));
                        const params  = {
                            dropdownMultiple: maSudung,
                            ghiChu: "",
                            giaCuoiTS: "",
                            hangSanXuat: hangSx,
                            listFile: [],
                            listHA: images,
                            loaiTS: loaiTaisan[0],
                            ngayBaoHanh: ngayHetBh && convertDateToIOSString(ngayHetBh),
                            hanSD: ngayHetSd && convertDateToIOSString(ngayHetSd),
                            ngayMua: ngayMua && convertDateToIOSString(ngayMua),
                            nguonKinhPhiId: nguonKinhphi,
                            nguyenGia,
                            nhaCC: nhaCungcap,
                            noiDungChotGia: "",
                            productNumber: PN,
                            serialNumber: SN,
                            tenTS,
                            thoiGianChietKhauHao: trichKhauhao
                        }
        
                        createPostMethodWithToken(url, JSON.stringify(params)).then((result) => {
                            if (result.success) {
                                Alert.alert('Thêm mới tài sản thành công',
                                '',
                                [
                                    {text: 'OK', onPress: this.goBack()},
                                ],
                                { cancelable: false }
                                );
                            }
                        })
                    }
                });
            } else {
                const params  = {
                    dropdownMultiple: maSudung,
                    ghiChu: "",
                    giaCuoiTS: "",
                    hangSanXuat: hangSx,
                    listFile: [],
                    listHA: [],
                    loaiTS: loaiTaisan[0],
                    ngayBaoHanh: ngayHetBh && convertDateToIOSString(ngayHetBh),
                    hanSD: ngayHetSd && convertDateToIOSString(ngayHetSd),
                    ngayMua: ngayMua && convertDateToIOSString(ngayMua),
                    nguonKinhPhiId: nguonKinhphi,
                    nguyenGia,
                    nhaCC: nhaCungcap,
                    noiDungChotGia: "",
                    productNumber: PN,
                    serialNumber: SN,
                    tenTS,
                    thoiGianChietKhauHao: trichKhauhao
                }
                createPostMethodWithToken(url, JSON.stringify(params)).then((result) => {
                    if (result.success) {
                        Alert.alert('Thêm mới tài sản thành công',
                        '',
                        [
                            {text: 'OK', onPress: this.goBack()},
                        ],
                        { cancelable: false }
                        );
                    }
                })
            }


    }

    goBack() {
        const { navigation, route } = this.props;
        route.params.onGoBack();
        navigation.goBack();
    }

    danhsachMaSD(data) {
        if (data) {
            const list = data.map(e => ({
                label: e.displayName,
                value: e.id,
            }));
            this.setState({
                maSudungList: list,
            });
        }
    }

    danhsachLoaiTS(data) {
        if (data) {
            const list = data.map(e => ({
                label: e.text,
                value: e.value,
            }));
            this.setState({
                loaiTSList: list,
            });
        }
    };

    danhsachNhaCC(data) {
        if (data) {
            const list = data.map(e => ({
                label: e.displayName,
                value: e.id,
            }));
            this.setState({
                nhaCCList: list,
            });
        }
    };

    render() {
        const {
            scrollYValue,
            imageList,
            trichKhauhao,
            loaiTaisan,
            nguonKinhphi,
            ngayMua,
            ngayHetBh,
            ngayHetSd,
            maSudungList,
            maSudung,
            loaiTSList,
            nhaCCList,
            nhaCungcap,
            nguonKinhphiList,
        } = this.state;
        const placeholder = {
            label: 'Chọn ...',
            value: null,
            color: '#9EA0A4',
        };
        const {item} = this.props.route.params;
        return (
          <Animated.View>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                            margin: 10,
                            paddingBottom: 15,
                        }}
                contentContainerStyle={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            paddingBottom: 55,
                        }}
                onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
                            { useNativeDriver: true },
                            () => { },          // Optional async listener
                        )}
                contentInsetAdjustmentBehavior="automatic"
              >
                <View style={styles.container}>
                  <Text style={styles.boldText}>Tên tài sản*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder={item.tenTS}
                    style={styles.bordered}
                    onChangeText={(tenTS) => {
                                    this.setState({
                                        tenTS,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Loại tài sản*</Text>
                  <MultiSelect
                    single
                    items={this.props.LoaiTSData}
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleDropdownMenuSubsection={[styles.searchText, styles.bordered]}
                    uniqueKey="value"
                    displayKey="text"
                    selectText={item.loaiTS}
                    onSelectedItemsChange={(item) => this.setState({
                                        loaiTaisan: item,
                                    })}
                    selectedItems={loaiTaisan}
                  />

                  <Text style={styles.boldText}>S/N (Serial Number)</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder={item.serialNumber}
                    style={styles.bordered}
                    onChangeText={(SN) => {
                                    this.setState({
                                        SN,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>P/N (Product Number)</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder={item.productNumber}
                    style={styles.bordered}
                    onChangeText={(PN) => {
                                    this.setState({
                                        PN,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Nhà cung cấp</Text>
                  <MultiSelect
                    single
                    items={nhaCCList}
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleDropdownMenuSubsection={[styles.searchText, styles.bordered]}
                    uniqueKey="value"
                    displayKey="text"
                    selectText={item.nhaCungCap}
                    onSelectedItemsChange={(item) => this.setState({
                                        nhaCungcap: item,
                                    })}
                    selectedItems={nhaCungcap}
                  />
                  <Text style={styles.boldText}>Hãng sản xuất</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    placeholder={item.productNumber}
                    onChangeText={(hangsx) => {
                                    this.setState({
                                        hangSx: hangsx,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Nguyên giá (VND)</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder={item.nguyenGia}
                    style={styles.bordered}
                    onChangeText={(price) => {
                                    this.setState({
                                        nguyenGia: price,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Ngày mua</Text>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={item.ngayMua} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    borderRadius='15'
                    placeholder="Chọn ngày"
                    format="DD-MM-YYYY"
                    confirmBtnText="Chọn"
                    cancelBtnText="Thoát"
                    customStyles={{
                                    dateIcon: {
                                        // display: 'none',
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: 5,
                                    },
                                }}
                    onDateChange={(date) => {
                                    this.setState({
                                        ngayMua: date,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Ngày hết hạn bảo hành</Text>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={ngayHetBh} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    borderRadius='15'
                    placeholder="Chọn ngày"
                    format="DD-MM-YYYY"
                    confirmBtnText="Chọn"
                    cancelBtnText="Thoát"
                    customStyles={{
                                    dateIcon: {
                                        // display: 'none',
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: 5,
                                    },
                                }}
                    onDateChange={(date) => {
                                    this.setState({
                                        ngayHetBh: date,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Ngày hết hạn sử dụng</Text>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={ngayHetSd} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    borderRadius='15'
                    placeholder="Chọn ngày"
                    format="DD-MM-YYYY"
                    confirmBtnText="Chọn"
                    cancelBtnText="Thoát"
                    customStyles={{
                                    dateIcon: {
                                        // display: 'none',
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: 5,
                                    },
                                }}
                    onDateChange={(date) => {
                                    this.setState({
                                        ngayHetSd: date,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Thời gian trích khấu hao (năm)</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(time) => {
                                    this.setState({
                                        trichKhauhao: time,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Thời gian hết khấu hao</Text>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={addYearToDate(ngayMua, trichKhauhao)} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    borderRadius='15'
                    disabled
                    format="DD-MM-YYYY"
                    confirmBtnText="Chọn"
                    cancelBtnText="Thoát"
                    customStyles={{
                                    dateIcon: {
                                        // display: 'none',
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: 5,
                                    },
                                }}
                  />
                  <Text style={styles.boldText}>Nguồn kinh phí</Text>
                  <RNPickerSelect
                    // placeholder={placeholder}
                    items={nguonKinhphiList}
                    onValueChange={value => {
                                    this.setState({
                                        nguonKinhphi: value,
                                    });
                                }}
                    style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                    value={nguonKinhphi}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: 'yellow' }}
                    Icon={() => <Icon name="caret-down" size={25} color="black" />}
                  />
                  <Text style={styles.boldText}>Mã sử dụng</Text>
                  <RNPickerSelect
                    // placeholder={placeholder}
                    items={maSudungList}
                    onValueChange={(value) => {
                                    this.setState({
                                        maSudung: value,
                                    });
                                }}
                    style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                    value={maSudung}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: 'yellow' }}
                    Icon={() => <Icon name="caret-down" size={25} color="black" />}
                  />
                  <View style={styles.selectContainer}>
                    <Text style={styles.boldText}>Hình ảnh</Text>
                    <TouchableOpacity onPress={this.chosenPicker} style={styles.button}>
                      <Text style={styles.buttonText}> Bấm để chọn ảnh  </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row', flex: 1, paddingLeft: 20, paddingRight: 20 }}>
                    <FlatList
                      data={imageList}
                      keyExtractor={(item) => item.filename}
                      numColumns={3}
                      renderItem={({ item, index }) =>
                                    (
                                      <View style={{padding: 5, flexDirection: 'row'}}>
                                        <Image
                                          key={item.tenFile}
                                          source={{ uri: item.linkFile }}
                                          style={{ width: 100, height: 100, borderRadius: 5 }}
                                        />
                                        <TouchableHighlight
                                          onPress={()=> {
                                              const newImages = [...imageList];
                                              newImages.splice(index, 1);
                                              this.setState({
                                                  imageList: newImages,
                                              });
                                          }}
                                        >
                                          <Icon style={{alignItems: 'flex-end', top: -11, right: -8,  position: 'absolute'}} name="times" color='#DC143C' size={28} />
                                        </TouchableHighlight>
                                      </View>
                                    )}
                    />

                  </View>
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
    searchText: {
        backgroundColor: 'transparent',
        height: 50,
        paddingLeft: 15
    },
    title: {
        alignSelf: 'center',
        fontSize: 18,
        fontStyle: 'italic'
    },
    bordered: {
        borderWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        height: 40,
        marginLeft: 5,
        marginRight: 5
    },
    boldText: {
        fontWeight: 'bold',
        alignItems: 'flex-start',
        padding: 5,
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 10,
        // width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        marginLeft: 5,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 10, // to ensure the text is never behind the icon
    },
});

const mapStateToProps = state => ({
    LoaiTSData: state.filterLTSDataReducer.ltsDataFilter,
    NhaCCData: state.filterNCCDataReducer.nccDataFilter,
    MaSuDungData: state.filterMSDDataReducer.msdDataFilter
});

export default connect(mapStateToProps)(UpdateTaisanScreen);