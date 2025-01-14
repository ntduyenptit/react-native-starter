/* eslint-disable import/no-cycle */
import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import find from 'lodash/find';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { buildTree } from '../../global/Helper';
import { deviceWidth } from '../../global/LoaderComponent';
import { screens, tabs, hinhThucData, trangThaiData, KhaiBaoData } from '../../../api/config';
import { 
  addSelectedDVQLAction,
  addSelectedLTSAction,
  addSelectedMSDAction,
  addSelectedNCCAction,
  addSelectedTTAction,
  addSelectedTTSDAction,
  addSelectedHTAction,
  addSelectedKBAction,

  removeSelectedDVQLAction,
  removeSelectedLTSAction,
  removeSelectedMSDAction,
  removeSelectedNCCAction,
  removeSelectedTTAction,
  removeSelectedTTSDAction,
  removeSelectedHTAction,
  removeSelectedKBAction,
 } from '../../../redux/actions/filter.actions';

const QuanLyTaiSanFilterComponent = (items) => {
  const donViQuanLyRef = useRef();
  const loaiTaiSanRef = useRef();
  const nhaCungCapRef = useRef();
  const maSuDungRef = useRef();
  const hinhThucRef = useRef();
  const trangThaiRef = useRef();
  const khaibaoRef = useRef();

  const dvqlTreeData = buildTree(items.DvqlDataFilter);

  const closeMultiSelectIfOpened = () => {
    if (donViQuanLyRef.current && donViQuanLyRef.current.state.selector) {
      donViQuanLyRef.current._clearSelector();
    };
    if (loaiTaiSanRef.current && loaiTaiSanRef.current.state.selector) {
      loaiTaiSanRef.current._clearSelector();
    }
    if (nhaCungCapRef.current && nhaCungCapRef.current.state.selector) {
      nhaCungCapRef.current._clearSelector();
    };
    if (maSuDungRef.current && maSuDungRef.current.state.selector) {
      maSuDungRef.current._clearSelector();
    };
    if (hinhThucRef.current && hinhThucRef.current.state.selector) {
      hinhThucRef.current._clearSelector();
    };
    if (trangThaiRef.current && trangThaiRef.current.state.selector) {
      trangThaiRef.current._clearSelector();
    };
    if (khaibaoRef.current && khaibaoRef.current.state.selector) {
      khaibaoRef.current._clearSelector();
    };
  }

  // selectedChange
  const onSelectedDVQLChange = (newSelectItems) => {
    items.removeSelectedDVQL({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
    items.addSelectedDVQL({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
  }
  const onSelectedLTSChange = (newSelectItems) => {
    items.removeSelectedLTS({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
    items.addSelectedLTS({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
  }
  const onSelectedNCCChange = (newSelectItems) => {
    items.removeSelectedNCC({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
    items.addSelectedNCC({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
  }
  const onSelectedMSDChange = (newSelectItems) => {
    items.removeSelectedMSD({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
    items.addSelectedMSD({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
  }
  const onSelectedHTChange = (newSelectItems) => {
    items.removeSelectedHT({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
    items.addSelectedHT({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
  }
  const onSelectedTTChange = (newSelectItems) => {
    items.removeSelectedTT({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
    items.addSelectedTT({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
  }

  const onSelectedKBChange = (newSelectItems) => {
    items.removeSelectedKB({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
    items.addSelectedKB({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
  }

  const DvqlFilterSelected = find(items.DvqlFilterSelected, itemSelected => itemSelected.tab === items.tab) 
  && find(items.DvqlFilterSelected, itemSelected => itemSelected.tab === items.tab).data;
  const LtsFilterSelected = find(items.LtsFilterSelected, itemSelected => itemSelected.tab === items.tab) 
  && find(items.LtsFilterSelected, itemSelected => itemSelected.tab === items.tab).data;
  const NccFilterSelected = find(items.NccFilterSelected, itemSelected => itemSelected.tab === items.tab) 
  && find(items.NccFilterSelected, itemSelected => itemSelected.tab === items.tab).data;
  const MsdFilterSelected = find(items.MsdFilterSelected, itemSelected => itemSelected.tab === items.tab) 
  && find(items.MsdFilterSelected, itemSelected => itemSelected.tab === items.tab).data;
  const HtFilterSelected = find(items.HtFilterSelected, itemSelected => itemSelected.tab === items.tab) 
  && find(items.HtFilterSelected, itemSelected => itemSelected.tab === items.tab).data;
  const khaiBaoFilterSelected = find(items.KbFilterSelected, itemSelected => itemSelected.tab === items.tab) 
  && find(items.KbFilterSelected, itemSelected => itemSelected.tab === items.tab).data;
  const TtFilterSelected = find(items.TtFilterSelected, itemSelected => itemSelected.tab === items.tab) 
  && find(items.TtFilterSelected, itemSelected => itemSelected.tab === items.tab).data;

  useEffect(() => {
    renderFilterForEachTab();
  }, [items.tab]);

  const renderFilterForEachTab = () => {
    switch (items.tab) {
      case tabs.toan_bo_tai_san:
        return (
          <View style={styles.container}>
            <View>
              <Text style={styles.titleText}>Đơn vị quản lý</Text>
              <MultiSelect
                ref={donViQuanLyRef}
                isHasSelectAll
                isTree
                getCollapsedNodeHeight={{ height: 200 }}
                onToggleList={() => closeMultiSelectIfOpened()}
                items={dvqlTreeData}
                IconRenderer={Icon}
                searchInputPlaceholderText="Tìm kiếm..."
                styleListContainer={dvqlTreeData && dvqlTreeData.length > 9 ? { height: 200 } : null}
                uniqueKey="id"
                displayKey="displayName"
                selectText="Chọn đơn vị quản lý..."
                onSelectedItemsChange={(item) => onSelectedDVQLChange(item)}
                selectedItems={DvqlFilterSelected}
              />
            </View>
            <View>
              <Text style={styles.titleText}>Loại tài sản</Text>
              <MultiSelect
                ref={loaiTaiSanRef}
                isHasSelectAll
                isTree
                onToggleList={() => closeMultiSelectIfOpened()}
                items={items.LtsDataFilter}
                IconRenderer={Icon}
                styleListContainer={items.LtsDataFilter && items.LtsDataFilter.length > 9 ? { height: 200 } : null}
                single
                searchInputPlaceholderText="Tìm kiếm..."
                uniqueKey="value"
                displayKey="text"
                selectText="Chọn loại tài sản..."
                onSelectedItemsChange={(item) => onSelectedLTSChange(item)}
                selectedItems={LtsFilterSelected}
              />
            </View>
            <View>
              <Text style={styles.titleText}>Nhà cung cấp</Text>
              <MultiSelect
                ref={nhaCungCapRef}
                isHasSelectAll
                onToggleList={() => closeMultiSelectIfOpened()}
                items={items.NccDataFilter}
                IconRenderer={Icon}
                single
                styleListContainer={items.NccDataFilter && items.NccDataFilter.length > 9 ? { height: 200 } : null}
                searchInputPlaceholderText="Tìm kiếm..."
                uniqueKey="id"
                displayKey="displayName"
                selectText="Chọn nhà cung cấp..."
                onSelectedItemsChange={(item) => onSelectedNCCChange(item)}
                selectedItems={NccFilterSelected}
              />
            </View>
            <View>
              <Text style={styles.titleText}>Mã sử dụng</Text>
              <MultiSelect
                ref={maSuDungRef}
                isHasSelectAll
                onToggleList={() => closeMultiSelectIfOpened()}
                items={items.MsdDataFilter}
                IconRenderer={Icon}
                single
                styleListContainer={items.MsdDataFilter && items.MsdDataFilter.length > 9 ? { height: 200 } : null}
                searchInputPlaceholderText="Tìm kiếm..."
                uniqueKey="id"
                displayKey="displayName"
                selectText="Chọn mã sử dụng..."
                onSelectedItemsChange={(item) => onSelectedMSDChange(item)}
                selectedItems={MsdFilterSelected}
              />
            </View>
          </View>
        );
        case tabs.tai_san_chua_su_dung:
          return (
            <View style={styles.container}>
              <View>
                <Text style={styles.titleText}>Đơn vị quản lý</Text>
                <MultiSelect
                  ref={donViQuanLyRef}
                  isHasSelectAll
                  isTree
                  getCollapsedNodeHeight={{ height: 200 }}
                  onToggleList={() => closeMultiSelectIfOpened()}
                  items={dvqlTreeData}
                  IconRenderer={Icon}
                  searchInputPlaceholderText="Tìm kiếm..."
                  styleListContainer={dvqlTreeData && dvqlTreeData.length > 9 ? { height: 200 } : null}
                  uniqueKey="id"
                  displayKey="displayName"
                  selectText="Chọn đơn vị quản lý..."
                  onSelectedItemsChange={(item) => onSelectedDVQLChange(item)}
                  selectedItems={DvqlFilterSelected}
                />
              </View>
              <View>
                <Text style={styles.titleText}>Loại tài sản</Text>
                <MultiSelect
                  ref={loaiTaiSanRef}
                  isHasSelectAll
                  isTree
                  onToggleList={() => closeMultiSelectIfOpened()}
                  items={items.LtsDataFilter}
                  IconRenderer={Icon}
                  styleListContainer={items.LtsDataFilter && items.LtsDataFilter.length > 9 ? { height: 200 } : null}
                  single
                  searchInputPlaceholderText="Tìm kiếm..."
                  uniqueKey="value"
                  displayKey="text"
                  selectText="Chọn loại tài sản..."
                  onSelectedItemsChange={(item) => onSelectedLTSChange(item)}
                  selectedItems={LtsFilterSelected}
                />
              </View>
              <View>
                <Text style={styles.titleText}>Nhà cung cấp</Text>
                <MultiSelect
                  ref={nhaCungCapRef}
                  isHasSelectAll
                  onToggleList={() => closeMultiSelectIfOpened()}
                  items={items.NccDataFilter}
                  IconRenderer={Icon}
                  single
                  styleListContainer={items.NccDataFilter && items.NccDataFilter.length > 9 ? { height: 200 } : null}
                  searchInputPlaceholderText="Tìm kiếm..."
                  uniqueKey="id"
                  displayKey="displayName"
                  selectText="Chọn nhà cung cấp..."
                  onSelectedItemsChange={(item) => onSelectedNCCChange(item)}
                  selectedItems={NccFilterSelected}
                />
              </View>
              <View>
                <Text style={styles.titleText}>Mã sử dụng</Text>
                <MultiSelect
                  ref={maSuDungRef}
                  isHasSelectAll
                  onToggleList={() => closeMultiSelectIfOpened()}
                  items={items.MsdDataFilter}
                  IconRenderer={Icon}
                  single
                  styleListContainer={items.MsdDataFilter && items.MsdDataFilter.length > 9 ? { height: 200 } : null}
                  searchInputPlaceholderText="Tìm kiếm..."
                  uniqueKey="id"
                  displayKey="displayName"
                  selectText="Chọn mã sử dụng..."
                  onSelectedItemsChange={(item) => onSelectedMSDChange(item)}
                  selectedItems={MsdFilterSelected}
                />
              </View>
            </View>
          );
          case tabs.tai_san_dang_su_dung:
            return (
              <View style={styles.container}>
                <View>
                  <Text style={styles.titleText}>Đơn vị quản lý</Text>
                  <MultiSelect
                    ref={donViQuanLyRef}
                    isHasSelectAll
                    isTree
                    getCollapsedNodeHeight={{ height: 200 }}
                    onToggleList={() => closeMultiSelectIfOpened()}
                    items={dvqlTreeData}
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleListContainer={dvqlTreeData && dvqlTreeData.length > 9 ? { height: 200 } : null}
                    uniqueKey="id"
                    displayKey="displayName"
                    selectText="Chọn đơn vị quản lý..."
                    onSelectedItemsChange={(item) => onSelectedDVQLChange(item)}
                    selectedItems={DvqlFilterSelected}
                  />
                </View>
                <View>
                  <Text style={styles.titleText}>Loại tài sản</Text>
                  <MultiSelect
                    ref={loaiTaiSanRef}
                    isHasSelectAll
                    isTree
                    onToggleList={() => closeMultiSelectIfOpened()}
                    items={items.LtsDataFilter}
                    IconRenderer={Icon}
                    styleListContainer={items.LtsDataFilter && items.LtsDataFilter.length > 9 ? { height: 200 } : null}
                    single
                    searchInputPlaceholderText="Tìm kiếm..."
                    uniqueKey="value"
                    displayKey="text"
                    selectText="Chọn loại tài sản..."
                    onSelectedItemsChange={(item) => onSelectedLTSChange(item)}
                    selectedItems={LtsFilterSelected}
                  />
                </View>
                <View>
                  <Text style={styles.titleText}>Nhà cung cấp</Text>
                  <MultiSelect
                    ref={nhaCungCapRef}
                    isHasSelectAll
                    onToggleList={() => closeMultiSelectIfOpened()}
                    items={items.NccDataFilter}
                    IconRenderer={Icon}
                    single
                    styleListContainer={items.NccDataFilter && items.NccDataFilter.length > 9 ? { height: 200 } : null}
                    searchInputPlaceholderText="Tìm kiếm..."
                    uniqueKey="id"
                    displayKey="displayName"
                    selectText="Chọn nhà cung cấp..."
                    onSelectedItemsChange={(item) => onSelectedNCCChange(item)}
                    selectedItems={NccFilterSelected}
                  />
                </View>
                <View>
                  <Text style={styles.titleText}>Mã sử dụng</Text>
                  <MultiSelect
                    ref={maSuDungRef}
                    isHasSelectAll
                    onToggleList={() => closeMultiSelectIfOpened()}
                    items={items.MsdDataFilter}
                    IconRenderer={Icon}
                    single
                    styleListContainer={items.MsdDataFilter && items.MsdDataFilter.length > 9 ? { height: 200 } : null}
                    searchInputPlaceholderText="Tìm kiếm..."
                    uniqueKey="id"
                    displayKey="displayName"
                    selectText="Chọn mã sử dụng..."
                    onSelectedItemsChange={(item) => onSelectedMSDChange(item)}
                    selectedItems={MsdFilterSelected}
                  />
                </View>
              </View>
            );
            case tabs.tai_san_sua_chua_bao_duong:
              return (
                <View style={styles.container}>
                  <View>
                    <Text style={styles.titleText}>Đơn vị quản lý</Text>
                    <MultiSelect
                      ref={donViQuanLyRef}
                      isHasSelectAll
                      isTree
                      getCollapsedNodeHeight={{ height: 200 }}
                      onToggleList={() => closeMultiSelectIfOpened()}
                      items={dvqlTreeData}
                      IconRenderer={Icon}
                      searchInputPlaceholderText="Tìm kiếm..."
                      styleListContainer={dvqlTreeData && dvqlTreeData.length > 9 ? { height: 200 } : null}
                      uniqueKey="id"
                      displayKey="displayName"
                      selectText="Chọn đơn vị quản lý..."
                      onSelectedItemsChange={(item) => onSelectedDVQLChange(item)}
                      selectedItems={DvqlFilterSelected}
                    />
                  </View>
                  <View>
                    <Text style={styles.titleText}>Loại tài sản</Text>
                    <MultiSelect
                      ref={loaiTaiSanRef}
                      isHasSelectAll
                      isTree
                      onToggleList={() => closeMultiSelectIfOpened()}
                      items={items.LtsDataFilter}
                      IconRenderer={Icon}
                      styleListContainer={items.LtsDataFilter && items.LtsDataFilter.length > 9 ? { height: 200 } : null}
                      single
                      searchInputPlaceholderText="Tìm kiếm..."
                      uniqueKey="value"
                      displayKey="text"
                      selectText="Chọn loại tài sản..."
                      onSelectedItemsChange={(item) => onSelectedLTSChange(item)}
                      selectedItems={LtsFilterSelected}
                    />
                  </View>
                  <View>
                    <Text style={styles.titleText}>Nhà cung cấp</Text>
                    <MultiSelect
                      ref={nhaCungCapRef}
                      isHasSelectAll
                      onToggleList={() => closeMultiSelectIfOpened()}
                      items={items.NccDataFilter}
                      IconRenderer={Icon}
                      single
                      styleListContainer={items.NccDataFilter && items.NccDataFilter.length > 9 ? { height: 200 } : null}
                      searchInputPlaceholderText="Tìm kiếm..."
                      uniqueKey="id"
                      displayKey="displayName"
                      selectText="Chọn nhà cung cấp..."
                      onSelectedItemsChange={(item) => onSelectedNCCChange(item)}
                      selectedItems={NccFilterSelected}
                    />
                  </View>
                  <View>
                    <Text style={styles.titleText}>Hình thức</Text>
                    <MultiSelect
                      ref={hinhThucRef}
                      isHasSelectAll
                      onToggleList={() => closeMultiSelectIfOpened()}
                      items={hinhThucData}
                      IconRenderer={Icon}
                      single
                      searchInputPlaceholderText="Tìm kiếm..."
                      uniqueKey="id"
                      displayKey="displayName"
                      selectText="Chọn hình thức..."
                      onSelectedItemsChange={(item) => onSelectedHTChange(item)}
                      selectedItems={HtFilterSelected}
                    />
                  </View>
                  <View>
                    <Text style={styles.titleText}>Trạng thái</Text>
                    <MultiSelect
                      ref={trangThaiRef}
                      isHasSelectAll
                      onToggleList={() => closeMultiSelectIfOpened()}
                      items={trangThaiData}
                      IconRenderer={Icon}
                      single
                      searchInputPlaceholderText="Tìm kiếm..."
                      uniqueKey="id"
                      displayKey="displayName"
                      selectText="Chọn trạng thái..."
                      onSelectedItemsChange={(item) => onSelectedTTChange(item)}
                      selectedItems={TtFilterSelected}
                    />
                  </View>
                </View>
              );
              case tabs.tai_san_mat:
                case tabs.tai_san_hong:
                  case tabs.tai_san_thanh_ly:
                    case tabs.tai_san_huy:
                return(
                  <View style={styles.container}>
                    <View>
                      <Text style={styles.titleText}>Đơn vị quản lý</Text>
                      <MultiSelect
                        ref={donViQuanLyRef}
                        isHasSelectAll
                        isTree
                        getCollapsedNodeHeight={{ height: 200 }}
                        onToggleList={() => closeMultiSelectIfOpened()}
                        items={dvqlTreeData}
                        IconRenderer={Icon}
                        searchInputPlaceholderText="Tìm kiếm..."
                        styleListContainer={dvqlTreeData && dvqlTreeData.length > 9 ? { height: 200 } : null}
                        uniqueKey="id"
                        displayKey="displayName"
                        selectText="Chọn đơn vị quản lý..."
                        onSelectedItemsChange={(item) => onSelectedDVQLChange(item)}
                        selectedItems={DvqlFilterSelected}
                      />
                    </View>
                    <View>
                      <Text style={styles.titleText}>Loại tài sản</Text>
                      <MultiSelect
                        ref={loaiTaiSanRef}
                        isHasSelectAll
                        isTree
                        onToggleList={() => closeMultiSelectIfOpened()}
                        items={items.LtsDataFilter}
                        IconRenderer={Icon}
                        styleListContainer={items.LtsDataFilter && items.LtsDataFilter.length > 9 ? { height: 200 } : null}
                        single
                        searchInputPlaceholderText="Tìm kiếm..."
                        uniqueKey="value"
                        displayKey="text"
                        selectText="Chọn loại tài sản..."
                        onSelectedItemsChange={(item) => onSelectedLTSChange(item)}
                        selectedItems={LtsFilterSelected}
                      />
                    </View>
                    <View>
                      <Text style={styles.titleText}>Nhà cung cấp</Text>
                      <MultiSelect
                        ref={nhaCungCapRef}
                        isHasSelectAll
                        onToggleList={() => closeMultiSelectIfOpened()}
                        items={items.NccDataFilter}
                        IconRenderer={Icon}
                        single
                        styleListContainer={items.NccDataFilter && items.NccDataFilter.length > 9 ? { height: 200 } : null}
                        searchInputPlaceholderText="Tìm kiếm..."
                        uniqueKey="id"
                        displayKey="displayName"
                        selectText="Chọn nhà cung cấp..."
                        onSelectedItemsChange={(item) => onSelectedNCCChange(item)}
                        selectedItems={NccFilterSelected}
                      />
                    </View>
                  </View>
                );
                case tabs.bao_hong_mat_tai_san:
                  return(
                    <View style={styles.container}>
                      <View>
                        <Text style={styles.titleText}>{tabs.bao_hong_mat_tai_san ? `Đơn vị khai báo` : `Đơn vị quản lý`}</Text>
                        <MultiSelect
                          ref={donViQuanLyRef}
                          isHasSelectAll
                          isTree
                          getCollapsedNodeHeight={{ height: 200 }}
                          onToggleList={() => closeMultiSelectIfOpened()}
                          items={dvqlTreeData}
                          IconRenderer={Icon}
                          searchInputPlaceholderText="Tìm kiếm..."
                          styleListContainer={dvqlTreeData && dvqlTreeData.length > 9 ? { height: 200 } : null}
                          uniqueKey="id"
                          displayKey="displayName"
                          selectText="Chọn đơn vị quản lý..."
                          onSelectedItemsChange={(item) => onSelectedDVQLChange(item)}
                          selectedItems={DvqlFilterSelected}
                        />
                      </View>
                      <View>
                        <Text style={styles.titleText}>Khai báo</Text>
                        <MultiSelect
                          isHasSelectAll
                          ref={khaibaoRef}
                          onToggleList={() => closeMultiSelectIfOpened()}
                          items={KhaiBaoData}
                          IconRenderer={Icon}
                          single
                          searchInputPlaceholderText="Tìm kiếm..."
                          uniqueKey="id"
                          displayKey="displayName"
                          selectText="Chọn khai báo..."
                          onSelectedItemsChange={(item) => onSelectedKBChange(item)}
                          selectedItems={khaiBaoFilterSelected}
                        />
                      </View>
                    </View>
                  );
                  default:
                    return null;
    }
  }

  // end SelectedChange
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {renderFilterForEachTab()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    width: deviceWidth - 100
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: -10,
    padding: 10,
  },
  component: {

  }

});

const mapStateToProps = state => ({
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  LtsDataFilter: state.filterLTSDataReducer.ltsDataFilter,
  NccDataFilter: state.filterNCCDataReducer.nccDataFilter,
  MsdDataFilter: state.filterMSDDataReducer.msdDataFilter,
  tab: state.currentTabReducer.tabName,

  DvqlFilterSelected: state.filterDVQLSelectedReducer.dvqlFilterSelected,
  LtsFilterSelected: state.filterLTSSelectedReducer.ltsFilterSelected,
  MsdFilterSelected: state.filterMSDSelectedReducer.msdFilterSelected,
  TtFilterSelected: state.filterTTSelectedReducer.ttFilterSelected,
  NccFilterSelected: state.filterNCCSelectedReducer.nccFilterSelected,
  TtsdFilterSelected: state.filterTTSDSelectedReducer.ttsdFilterSelected,
  HtFilterSelected: state.filterHTSelectedReducer.htFilterSelected,
  KbFilterSelected: state.filterKBSelectedReducer.kbFilterSelected,
});

function mapDispatchToProps(dispatch) {
  return {
    addSelectedDVQL: (item) => dispatch(addSelectedDVQLAction(item)),
    addSelectedLTS: (item) => dispatch(addSelectedLTSAction(item)),
    addSelectedMSD: (item) => dispatch(addSelectedMSDAction(item)),
    addSelectedNCC: (item) => dispatch(addSelectedNCCAction(item)),
    addSelectedTT: (item) => dispatch(addSelectedTTAction(item)),
    addSelectedTTSD: (item) => dispatch(addSelectedTTSDAction(item)),
    addSelectedHT: (item) => dispatch(addSelectedHTAction(item)),
    addSelectedKB: (item) => dispatch(addSelectedKBAction(item)),

    removeSelectedDVQL: (item) => dispatch(removeSelectedDVQLAction(item)),
    removeSelectedLTS: (item) => dispatch(removeSelectedLTSAction(item)),
    removeSelectedMSD: (item) => dispatch(removeSelectedMSDAction(item)),
    removeSelectedNCC: (item) => dispatch(removeSelectedNCCAction(item)),
    removeSelectedTT: (item) => dispatch(removeSelectedTTAction(item)),
    removeSelectedTTSD: (item) => dispatch(removeSelectedTTSDAction(item)),
    removeSelectedHT: (item) => dispatch(removeSelectedHTAction(item)),
    removeSelectedKB: (item) => dispatch(removeSelectedKBAction(item)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyTaiSanFilterComponent);