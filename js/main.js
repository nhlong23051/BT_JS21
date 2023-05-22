function getEle(id) {
    return document.getElementById(id);
}

var dsnv = new DanhSachNV();

getLocalStorage()

function layThongTinNV() {
    var _taiKhoan = getEle('tknv').value;
    var _tenNV = getEle('name').value;
    var _email = getEle('email').value;
    var _matKhau = getEle('password').value;
    var _ngayLam = getEle('datepicker').value;
    var _luongCoBan = +getEle('luongCB').value;
    var _chucVu = getEle('chucvu').value;
    var _gioLam = +getEle('gioLam').value;

    var isValid = true;

    // kiểm tra tài khoản
    var validation = new Validation();
    isValid &= validation.kiemTraRong(_taiKhoan, 'errorTK', '(*)Vui lòng nhập Tài Khoản') &&
        validation.kiemTraDoDaiKiTu(_taiKhoan, 'errorTK', '(*)Vui lòng nhập từ 4-6 kí số', 4, 6);

    // kiểm tra tên 
    isValid &= validation.kiemTraRong(_tenNV, 'errorName', '(*)Vui lòng nhập Họ và Tên') &&
        validation.kiemTraKiTu(_tenNV, "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$", 'errorName', '(*)Vui lòng nhập Họ và Tên hợp lệ');

    // kiểm tra email
    isValid &= validation.kiemTraRong(_email, 'errorEmail', '(*)Vui lòng nhập Email') && validation.kiemTraKiTu(_email, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'errorEmail', '(*)Vui lòng nhập Email hợp lệ');

    // kiểm tra mật khẩu
    isValid &= validation.kiemTraRong(_matKhau, 'errorMK', '(*)Vui lòng nhập Mật Khẩu') &&
        validation.kiemTraDoDaiKiTu(_matKhau, 'errorMK', '(*)Vui lòng nhập từ 6-10 kí số', 6, 10) &&
        validation.kiemTraKiTu(_matKhau, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, 'errorMK', '(*)Vui lòng nhập Mật Khẩu hợp lệ');

    // kiểm tra ngày làm
    isValid &= validation.kiemTraRong(_ngayLam, 'errorNgayLam', '(*)Vui lòng nhập Ngày Làm');

    // kiểm tra lương cơ bản
    isValid &= validation.kiemTraRong(_luongCoBan, 'errorLCB', '(*)Vui lòng nhập Lương Cơ Bản') &&
        validation.kiemTraDoDai(_luongCoBan, 'errorLCB', '(*)Vui lòng nhập lương CB từ 1 triệu - 20 triệu', 1000000, 20000000);

    // kiểm tra chức vụ
    isValid &= validation.kiemTraSelect('chucvu', 'errorChucVu', '(*)Vui lòng chọn Chức Vụ');

    // kiểm tra giờ làm
    isValid &= validation.kiemTraRong(_gioLam, 'errorGioLam', '(*)Vui lòng nhập giờ làm') &&
        validation.kiemTraDoDai(_gioLam, 'errorGioLam', '(*)Số giờ làm trong tháng là 80 - 200 giờ', 80, 200);


    if (!isValid) return null

    var nv = new NhanVien(_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam);

    nv.tongLuong();
    nv.loaiNV();

    dsnv.themNV(nv);

    return nv
}

function renderTable(data) {
    var result = '';

    for (i = 0; i < data.length; i++) {
        var nv = data[i];
        result += `
        <tr>
            <th>${nv.taiKhoan}</th>
            <th>${nv.tenNV}</th>
            <th>${nv.email}</th>
            <th>${nv.ngayLam}</th>
            <th>${nv.chucVu}</th> 
            <th>${nv.tongLuong}</th>
            <th>${nv.loaiNV}</th>
            <th>
            <button id="deleteNV" onclick="deleteNV('${nv.taiKhoan}')" class="btn btn-danger">Delete</button>
            <button id="editNV" onclick="editNV('${nv.taiKhoan}')" data-toggle="modal" class="btn btn-info">Edit</button>
            </th>
        </tr>
        `
    }
    getEle('tableDanhSach').innerHTML = result;
}

function deleteNV(taiKhoan) {
    dsnv.xoaNV(taiKhoan);
    renderTable(dsnv.arr);
    setLocalStorage(dsnv.arr);
}

// không biết làm
function editNV(taiKhoan) {

    dsnv.capNhatNV(taiKhoan);

    getEle('tknv').innerHTML = nv.taiKhoan;
    getEle('name').innerHTML = nv.tenNV;
    getEle('email').innerHTML = nv.email;
    getEle('password').innerHTML = nv.matKhau;
    getEle('datepicker').innerHTML = nv.ngayLam;
    getEle('luongCB').innerHTML = nv.luongCoBan;
    getEle('chucvu').innerHTML = nv.chucVu;
    getEle('gioLam').innerHTML = nv.gioLam;
}

getEle('searchName').addEventListener('keyup', function () {
    var value = getEle('searchName').value;
    var mangTimKiem = dsnv.timKiemNV(value);
    renderTable(mangTimKiem);
})

function setLocalStorage() {
    // chuyển giá trị của mảng thành dạng string
    var dataString = JSON.stringify(dsnv.arr);
    // set localStorage
    localStorage.setItem('DSNV', dataString)
}

function getLocalStorage() {
    if (dataString = localStorage.getItem('DSNV')) {
        // lấy data tren local gán vào dataString
        var dataString = localStorage.getItem('DSNV');
        // chuyển dataString -> JSON
        var dataJson = JSON.parse(dataString);
        renderTable(dataJson);
    }
}

getEle('btnThemNV').addEventListener('click', function () {
    layThongTinNV();

    renderTable(dsnv.arr);

    setLocalStorage();
})

