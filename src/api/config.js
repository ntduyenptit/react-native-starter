
// define the api
export const baseUrl = 'http://qlts-server.mobifone.vn/api/';
export const imageBaseUrl = 'http://qlts-server.mobifone.vn/Upload/ToanBoTS';
// export const baseUrl = 'http://10.6.71.64:9080/api/';
// export const imageBaseUrl = 'http://10.6.71.64:9080/Upload/ToanBoTS';
export const headerWithoutToken = ({
  'Content-Type': 'application/json-patch+json',
  Accept: 'text/plain'
});
export const headers = (token) => ({
  Authorization: `Bearer ${token}`, 
  'Content-Type': 'application/json',
  Accept: 'application/json'
});

export const headerContainFiles = () => ({
  'Content-Type': 'multipart/form-data',
});

export const endPoint = ({
  login: 'TokenAuth/Authenticate',
  getuserDangnhap: 'services/app/ToanBoTaiSan/GetUserDangNhap',
  getUserDangNhapPhieuDuTruMuaSam: 'services/app/PhieuDuTruMuaSam/GetUserDangNhap',
  getNguoidung: 'services/app/LookupTable/GetAllNguoiDung?Keyword=',
  // Filter
  getAllToChucTheoNguoiDung: 'services/app/LookupTable/GetAllToChucTheoNguoiDung',
  getAllTrangThaiTaiSan: 'services/app/LookupTable/GetAllTrangThaiTaiSan',
  getAllNhaCungCap: 'services/app/LookupTable/GetAllNhaCungCap',
  getAllTinhTrangMaSuDungTaiSan: 'services/app/LookupTable/GetAllTinhTrangMaSuDungTaiSan',
  getAllTrangThaiSuDung: 'services/app/LookupTable/GetAllTrangThaiTaiSanTimKiem',
  getAllLoaiTaiSanTree: 'services/app/LookupTable/GetAllLoaiTaiSanTree',
  getAllNguonKinhPhi: 'services/app/LookupTable/GetAllNguonKinhPhi',
  getCurrentLoginInformation: 'services/app/Session/GetCurrentLoginInformations',
  getAllHoatDong: 'services/app/LookupTable/GetAllHoatDong',
  // Quản lý tài sản
  getToanBoTaiSan: 'services/app/ToanBoTaiSan/GetAll',
  getTaiSanSuaChuaBaoDuong: 'services/app/TaiSanSuaChuaBaoDuong/GetAllTaiSanSuaChuaBaoDuong',
  getTaiSanThanhLy: 'services/app/TaiSanThanhLy/GetAllTaiSanThanhLy',
  getTaiSanMat: 'services/app/TaiSanMat/GetAllTaiSanMat',
  getTaiSanHong: 'services/app/TaiSanHong/GetAllTaiSanHong',
  getTaiSanChuaSuDung: 'services/app/TaiSanChuaSuDung/GetAll',
  getTaiSanDangSuDung: 'services/app/TaiSanDangSuDung/GetAll',
  getTaiSanHuy: 'services/app/TaiSanHuy/GetAllTaiSanHuy',
  getAllKhaibaoHongmat: 'services/app/KhaiBaoHongMat/GetAllKhaiBaoHongMat',
  // Quản lý đầu đọc 
  getDaudocCodinh: 'services/app/AngTenRFID/GetAll',
  getDaudocDidong: 'services/app/DauDocTheRFID/GetAll',

  // Giám sát tài sản:
  getLichsuRavaoAngten: 'services/app/LichSuRaVaoAngten/GetAll',
  getToanboThietbi:  'services/app/LichSuRaVaoAngten/GetAllTaiSanLa',

  // Kiểm kê tài sản:
  getdanhsachKiemke: 'services/app/KiemKeTaiSan/GetAll',
  getdanhsachUserKiemke: 'services/app/KiemKeTaiSan/GetUserForEdit',
  getAllTaisanKiemke: 'services/app/KiemKeTaiSan/GetAllTaiSan',

  // Dự trù mua sắm:
  getAllPhieuMuasam: 'services/app/PhieuDuTruMuaSam/GetAll',
  getChitietPhieuMuasam: 'services/app/PhieuDuTruMuaSam/GetForEdit',

  // Quản lý cảnh báo:
  getAllDanhsachCanhbao: 'services/app/CanhBao/GetAll',

  // Báo cáo người dùng:
  getAllBaocaoNguoidung: 'services/app/BaoCaoNguoiDung/GetAllBaoCao',
  resetPassword: 'services/app/User/ResetPassword',
  changePassword: 'services/app/LookupTable/ChangePassword',
  // Báo cáo cảnh báo
   getAllBaocaoCanhBao: 'services/app/BaoCaoCanhBao/GetAllBaoCao',

  // Đặt lịch xuất báo cáo:
  getAllLichXuatBaoCao: 'services/app/DatLichXuatBaoCao/GetAllDatLich',
  getChitietLichXuatBaoCao: 'services/app/DatLichXuatBaoCao/GetForEdit',

  // Quản lý nhà cung cấp
  getNhaCungcap: 'services/app/NhaCungCap/GetAll',
  getViewNhacungcap: 'services/app/NhaCungCap/GetForEdit',

  // Lĩnh vực kinh doanh
  getLinhVucKinhDoanh: 'services/app/LookupTable/GetAllLinhVucKinhDoanh',

  // Quản lý vị trí địa lý
  getAllVitriDialy: 'services/app/ViTriDiaLy/GetAll',
  getAllTinhthanh: 'services/app/ViTriDiaLy/GetAllDtoTinhThanh',
  getViewVitriDiaLy: 'services/app/ViTriDiaLy/GetForEdit',
  getChiTietLoaiTaiSan: 'services/app/LoaiTaiSan/GetForEdit',
  getTinhThanhAll: 'services/app/ViTriDiaLy/GetAllDtoTinhThanh',
  getChiTietDonVi: 'services/app/ToChuc/GetForEdit',

  // Quản lý loại tài sản
  getAllLoaiTaiSan: 'services/app/LoaiTaiSan/GetAll',

  // QR code
  getQRCode: 'services/app/LookupTable/GetAssetByQRCode',

  // Quản lý đơn vị
  getAllDonvi:  'services/app/ToChuc/GetAll',

  // Quản lý người dùng
  getAllNguoidung: 'services/app/User/GetAll',
  getTochucNguoidangnhap: 'services/app/LookupTable/GetAllToChucCuaNguoiDangNhapTree',
  getDetailNguoidung: 'services/app/User/GetForEdit',

  // Quản lý phân quyền
  getALLRoleName: 'services/app/Role/GetAll',
  getMailServerEdit: 'services/app/MailServer/GetForEdit',
  getAllPermissions: 'services/app/Role/GetAllPermissions',
  getRoleDetail: 'services/app/Role/GetRoleForEdit',
  // getAllTS
  TsMatgetAll: 'services/app/TaiSanMat/GetAllTaiSan',
  TsHonggetAll: 'services/app/TaiSanHong/GetAllTaiSan',
  TsThanhlygetAll: 'services/app/TaiSanThanhLy/GetAllTaiSan',
  TsHuygetAll: 'services/app/TaiSanHuy/GetAllTaiSan',
  TsSuachuabaoduonggetAll: 'services/app/TaiSanSuaChuaBaoDuong/GetAllTaiSan',

  // getAll vị trí địa lý
  getVitriDialy: 'services/app/LookupTable/GetAllViTriDiaLyLookupTable',
  // getAll tổ chức
  getAllToChuc: 'services/app/ToChuc/GetAllToChucCha',
  // ... bổ sung vào
  getRoleUser: 'services/app/User/GetRoles',
  // Thêm mới
  TsAllCreateOrEdit: 'services/app/ToanBoTaiSan/CreateOrEdit',
  CreateTaiSanMat: 'services/app/TaiSanMat/CreateTaiSanMat',
  CreateTaiSanHong: 'services/app/TaiSanHong/CreateTaiSanHong',
  CreatLichBaocao: 'services/app/DatLichXuatBaoCao/CreateOrEdit',
  CreatNhaCungcap: 'services/app/NhaCungCap/CreateOrEdit',
  CreatVitriDialy: 'services/app/ViTriDiaLy/CreateOrEdit',
  CreatLoaiTaisan: 'services/app/LoaiTaiSan/CreateOrEdit',
  CreatDonvi: 'services/app/ToChuc/CreateOrEdit',
  CreatPhieuMuasam: 'services/app/PhieuDuTruMuaSam/CreateOrEdit',
  // get lĩnh vực kinh doanh
  getAllLinhvucKD : 'services/app/LookupTable/GetAllLinhVucKinhDoanh',
  CreateTaiSanThanhLy: 'services/app/TaiSanThanhLy/CreateTaiSanThanhLy',
  CreateTaiSanSuaChuaBaoDuong: 'services/app/TaiSanSuaChuaBaoDuong/CreateTaiSanSuaChuaBaoDuong',
  CreateTaiSanHuy: 'services/app/TaiSanHuy/CreateTaiSanHuy',
  CreateVaitro:'services/app/Role/Create',
  UpdateVaiTro: 'services/app/Role/Update',
  checkExitVaitro: 'services/app/Role/CheckExist',
  creatReaderdidong: 'services/app/DauDocTheRFID/CreateOrEdit',
  creatReadercodinh: 'services/app/AngTenRFID/CreateOrEdit',
  creatKiemke: 'services/app/KiemKeTaiSan/CreateOrEdit',

  // check exit user
  checkExitUser: 'services/app/User/CheckExist?',
  creatUser: 'services/app/User/Create',
  updateUser: 'services/app/User/Update',
  // Upload
  ToanBoTSUpload: 'Upload/ToanBoTSUpload',
  editTsSuachua: 'services/app/TaiSanSuaChuaBaoDuong/EditTaiSanSuaChuaBaoDuong',
  // get tài sản
  GetTaiSan: 'services/app/ToanBoTaiSan/GetForEdit',
  capphatTS: 'services/app/TaiSanChuaSuDung/CapPhatTaiSan',
  tsHuyHoantac: 'services/app/TaiSanHuy/HoanTacTaiSanHuy',
  tsMatHoantac: 'services/app/TaiSanMat/HoanTacTaiSanMat',
  tsThanhlyHoantac: 'services/app/TaiSanThanhLy/HoanTacTaiSanThanhLy',
  tsHongHoantac: 'services/app/TaiSanHong/HoanTacTaiSanHong',

  getDauDocDiDongEdit :'services/app/DauDocTheRFID/GetForEdit',
  getDauDocCodinhEdit :'services/app/AngTenRFID/GetForEdit',
  // xóa tài sản
  DeleteTaiSan: 'services/app/ToanBoTaiSan/Deleted',
  deleteReaderdidong: 'services/app/DauDocTheRFID/Deleted',
  deleteKiemke: 'services/app/KiemKeTaiSan/Delete',
  deletePhieuMuasam: 'services/app/PhieuDuTruMuaSam/Deleted',
  deleteNhaCC: 'services/app/NhaCungCap/Delete',
  deleteLoaiTs: 'services/app/LoaiTaiSan/Delete',
  deleteUser: 'services/app/User/Delete',
  deleteRole: 'services/app/Role/Delete',
});

// Quản lý màn hình
export const screens = ({
  dash_board: 'Tổng quan',
  quan_ly_tai_san: 'Quản lý tài sản',
  forgot_password: 'Quên mật khẩu',
  // quản lý đầu đọc
  quan_ly_dau_doc: 'Quản lý đầu đọc',
  cap_nhat_dau_doc_di_dong: 'Cập nhật đầu đọc di động',
  cap_nhat_dau_doc_co_dinh: 'Cập nhật đầu đọc cố định',
  quan_ly_dau_doc_di_dong: 'Quản lý đầu đọc di động',
  quan_ly_dau_doc_co_dinh: 'Quản lý đầu đọc cố định',
  giam_sat_tai_san: 'Giám sát tài sản',
  theo_doi_ket_noi_thiet_bi: 'Theo dõi kết nối thiết bị',
  quan_ly_kiem_ke_tai_san: 'Quản lý kiểm kê tài sản',
  quan_ly_du_tru_mua_sam: 'Quản lý dự trù mua sắm',
  quan_ly_canh_bao: 'Quản lý cảnh báo',
  // quản lý danh mục
  quan_ly_danh_muc: 'Quản lý danh mục',
  quan_ly_nha_cung_cap: 'Quản lý nhà cung cấp',
  quan_ly_vi_tri_dia_ly: 'Quản lý vị trí địa lý',
  quan_ly_loai_tai_san: 'Quản lý loại tài sản',
  quan_ly_don_vi: 'Quản lý đơn vị',
  // báo cáo
  bao_cao: 'Báo cáo',
  bao_cao_nguoi_dung: 'Báo cáo người dùng',
  dat_lich_xuat_bao_cao: 'Đặt lịch xuất báo cáo',
  bao_cao_canh_bao: 'Báo cáo cảnh báo',
  bao_cao_thong_tin_thiet_bi_rfid: 'Báo cáo thông tin thiết bị RFID',
  bao_cao_thong_tin_tai_san: 'Báo cáo thông tin tài sản',
  // quản lý hệ thống
  quan_ly_he_thong: 'Quản lý hệ thống',
  quan_ly_nguoi_dung: 'Quản lý người dùng',
  quan_ly_phan_quyen: 'Quản lý phân quyền',
  lich_su_nguoi_dung: 'Lịch sử người dùng',
  quan_ly_mail_server: 'Quản lý Mail, Server',
  // Màn hình chi tiết
  chi_tiet_tai_san: 'Chi tiết tài sản',
  chi_tiet_dau_doc_co_dinh: 'Chi tiết đầu đọc cố định',
  chi_tiet_dau_doc_di_dong: 'Chi tiết đầu đọc di động',
  chi_tiet_kiem_ke_tai_san: 'Chi tiết kiểm kê tài sản',
  chi_tiet_du_tru_mua_sam: 'Chi tiết phiếu mua sắm',
  chi_tiet_lich_xuat_bao_cao: 'Xem cài đặt Báo cáo người dùng',
  chi_tiet_nha_cung_cap: 'Xem chi tiết',
  chi_tiet_nguoi_dung: 'Xem chi tiết người dùng',
  chi_tiet_bao_hongmat_tai_san: 'Xem chi tiết khai báo',
  chi_tiet_vi_tri_dia_ly: 'Xem chi tiết vị trí địa lý',
  chi_tiet_quan_ly_don_vi: 'Xem chi tiết quản lý đơn vị',
  chi_tiet_quan_ly_loai_tai_san: 'Xem chi tiết quản lý loại tài sản',
  chi_tiet_quan_ly_phan_quyen: 'Xem chi tiết quản lý phân quyền',
  // sửa
  cap_nhat_nha_cung_cap: 'Cập nhật nhà cung cấp',
  cap_nhat_vi_tri_dia_ly: 'Cập nhật vị trí địa lý',
  cap_nhat_loai_tai_san: 'Cập nhật loại tài sản',
  cap_nhat_don_vi: 'Cập nhật đơn vị',
  cap_nhat_nguoi_dung: 'Cập nhật người dùng',
  cap_nhat_phan_quyen: 'Cập nhật phân quyền',
  cap_nhat_quan_ly_du_tru_mua_sam: 'Cập nhật quản lý dự trù mua sắm',
  // them moi tai san
  them_moi_tai_san: "Thêm mới tài sản",
  cap_nhat_tai_san: "Cập nhật tài sản",
  khai_bao_tai_san: "Khai báo tài sản",
  them_moi_dau_doc: "Thêm mới đầu đọc",
  them_moi_kiem_ke: "Thêm mới đợt kiểm kê",
  them_moi_du_tru_mua_sam: "Thêm mới",
  them_moi_cai_dat_lich_xuat_bao_cao: "Thêm mới cài đặt",
  them_moi_nha_cung_cap: "Thêm mới nhà cung cấp",
  them_moi_vi_tri_dia_ly: "Thêm mới vị trí địa lý",
  them_moi_loai_tai_san: "Thêm mới loại tài sản",
  them_moi_don_vi: "Thêm mới đơn vị",
  them_moi_nguoi_dung: "Thêm mới người dùng",
  them_moi_vai_tro: "Thêm mới vai trò",

  qrScanAssetInfor: "Tài sản",
  qrScanAssetScreen: "Quét tài sản",

  speechControl: "Điều khiển bằng giọng nói",
});

// Quản lý tabs
export const tabs = ({
  toan_bo_tai_san: 'Toàn bộ TS',
  tai_san_mat: 'TS mất',
  tai_san_hong: 'TS hỏng',
  tai_san_thanh_ly: 'TS thanh lý',
  tai_san_dang_su_dung: 'Tài sản đang sử dụng',
  tai_san_chua_su_dung: 'Tài sản chưa sử dụng',
  tai_san_sua_chua_bao_duong: 'TS sửa chữa/bảo dưỡng',
  tai_san_huy: 'Tài sản hủy',
  bao_hong_mat_tai_san: 'Báo hỏng/mất tài sản'
})

// Quản lý icon
export const icons = ({
  iconHome: "home",
  iconQuanlydaudoc: "barcode",
  iconGiamsattaisan: "window-restore",
  iconKiemketaisan: "server",
  iconDutrumuasam: "shopping-cart",
  iconQuanlycanhbao: "bell",
  iconBaocao: "file",
  iconQuanlydanhmuc: "folder-open",
  iconQuanlyhethong: "cogs",
  iconQuanlytaisan: "database",
});

// Quản lý menu
export const drawerData = [
 {
  name: screens.dash_board,
  icon: icons.iconHome,
 },
  {
    name: screens.quan_ly_tai_san,
    icon: icons.iconQuanlytaisan,
  },
  {
    name: screens.quan_ly_dau_doc,
    icon: icons.iconQuanlydaudoc,
    children: [
      {
        name: screens.quan_ly_dau_doc_di_dong,
      },
      {
        name: screens.quan_ly_dau_doc_co_dinh,
      }
    ]
  },
  {
    name: screens.giam_sat_tai_san,
    icon: icons.iconGiamsattaisan,
    children: [
      {
        name: screens.giam_sat_tai_san,

      },
      {
        name: screens.theo_doi_ket_noi_thiet_bi,
      }
    ]
  },
  {
    name: screens.quan_ly_kiem_ke_tai_san,
    icon: icons.iconKiemketaisan,
  },
  {
    name: screens.quan_ly_du_tru_mua_sam,
    icon: icons.iconDutrumuasam,
  },
  {
    name: screens.quan_ly_canh_bao,
    icon: icons.iconQuanlycanhbao,
  },
  {
    name: screens.bao_cao,
    icon: icons.iconBaocao,
    children: [
      {
        name: screens.bao_cao_canh_bao,
      },
      {
        name: screens.dat_lich_xuat_bao_cao,
      },
      {
        name: screens.bao_cao_thong_tin_tai_san,
      },
    ]
  },
  {
    name: screens.quan_ly_danh_muc,
    icon: icons.iconQuanlydanhmuc,
    children: [
      {
        name: screens.quan_ly_nha_cung_cap,
      },
      {
        name: screens.quan_ly_vi_tri_dia_ly,
      },
      {
        name: screens.quan_ly_loai_tai_san,
      },
      {
        name: screens.quan_ly_don_vi,
      }
    ]
  },
  {
    name: screens.quan_ly_he_thong,
    icon: icons.iconQuanlyhethong,
    children: [
      {
        name: screens.quan_ly_nguoi_dung,
      },
      {
        name: screens.quan_ly_phan_quyen,
      },
      {
        name: screens.quan_ly_mail_server,
      }
    ]
  },
];

// Hình thức filter
export const hinhThucData = [
  {id: 5, displayName: "Sửa chữa"},
  {id: 6, displayName: "Bảo dưỡng"}
];


// TrangThai filter
export const trangThaiData = [
  {id: 1, displayName: "Đang thực hiện"},
  {id: 3, displayName: "Không thành công"}
];
// Khai báo filter
export const KhaiBaoData = [
  {id: 7, displayName: "Mất"},
  {id: 8, displayName: "Hỏng"}
];
// Trạng thái giám sát tài sản
export const trangThaiRavao = [
  {id: 5, displayName: "Ra"},
  {id: 6, displayName: "Vao"}
];

export const trangThaiPhanloai = [
  {id: 5, displayName: "Trong hệ thống"},
  {id: 6, displayName: "Ngoài hệ thống"}
];


export const trangThaiKiemke = [
  {id: 0, displayName: "Chưa bắt đầu"},
  {id: 1, displayName: "Đang kiểm kê"},
  {id: 2, displayName: "Đã kết thúc"},
];

export const maTaiSan = [
  "maEPC",
  "epcCode",
  "maRFID"
];

export const tenTaiSan = [
  "tenTaiSan",
  "tenTS"
];

export const trangThaiTaiSan = ({
  'chua_su_dung': 'Chưa sử dụng',
  'dang_su_dung': 'Đang sử dụng',
});

export const chieuDiChuyen = [
  {id: 1, displayName: "Chiều ra", value: 'Ra'},
  {id: 2, displayName: "Chiều vào", value: 'Vào'},
];

export const phanLoaiTaiSan = [
  {id: 1, displayName: "Tài sản trong hệ thống"},
  {id: 2, displayName: "Tài sản ngoài hệ thống"},
];

export const moreMenu = ({
  cap_nhat: 'Cập nhật',
  thu_hoi: 'Thu hồi',
  dieu_chuyen: 'Điều chuyển',
  hoan_tac: 'Hoàn tác',
  khai_bao_su_dung: 'Khai báo sử dụng',
  cap_phat: 'Cấp phát',
  thanh_cong: 'Thành công',
  khong_thanh_cong: 'Không thành công'
});

 