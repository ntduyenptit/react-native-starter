import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  UIManager,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import reject from 'lodash/reject';
import find from 'lodash/find';
import get from 'lodash/get';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { ScrollView } from 'react-native-gesture-handler';
import styles, { colorPack } from './styles';
import nodeTypes from './helpers/nodeTypes';

// set UIManager LayoutAnimationEnabledExperimental
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const defaultSearchIcon = (
  <Icon
    name="search"
    size={15}
    color={colorPack.black}
    style={{ marginRight: 10 }}
  />
);

export default class MultiSelect extends Component {
  static propTypes = {
    isTree: PropTypes.bool,
    subChildContainerStyle: ViewPropTypes.style,
    single: PropTypes.bool,
    selectedItems: PropTypes.array,
    items: PropTypes.array.isRequired,
    uniqueKey: PropTypes.string,
    tagBorderColor: PropTypes.string,
    tagTextColor: PropTypes.string,
    tagContainerStyle: ViewPropTypes.style,
    fontFamily: PropTypes.string,
    tagRemoveIconColor: PropTypes.string,
    onSelectedItemsChange: PropTypes.func.isRequired,
    selectedItemFontFamily: PropTypes.string,
    selectedItemTextColor: PropTypes.string,
    itemFontFamily: PropTypes.string,
    itemTextColor: PropTypes.string,
    itemFontSize: PropTypes.number,
    selectedItemIconColor: PropTypes.string,
    searchIcon: nodeTypes,
    searchInputPlaceholderText: PropTypes.string,
    searchInputStyle: PropTypes.object,
    selectText: PropTypes.string,
    styleDropdownMenu: ViewPropTypes.style,
    styleDropdownMenuSubsection: ViewPropTypes.style,
    styleInputGroup: ViewPropTypes.style,
    styleItemsContainer: ViewPropTypes.style,
    styleListContainer: ViewPropTypes.style,
    styleMainWrapper: ViewPropTypes.style,
    styleRowList: ViewPropTypes.style,
    styleSelectorContainer: ViewPropTypes.style,
    styleTextDropdown: Text.propTypes.style,
    styleTextDropdownSelected: Text.propTypes.style,
    styleTextTag: Text.propTypes.style,
    altFontFamily: PropTypes.string,
    hideSubmitButton: PropTypes.bool,
    hideDropdown: PropTypes.bool,
    submitButtonColor: PropTypes.string,
    submitButtonText: PropTypes.string,
    textColor: PropTypes.string,
    fontSize: PropTypes.number,
    fixedHeight: PropTypes.bool,
    hideTags: PropTypes.bool,
    canAddItems: PropTypes.bool,
    onAddItem: PropTypes.func,
    onChangeInput: PropTypes.func,
    displayKey: PropTypes.string,
    textInputProps: PropTypes.object,
    flatListProps: PropTypes.object,
    filterMethod: PropTypes.string,
    onClearSelector: PropTypes.func,
    onToggleList: PropTypes.func,
    removeSelected: PropTypes.bool
  };

  static defaultProps = {
    single: false,
    isTree: false,
    selectedItems: [],
    uniqueKey: '_id',
    tagBorderColor: colorPack.primary,
    tagTextColor: colorPack.primary,
    fontFamily: '',
    tagRemoveIconColor: colorPack.danger,
    selectedItemFontFamily: '',
    selectedItemTextColor: colorPack.primary,
    searchIcon: defaultSearchIcon,
    itemFontFamily: '',
    itemTextColor: colorPack.textPrimary,
    itemFontSize: 16,
    selectedItemIconColor: colorPack.primary,
    searchInputPlaceholderText: 'Search',
    searchInputStyle: { color: colorPack.textPrimary, borderRadius: 10},
    textColor: colorPack.textPrimary,
    selectText: 'Select',
    altFontFamily: '',
    hideSubmitButton: false,
    submitButtonColor: '#CCC',
    submitButtonText: 'Submit',
    fontSize: 14,
    fixedHeight: false,
    hideTags: false,
    hideDropdown: false,
    onChangeInput: () => { },
    displayKey: 'name',
    canAddItems: false,
    onAddItem: () => { },
    onClearSelector: () => { },
    onToggleList: () => { },
    removeSelected: false
  };

  constructor(props) {
    super(props);
    this.state = {
      selector: false,
      searchTerm: '',
      levelNum: 0,
      listExpanded: [],
    };
  }

  shouldComponentUpdate() {
    // console.log('Component Updating: ', nextProps.selectedItems);
    return true;
  }

  getSelectedItemsExt = optionalSelctedItems => (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}
    >
      {this._displaySelectedItems(optionalSelctedItems)}
    </View>
  );

  _onChangeInput = value => {
    const { onChangeInput } = this.props;
    if (onChangeInput) {
      onChangeInput(value);
    }
    this.setState({ searchTerm: value });
  };

  _getSelectLabel = () => {
    const { selectText, single, selectedItems, displayKey, items } = this.props;
    if (!selectedItems || selectedItems.length === 0 || !selectedItems[0]) {
      return selectText;
    }
    if (single) {
      const item = selectedItems[0];

      const foundItem = this._findItem(items, item);
      return get(foundItem, displayKey) || selectText;
    }
    return `${selectText} (${selectedItems.length} selected)`;
  };

  _findItem = (items, itemKey) => {
    const { uniqueKey } = this.props;
    let data;
    data = find(items, singleItem => singleItem[uniqueKey] === itemKey);
    if (!data) {
      items.forEach(e => {
        if (e.children && e.children.length > 0) {
          const value = this._findItem(e.children, itemKey);
          if (value) {
            data = value;
          }
        }
      })
    }
    return data;
  };
  

  _searchTree = (element, matchingTitle) => {
    if (element.length === 1) {
      return this._searchElement(element, matchingTitle);
    } 
    const list = [];
     element.forEach(e => {
       const result = this._searchElement(e, matchingTitle);
       if (result) {
        list.push(result);
       }
     });
     return list[0][0];
  }

  _searchElement = (element, matchingTitle) => {
    const {
      uniqueKey
    } = this.props;
    if (element[uniqueKey] === matchingTitle) {
      return element;
    } if (element.children != null) {
     return element.children.filter(e => e[uniqueKey] === matchingTitle);
    }
    return null;
  }

  _displaySelectedItems = optionalSelectedItems => {
    const {
      fontFamily,
      tagContainerStyle,
      tagRemoveIconColor,
      tagBorderColor,
      uniqueKey,
      tagTextColor,
      selectedItems,
      displayKey,
      styleTextTag,
      isTree,
      items
    } = this.props;
    const actualSelectedItems = optionalSelectedItems || selectedItems;
    let datas = items;
    if (items.length === 1) {
      datas = items[0];
    }
    if (actualSelectedItems.filter(e => e === '...')) {
      return null;
    }
    return actualSelectedItems.map(singleSelectedItem => {
      const item = isTree ? this._searchTree(datas, singleSelectedItem) : this._findItem(singleSelectedItem);
      if (item) {
        if (!item[displayKey]) return null;
        return (
          <ScrollView style={{ height: 200 }}>
            <View
              style={{
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
            >
              <View
                style={[
              styles.selectedItem,
              {
                width: item[displayKey].length * 8 + 60,
                justifyContent: 'center',
                height: 40,
                borderColor: tagBorderColor
              },
              tagContainerStyle || {}
            ]}
                key={item[uniqueKey]}
              >
                <Text
                  style={[
                {
                  flex: 1,
                  color: tagTextColor,
                  fontSize: 15,
                },
                styleTextTag && styleTextTag,
                fontFamily ? { fontFamily } : {}
              ]}
                  numberOfLines={1}
                >
                  {item[displayKey]}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                this._removeItem(item);
              }}
                >
                  <Icon
                    name="times-circle"
                    style={{
                  color: tagRemoveIconColor,
                  fontSize: 22,
                  marginLeft: 10
                }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
      }
      return null;
    });
  };

  _removeItem = item => {
    const { uniqueKey, selectedItems, onSelectedItemsChange } = this.props;
    const newItems = reject(
      selectedItems,
      singleItem => item[uniqueKey] === singleItem
    );
    // broadcast new selected items state to parent component
    onSelectedItemsChange(newItems);
  };

  _removeAllItems = () => {
    const { onSelectedItemsChange } = this.props;
    // broadcast new selected items state to parent component
    onSelectedItemsChange([]);
  };

  _clearSelector = () => {
    this.setState({
      selector: false
    });
  };

  _clearSelectorCallback = () => {
    const { onClearSelector } = this.props;
    this._clearSelector();
    if (onClearSelector) {
      onClearSelector();
    }
  };

  _toggleSelector = () => {
    const { onToggleList } = this.props;
    this.setState({
      selector: !this.state.selector
    });
    if (onToggleList) {
      onToggleList();
    }
  };

  _clearSearchTerm = () => {
    this.setState({
      searchTerm: ''
    });
  };

  _submitSelection = () => {
    this._toggleSelector();
    // reset searchTerm
    this._clearSearchTerm();
  };

  _itemSelected = item => {
    const { uniqueKey, selectedItems } = this.props;
    return selectedItems.indexOf(item[uniqueKey]) !== -1;
  };

  _addItem = () => {
    const {
      uniqueKey,
      items,
      selectedItems,
      onSelectedItemsChange,
      onAddItem
    } = this.props;
    let newItems = [];
    let newSelectedItems = [];
    const newItemName = this.state.searchTerm;
    if (newItemName) {
      const newItemId = newItemName
        .split(' ')
        .filter(word => word.length)
        .join('-');
      newItems = [...items, { [uniqueKey]: newItemId, name: newItemName }];
      newSelectedItems = [...selectedItems, newItemId];
      onAddItem(newItems);
      onSelectedItemsChange(newSelectedItems);
      this._clearSearchTerm();
    }
  };

  _toggleItem = item => {
    const {
      single,
      uniqueKey,
      selectedItems,
      onSelectedItemsChange,
      isTree,
      displayKey
    } = this.props;
    if (item[displayKey] === '...') {
      // selectedItems.slice(0);
      this._submitSelection();
      onSelectedItemsChange([]);
      return;
    }
    if (single) {
      this._submitSelection();
      onSelectedItemsChange([item[uniqueKey]]);
    } else {
      const status = this._itemSelected(item);
      let newItems = [];
      if (status) {
        if ( isTree && item?.children && item?.children.length > 0) {
          item.children.forEach(e => {
            const index = selectedItems.indexOf(e[uniqueKey]);
            if (index !== -1) {
              selectedItems.splice(index, 1);
            }
          })
        }
        newItems = reject(
          selectedItems,
          singleItem => item[uniqueKey] === singleItem
        );
      } else {
        newItems = [...selectedItems, item[uniqueKey]];
        if (isTree && item?.children && item?.children.length > 0 ) {
          item.children.forEach(e => {
            newItems.push(e[uniqueKey]);
          });
        } else {
          newItems.push[item[uniqueKey]]
        }
      }
      // broadcast new selected items state to parent component
      onSelectedItemsChange(newItems);
    }
  };

  _itemStyle = item => {
    const {
      selectedItemFontFamily,
      selectedItemTextColor,
      itemFontFamily,
      itemTextColor,
      itemFontSize
    } = this.props;
    const isSelected = this._itemSelected(item);
    const fontFamily = {};
    if (isSelected && selectedItemFontFamily) {
      fontFamily.fontFamily = selectedItemFontFamily;
    } else if (!isSelected && itemFontFamily) {
      fontFamily.fontFamily = itemFontFamily;
    }
    const color = isSelected
      ? { color: selectedItemTextColor }
      : { color: itemTextColor };
    return {
      ...fontFamily,
      ...color,
      fontSize: itemFontSize
    };
  };

  // Expand child
  _toggleDropDown = (level) => {
    const { listExpanded } = this.state;
    if (listExpanded.find(a => a === level) === undefined) {
      this.setState({ listExpanded: [...listExpanded, level] });
    } else {
      const array = [...listExpanded]; // make a separate copy of the array
      const index = array.indexOf(level)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ listExpanded: array }, () => {
        });
      }
    }
  }

  _getRow = (item, level) => {
    const { selectedItemIconColor, displayKey, styleRowList } = this.props;
    const { listExpanded } = this.state;
    const { key, children } = item;
    const hasChildren = !!(children && children.length > 0);
    return (
      <TouchableOpacity
        onPress={() => this._toggleItem(item)}
        style={[
          styleRowList && styleRowList,
          { paddingLeft: 20, paddingRight: 20 }
        ]}
      >
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                {
                  flex: 1,
                  fontSize: 16,
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: level * 10
                },
                hasChildren && { fontWeight: "bold" },
                this._itemStyle(item),
                item.disabled ? { color: 'grey' } : {}
              ]}
            >
              {item[displayKey]}
            </Text>
            {this._itemSelected(item) ? (
              <Icon
                name="check"
                style={{
                  fontSize: 20,
                  color: selectedItemIconColor,
                  padding:10,
                }}
              />
            ) : null}
            <TouchableOpacity
              onPress={() => this._toggleDropDown(level)}
            >
              {hasChildren && (
                <Icon
                  name={listExpanded.find(a => a === level) !== undefined ? 'angle-down' : 'angle-right'}
                  style={fixStyles.caretIcon}
                  size={20}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _getRowNew = item => (
    <TouchableOpacity
      disabled={item.disabled}
      onPress={() => this._addItem(item)}
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              {
                flex: 1,
                fontSize: 16,
                paddingTop: 5,
                paddingBottom: 5
              },
              this._itemStyle(item),
              item.disabled ? { color: 'grey' } : {}
            ]}
          >
            Add {item.name} (tap or press return)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  _filterItems = searchTerm => {
    switch (this.props.filterMethod) {
      case 'full':
        return this._filterItemsFull(searchTerm);
      default:
        return this._filterItemsPartial(searchTerm);
    }
  };

  _filterItemsPartial = searchTerm => {
    const { items, displayKey } = this.props;
    const filteredItems = [];
    items.forEach(item => {
      const parts = searchTerm.trim().split(/[ \-:]+/);
      const regex = new RegExp(`(${parts.join('|')})`, 'ig');
      if (regex.test(get(item, displayKey))) {
        filteredItems.push(item);
      }
    });
    return filteredItems;
  };

  _filterItemsPartialTest = (items, searchTerm) => {
    const { displayKey } = this.props;
    const filteredItems = [];
    if (items.length > 0) {
      items.forEach(item => {
        const parts = searchTerm.trim().split(/[ \-:]+/);
        const regex = new RegExp(`(${parts.join('|')})`, 'ig');
        if (regex.test(get(item, displayKey))) {
          filteredItems.push(item);
        }
      });
    } else {
      const parts = searchTerm.trim().split(/[ \-:]+/);
      const regex = new RegExp(`(${parts.join('|')})`, 'ig');
      if (regex.test(get(items, displayKey))) {
        filteredItems.push(items);
      }
    }
    return filteredItems;
  };

  _filterItemsFull = searchTerm => {
    const { items, displayKey } = this.props;
    const filteredItems = [];
    items.forEach(item => {
      if (
        item[displayKey]
          .toLowerCase()
          .indexOf(searchTerm.trim().toLowerCase()) >= 0
      ) {
        filteredItems.push(item);
      }
    });
    return filteredItems;
  };

  _renderTree = (children, level = 0) => {
    if (level > 0 && this.state.levelNum === 0) {
      this.setState({ levelNum: level });
    }
    return children.map((nodeData, index) => {
      const { key, children } = nodeData;
      return (
        <ScrollView
          nestedScrollEnabled
          style={{ height: 'auto' }}
          key={`${key}_${index}`}
        >
          {this._renderNode(nodeData, level)}
          {children && this.state.listExpanded.find(a => a === level) !== undefined && this._renderTree(children, level + 1)}
        </ScrollView>
      );

    })
  }

  _renderNode = (nodeData, level) => {
    if (Object.keys(nodeData).length) {
      return this._getRow(nodeData, level);
    }

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={[
            {
              flex: 1,
              marginTop: 20,
              textAlign: 'center',
              color: colorPack.danger,
              borderRadius: 10,
            },
            fontFamily ? { fontFamily } : {}
          ]}
        >
          No item to display.
        </Text>
      </View>
    );

  }

  _find = (array, searchTerm, listResult, isCallBack = false) => {
    let datas;
    if (array.length === 2) {
      datas = array[1];
    } else {
      datas = array;
    }
    let list = [];
    if (isCallBack) {
      list = listResult;
    }


    if (this._filterItemsPartialTest(datas, searchTerm) !== []) {
      if (this._filterItemsPartialTest(datas, searchTerm).length > 0) {
        list.push(this._filterItemsPartialTest(datas, searchTerm));
      }
    }
    
    if (datas.children) {
      if (datas.children.length > 0) {
        datas.children.forEach(e => {
          this._find(e, searchTerm, list, true);
        })
      }
    }
    return list;
  };

  _renderItems(renderItems) {
    const {
      canAddItems,
      fontFamily,
      styleListContainer,
    } = this.props;
    let component = null;
    // If searchTerm matches an item in the list, we should not add a new
    // element to the list.
    let itemList;
    if (Object.keys(renderItems).length) {
      itemList = (
        this._getRow(renderItems)
        // <FlatList
        //   data={renderItems}
        //   extraData={selectedItems}
        //   keyExtractor={item => item[uniqueKey]}
        //   listKey={item => item[uniqueKey]}
        //   renderItem={this._getRow(renderItems)}
        //   {...flatListProps}
        //   nestedScrollEnabled
        // />
      );
      // searchTermMatch = this._find(items, searchTerm);
      //   console.log('searchInput: ', searchTerm);
      //   console.log('searchItems: ', items);
      //   console.log('searchOutput: ', searchTermMatch);
    } else if (!canAddItems) {
      itemList = (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              {
                flex: 1,
                marginTop: 20,
                textAlign: 'center',
                color: colorPack.danger,
                borderRadius: 10,
              },
              fontFamily ? { fontFamily } : {}
            ]}
          >
            No item to display.
          </Text>
        </View>
      );
    }

    component = (
      <View style={styleListContainer && styleListContainer}>
        {itemList}
      </View>
    );
    return component;
  };

  render() {
    const {
      isTree,
      getCollapsedNodeHeight,
      removeSelected,
      selectedItems,
      single,
      fontFamily,
      altFontFamily,
      searchInputPlaceholderText,
      searchInputStyle,
      styleDropdownMenu,
      styleDropdownMenuSubsection,
      hideSubmitButton,
      hideDropdown,
      submitButtonColor,
      submitButtonText,
      fontSize,
      textColor,
      fixedHeight,
      hideTags,
      textInputProps,
      styleMainWrapper,
      styleInputGroup,
      styleItemsContainer,
      styleSelectorContainer,
      styleTextDropdown,
      styleTextDropdownSelected,
      searchIcon,
      items,
      displayKey,
      uniqueKey
    } = this.props;
    const { searchTerm, selector, levelNum, listExpanded } = this.state;

    let renderItems = searchTerm && !isTree ? this._filterItems(searchTerm) : items;
    if (isTree && searchTerm) {
      const listResult = [];
      this._find(items, searchTerm, listResult).forEach(x => {
        listResult.push(x[0]);
      });
      renderItems = listResult;
      // console.log('renderItems_isTree :', renderItems);
    }

    if (renderItems.length > 0 && renderItems[0][displayKey]!== '...') {
      const all = {
        id: 0,
        [displayKey]: '...'
      };
  
      renderItems.unshift(all);
    }

    // Filtering already selected items
    if (removeSelected) {
      renderItems = renderItems.filter(
        item => !selectedItems.includes(item[uniqueKey])
      );
    }
    return (
      <View
        style={[
          {
            flexDirection: 'column'
          } &&
          styleMainWrapper &&
          styleMainWrapper
        ]}
      >
        {selector ? (
          <View
            style={[
              styles.selectorView(fixedHeight),
              styleSelectorContainer && styleSelectorContainer
            ]}
          >
            <View
              style={[styles.inputGroup, styleInputGroup && styleInputGroup]}
            >
              {searchIcon}
              <TextInput
                autoFocus
                onChangeText={this._onChangeInput}
                onSubmitEditing={this._addItem}
                placeholder={searchInputPlaceholderText}
                placeholderTextColor={colorPack.placeholderTextColor}
                underlineColorAndroid="transparent"
                style={[searchInputStyle, { flex: 1 } ]}
                value={searchTerm}
                {...textInputProps}
              />
              {hideSubmitButton && (
                <TouchableOpacity onPress={this._submitSelection}>
                  <Icon
                    name="angle-down"
                    style={[
                      styles.indicator,
                      { paddingLeft: 15, paddingRight: 15 }
                    ]}
                  />
                </TouchableOpacity>
              )}
              {!hideDropdown && (
                <TouchableOpacity onPress={this._clearSelectorCallback}>
                  <Icon
                    name="times"
                    size={15}
                    color={colorPack.placeholderTextColor}
                    style={[
                      styles.indicator,
                      { paddingLeft: 15, paddingRight: 15 }
                    ]}
                  />
                </TouchableOpacity>

              )}
            </View>
            <View
              style={{
                flexDirection: 'column',
                backgroundColor: '#fafafa'
              }}
            >
              <View style={[styleItemsContainer && styleItemsContainer, levelNum > 0 && listExpanded && !searchTerm && listExpanded.length > 0 && getCollapsedNodeHeight]}>
                {this._renderTree(renderItems)}
              </View>
              {!single && !hideSubmitButton && (
                <TouchableOpacity
                  onPress={() => this._submitSelection()}
                  style={[
                    styles.button,
                    { backgroundColor: submitButtonColor }
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      fontFamily ? { fontFamily } : {}
                    ]}
                  >
                    {submitButtonText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <View>
            <View
              style={[
                styles.dropdownView,
                styleDropdownMenu && styleDropdownMenu
              ]}
            >
              <View
                style={[
                  styles.subSection,
                  { paddingTop: 10, paddingBottom: 10 },
                  styleDropdownMenuSubsection && styleDropdownMenuSubsection
                ]}
              >
                <TouchableWithoutFeedback onPress={this._toggleSelector}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={
                        !selectedItems || selectedItems.length === 0
                          ? [
                            {
                              flex: 1,
                              fontSize: fontSize || 16,
                              color:
                                textColor || colorPack.placeholderTextColor
                            },
                            styleTextDropdown && styleTextDropdown,
                            altFontFamily
                              ? { fontFamily: altFontFamily }
                              : fontFamily
                                ? { fontFamily }
                                : {}
                          ]
                          : [
                            {
                              flex: 1,
                              fontSize: fontSize || 16,
                              color:
                                textColor || colorPack.placeholderTextColor
                            },
                            styleTextDropdownSelected &&
                            styleTextDropdownSelected
                          ]
                      }
                      numberOfLines={1}
                    >
                      {this._getSelectLabel()}
                    </Text>
                    <Icon
                      name={hideSubmitButton ? 'angle-right' : 'angle-down'}
                      style={styles.indicator}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            {!single && !hideTags && selectedItems.length ? 
                  this._displaySelectedItems()
             : null}
          </View>
        )}
      </View>
    );
  }
}

const fixStyles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  icons: {
    paddingLeft: 8,
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    width: 20,
    marginLeft: 6,
    marginRight: 6,
  },
  tochable: {
    flex: 1,
  },
  label: {
    paddingLeft: 0,
  },
  caretIcon: {
    width: 15,
    alignItems:'flex-end'
  },
  chevronIcon: {
    padding: 10,
  },
});
