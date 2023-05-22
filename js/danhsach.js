var DanhSachNV = function () {
    this.arr = [];

    this.themNV = function (nv) {
        this.arr.push(nv);
    };

    this.layThongTin = function (value) {
        var index = -1;
        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i]
            if (nv.taiKhoan === value) {
                index = i;
                break
            }
        }
        return index;
    }

    this.xoaNV = function (taiKhoan) {
        var index = this.layThongTin(taiKhoan);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    this.capNhatNV = function (taiKhoan) {
        index = this.layThongTin(taiKhoan);
        var nv = this.arr[index];
        return nv
    };
    this.timKiemNV = function (value) {
        var mangTimKiem = [];
        for (i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            var loaiNVToLowerCase = nv.loaiNV.toLowerCase();
            var valueToLowerCase = value.toLowerCase();
            if (loaiNVToLowerCase.indexOf(valueToLowerCase) !== -1) {
                this.arr[i] = nv;
                console.log(nv);
                mangTimKiem.push(nv);
            }
        }
        return mangTimKiem;
    };
}