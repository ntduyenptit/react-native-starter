export const TOANBOTAISAN = '[TOANBOTAISAN]'
export const TOANBOTAISAN_LOADING = `${TOANBOTAISAN} is loading`
export const TOANBOTAISAN_DATA = `${TOANBOTAISAN} Set toanbotaisan data to store`
export const TOANBOTAISAN_FAILED = `${TOANBOTAISAN} Get toanbotaisan data failed`

export const TAISANMAT = '[TAISANMAT]'
export const TAISANMAT_LOADING = `${TAISANMAT} is loading`
export const TAISANMAT_DATA = `${TAISANMAT} Set taisanmat data to store`
export const TAISANMAT_FAILED = `${TAISANMAT} Get taisanmat data failed`

export const TAISANHONG = '[TAISANHONG]'
export const TAISANHONG_LOADING = `${TAISANHONG} is loading`
export const TAISANHONG_DATA = `${TAISANHONG} Set taisanhong data to store`
export const TAISANHONG_FAILED = `${TAISANHONG} Get taisanhong data failed`

export const TAISANTHANHLY = '[TAISANTHANHLY]'
export const TAISANTHANHLY_LOADING = `${TAISANTHANHLY} is loading`
export const TAISANTHANHLY_DATA = `${TAISANTHANHLY} Set taisanthanhly data to store`
export const TAISANTHANHLY_FAILED = `${TAISANTHANHLY} Get taisanthanhly data failed`

export const TAISANDANGSUDUNG = '[TAISANDANGSUDUNG]'
export const TAISANDANGSUDUNG_LOADING = `${TAISANDANGSUDUNG} is loading`
export const TAISANDANGSUDUNG_DATA = `${TAISANDANGSUDUNG} Set taisandangsudung data to store`
export const TAISANDANGSUDUNG_FAILED = `${TAISANDANGSUDUNG} Get taisandangsudung data failed`

export const TAISANCHUASUDUNG = '[TAISANCHUASUDUNG]'
export const TAISANCHUASUDUNG_LOADING = `${TAISANCHUASUDUNG} is loading`
export const TAISANCHUASUDUNG_DATA = `${TAISANCHUASUDUNG} Set taisanchuasudung data to store`
export const TAISANCHUASUDUNG_FAILED = `${TAISANCHUASUDUNG} Get taisanchuasudung data failed`
// toàn bộ tài sản
export const toanbotaisanLoading = () => ({
    type: TOANBOTAISAN_LOADING,
    payload: {},
})

export const toanbotaisanGetData = (data) => ({
    type: TOANBOTAISAN_DATA,
    payload: {
        data
    },
})

export const toanbotaisanFailed = () => ({
    type: TOANBOTAISAN_FAILED,
    payload: {},
})

// tài sản hỏng
export const taisanhongLoading = () => ({
    type: TAISANHONG_LOADING,
    payload: {},
})

export const taisanhongGetData = (data) => ({
    type: TAISANHONG_DATA,
    payload: {
        data
    },
})

export const taisanhongFailed = () => ({
    type: TAISANHONG_FAILED,
    payload: {},
})

// tài sản mất
export const taisanmatLoading = () => ({
    type: TAISANMAT_LOADING,
    payload: {},
})

export const taisanmatGetData = (data) => ({
    type: TAISANMAT_DATA,
    payload: {
        data
    },
})

export const taisanmatFailed = () => ({
    type: TAISANMAT_FAILED,
    payload: {},
})

// tài sản thanh lý
export const taisanthanhlyLoading = () => ({
    type: TAISANTHANHLY_LOADING,
    payload: {},
})

export const taisanthanhlyGetData = (data) => ({
    type: TAISANTHANHLY_DATA,
    payload: {
        data
    },
})

export const taisanthanhlyFailed = () => ({
    type: TAISANTHANHLY_FAILED,
    payload: {},
})

// tài sản đang sử dụng
export const taisandangsudungLoading = () => ({
    type: TAISANDANGSUDUNG_LOADING,
    payload: {},
})

export const taisandangsudungGetData = (data) => ({
    type: TAISANDANGSUDUNG_DATA,
    payload: {
        data
    },
})

export const taisandangsudungFailed = () => ({
    type: TAISANDANGSUDUNG_FAILED,
    payload: {},
})

// tài sản chưa sử dụng
export const taisanchuasudungLoading = () => ({
    type: TAISANCHUASUDUNG_LOADING,
    payload: {},
})

export const taisanchuasudungGetData = (data) => ({
    type: TAISANCHUASUDUNG_DATA,
    payload: {
        data
    },
})

export const taisanchuasudungFailed = () => ({
    type: TAISANCHUASUDUNG_FAILED,
    payload: {},
})