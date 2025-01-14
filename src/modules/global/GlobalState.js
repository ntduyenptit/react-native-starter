import { 
  SHOW_FILTER, 
  HIDE_FILTER,

  SHOW_MORE,
  HIDE_MORE,

  DVQL_FILTER, 
  LTS_FILTER, 
  NCC_FILTER, 
  MSD_FILTER, 
  TT_FILTER,
  TTSD_FILTER,
  TINHTHANH_FILTER,
  LVKD_FILTER,

  DVQL_SELECTED_ADD,
  TT_SELECTED_ADD,
  LTS_SELECTED_ADD,
  NCC_SELECTED_ADD,
  MSD_SELECTED_ADD,
  TTSD_SELECTED_ADD,
  HT_SELECTED_ADD,
  KB_SELECTED_ADD,
  STARTDATE_SELECTED_ADD,
  ENDDATE_SELECTED_ADD,
  USER_SEND_NOTI_SELECTED_ADD,
  CHIEU_DI_CHUYEN_SELECTED_ADD,
  PLTS_SELECTED_ADD,
  TTKK_SELECTED_ADD,
  TINHTHANH_SELECTED_ADD,
  QUANHUYEN_SELECTED_ADD,
  LVKD_SELECTED,
  ACTION_SELECTED_ADD,

  DVQL_SELECTED_REMOVE,
  USER_SEND_NOTI_SELECTED_REMOVE,
  TT_SELECTED_REMOVE,
  LTS_SELECTED_REMOVE,
  NCC_SELECTED_REMOVE,
  MSD_SELECTED_REMOVE,
  TTSD_SELECTED_REMOVE,
  HT_SELECTED_REMOVE,
  KB_SELECTED_REMOVE,
  STARTDATE_SELECTED_REMOVE,
  ENDDATE_SELECTED_REMOVE,
  CHIEU_DI_CHUYEN_SELECTED_REMOVE,
  PLTS_SELECTED_REMOVE,
  TTKK_SELECTED_REMOVE,
  TINHTHANH_SELECTED_REMOVE,
  QUANHUYEN_SELECTED_REMOVE,
  ACTION_SELECTED_REMOVE,
 } from '../../redux/actions/filter.actions'
import { screens, tabs } from '../../api/config';
import { CURRENT_SCREEN, CURRENT_TAB } from '../../redux/actions/screen.actions';
import { SEARCH_ADD, SEARCH_REMOVE } from '../../redux/actions/search.actions';

const initialState = {
    isShowFilter: false,
    isShowMore: false,
    screenName: screens.quan_ly_tai_san,
    tabName: tabs.toan_bo_tai_san,
    dvqlDataFilter: [],
    ltsDataFilter: [],
    nccDataFilter: [],
    lvkdDataFilter: [],
    msdDataFilter: [],
    ttDataFilter: [],
    ttsdDataFilter: [],

    dvqlFilterSelected: [],
    ltsFilterSelected: [],
    nccFilterSelected: [],
    kbFilterSelected: [],
    msdFilterSelected: [],
    ttFilterSelected: [],
    ttsdFilterSelected: [],
    startdateFilterSelected: [],
    enddateFilterSelected: [],
    chieuDiChuyenFilterSelected: [],
    pltsFilterSelected: [],
    ttkkFilterSelected: [],
    tinhthanhFilterSelected: [],
    quanhuyenFilterSelected: [],
    actionFilterSelected: [],

    searchData: [],
}

// Reducer

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FILTER: {
      return {
        isShowFilter: true,
      }
    }
    case HIDE_FILTER: {
      return {
        isShowFilter: false
      }
    }
    default: {
      return state
    }
  }
}

export const moreReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MORE: {
      return {
        isShowMore: true,
      }
    }
    case HIDE_MORE: {
      return {
        isShowMore: false
      }
    }
    default: {
      return state;
    }
  }
}

export const currentScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_SCREEN: {
      return {
        screenName: action.payload.screen
      }
    }
    default: {
      return state
    }
  }
}

export const currentTabReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_TAB: {
      return {
        tabName: action.payload.tab
      }
    }
    default: {
      return state
    }
  }
}

// get
export const filterDVQLDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DVQL_FILTER: {
      return {
        dvqlDataFilter: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const filterTTDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case TT_FILTER: {
      return {
        ttDataFiler: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const filterLTSDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LTS_FILTER: {
      return {
        ltsDataFilter: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const filterNCCDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case NCC_FILTER: {
      return {
        nccDataFilter: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const filterLVKDDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LVKD_FILTER: {
      return {
        lvkdDataFilter: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const filterMSDDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case MSD_FILTER: {
      return {
        msdDataFilter: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const filterTTSDDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case TTSD_FILTER: {
      return {
        ttsdDataFilter: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const filterTinhThanhDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case TINHTHANH_FILTER: {
      return {
        tinhthanhDataFilter: action.payload
      }
    }
    default: {
      return state
    }
  }
}

// selected
export const filterDVQLSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case DVQL_SELECTED_ADD: {
      if (action.payload?.data && action.payload?.data.length === 0) {
        return {
          ...state,
          dvqlFilterSelected: [],
        }
      }
      return {
        ...state,
        dvqlFilterSelected: [...state.dvqlFilterSelected, action.payload],
      }
    }
    case DVQL_SELECTED_REMOVE: {
      if (action.payload.screen === screens.quan_ly_tai_san) {
        return {
          ...state,
          dvqlFilterSelected: state.dvqlFilterSelected.filter((item) => item.tab !== action.payload.tab)
        }
      } 
        return {
          ...state,
          dvqlFilterSelected: state.dvqlFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterTTSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case TT_SELECTED_ADD: {
      return {
        ...state,
        ttFilterSelected: [...state.ttFilterSelected, action.payload],
      }
    }
    case TT_SELECTED_REMOVE: {
      if (action.payload.screen === screens.quan_ly_tai_san) {
        return {
          ...state,
          ttFilterSelected: state.ttFilterSelected.filter((item) => item.tab !== action.payload.tab)
        }
      } 
        return {
          ...state,
          ttFilterSelected: state.ttFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}


export const filterLVKDSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case LVKD_SELECTED: {
      return {
        ...state,
        lvkdFilterSelected: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export const filterLTSSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case LTS_SELECTED_ADD: {
      return {
        ...state,
        ltsFilterSelected: [...state.ltsFilterSelected, action.payload]
      }
    }
    case LTS_SELECTED_REMOVE: {
      if (state.ltsFilterSelected !== []) {
        if (action.payload.screen === screens.quan_ly_tai_san) {
          return {
            ...state,
            ltsFilterSelected: state.ltsFilterSelected.filter((item) => item.tab !== action.payload.tab)
          }
        } 
          return {
            ...state,
            ltsFilterSelected: state.ltsFilterSelected.filter((item) => item.screen !== action.payload.screen)
          }
      }
      return state;
    }
    default: {
      return state
    }
  }
}

export const filterNCCSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case NCC_SELECTED_ADD: {
      return {
        ...state,
        nccFilterSelected: [...state.nccFilterSelected, action.payload]
      }
    }
    case NCC_SELECTED_REMOVE: {
      if (action.payload.screen === screens.quan_ly_tai_san) {
        return {
          ...state,
          nccFilterSelected: state.nccFilterSelected.filter((item) => item.tab !== action.payload.tab)
        }
      } 
        return {
          ...state,
          nccFilterSelected: state.nccFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterMSDSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case MSD_SELECTED_ADD: {
      return {
        ...state,
        msdFilterSelected: [...state.msdFilterSelected, action.payload]
      }
    }
    case MSD_SELECTED_REMOVE: {
      if (action.payload.screen === screens.quan_ly_tai_san) {
        return {
          ...state,
          msdFilterSelected: state.msdFilterSelected.filter((item) => item.tab !== action.payload.tab)
        }
      } 
        return {
          ...state,
          msdFilterSelected: state.msdFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterTTSDSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case TTSD_SELECTED_ADD: {
      return {
        ...state,
        ttsdFilterSelected: [...state.ttsdFilterSelected, action.payload]
      }
    }
    case TTSD_SELECTED_REMOVE: {
        return {
          ...state,
          ttsdFilterSelected: state.ttsdFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterTTKKSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case TTKK_SELECTED_ADD: {
      return {
        ...state,
        ttkkFilterSelected: [...state.ttkkFilterSelected, action.payload]
      }
    }
    case TTKK_SELECTED_REMOVE: {
        return {
          ...state,
          ttkkFilterSelected: state.ttkkFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterHTSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case HT_SELECTED_ADD: {
      return {
        ...state,
        htFilterSelected: [...state.htFilterSelected, action.payload]
      }
    }
    case HT_SELECTED_REMOVE: {
      if (action.payload.screen === screens.quan_ly_tai_san) {
        return {
          ...state,
          htFilterSelected: state.htFilterSelected.filter((item) => item.tab !== action.payload.tab)
        }
      } 
        return {
          ...state,
          htFilterSelected: state.htFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterKBSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case KB_SELECTED_ADD: {
      return {
        ...state,
        kbFilterSelected: [...state.kbFilterSelected, action.payload]
      }
    }
    case KB_SELECTED_REMOVE: {
      if (action.payload.screen === screens.quan_ly_tai_san) {
        return {
          ...state,
          kbFilterSelected: state.kbFilterSelected.filter((item) => item.tab !== action.payload.tab)
        }
      } 
        return {
          ...state,
          kbFilterSelected: state.kbFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterStartDateSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case STARTDATE_SELECTED_ADD: {
      return {
        ...state,
        startdateFilterSelected: [...state.startdateFilterSelected, action.payload]
      }
    }
    case STARTDATE_SELECTED_REMOVE: {
        return {
          ...state,
          startdateFilterSelected: state.startdateFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterEndDateSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENDDATE_SELECTED_ADD: {
      return {
        ...state,
        enddateFilterSelected: [...state.enddateFilterSelected, action.payload]
      }
    }
    case ENDDATE_SELECTED_REMOVE: {
        return {
          ...state,
          enddateFilterSelected: state.enddateFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterWhoSendNotiSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SEND_NOTI_SELECTED_ADD: {
      return {
        ...state,
        ngtbFilterSelected: action.payload
      }
    }
    case USER_SEND_NOTI_SELECTED_REMOVE: {
        return {
          ...state,
          ngtbFilterSelected: []
        }
    }
    default: {
      return state
    }
  }
}

export const filterActionSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SELECTED_ADD: {
      return {
        ...state,
        actionFilterSelected: [...state.actionFilterSelected, action.payload]
      }
    }
    case ACTION_SELECTED_REMOVE: {
        return {
          ...state,
          actionFilterSelected: state.actionFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterChieuDiChuyenSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHIEU_DI_CHUYEN_SELECTED_ADD: {
      return {
        ...state,
        chieuDiChuyenFilterSelected: [...state.chieuDiChuyenFilterSelected, action.payload]
      }
    }
    case CHIEU_DI_CHUYEN_SELECTED_REMOVE: {
        return {
          ...state,
          chieuDiChuyenFilterSelected: state.chieuDiChuyenFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterPhanLoaiTaiSanSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLTS_SELECTED_ADD: {
      return {
        ...state,
        pltsFilterSelected: [...state.pltsFilterSelected, action.payload]
      }
    }
    case PLTS_SELECTED_REMOVE: {
        return {
          ...state,
          pltsFilterSelected: state.pltsFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterTinhThanhSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case TINHTHANH_SELECTED_ADD: {
      return {
        ...state,
        tinhthanhFilterSelected: [...state.tinhthanhFilterSelected, action.payload],
      }
    }
    case TINHTHANH_SELECTED_REMOVE: {
        return {
          ...state,
          tinhthanhFilterSelected: state.tinhthanhFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const filterQuanHuyenSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUANHUYEN_SELECTED_ADD: {
      return {
        ...state,
        quanhuyenFilterSelected: [...state.quanhuyenFilterSelected, action.payload],
      }
    }
    case QUANHUYEN_SELECTED_REMOVE: {
        return {
          ...state,
          quanhuyenFilterSelected: state.quanhuyenFilterSelected.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}

export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ADD: {
      return {
        ...state,
        searchData: [...state.searchData, action.payload]
      }
    }
    case SEARCH_REMOVE: {
      if (action.payload.screen === screens.quan_ly_tai_san) {
        return {
          ...state,
          searchData: state.searchData.filter((item) => item.tab !== action.payload.tab)
        }
      } 
        return {
          ...state,
          searchData: state.searchData.filter((item) => item.screen !== action.payload.screen)
        }
    }
    default: {
      return state
    }
  }
}