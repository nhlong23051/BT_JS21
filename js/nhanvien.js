var NhanVien = function NhanVien(_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam) {
    this.taiKhoan = _taiKhoan;
    this.tenNV = _tenNV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.loaiNV = '';

    this.tongLuong = function () {
        // tìm index của selection chuc vụ
        var index = getEle('chucvu').selectedIndex;
        if (index === 1) {
            this.tongLuong = this.luongCoBan*3;
        }
        if (index === 2) {
            this.tongLuong = this.luongCoBan*3;
        }
        if (index === 3) {
            this.tongLuong = this.luongCoBan;
        } if (index === -1) {
            this.tongLuong = 0;
        }

        return this.tongLuong;
    };

    this.loaiNV = function () {
        if (this.gioLam < 160) {
            this.loaiNV = 'Trung Binh';
        } if (this.gioLam >= 160 && _gioLam < 176) {
            this.loaiNV = 'Kha';
        } if (this.gioLam >= 176 && _gioLam < 192) {
            this.loaiNV = 'Gioi';
        } if (this.gioLam >= 192) {
            this.loaiNV = 'Xuat Sac';
        }
        return this.loaiNV;
    };
}