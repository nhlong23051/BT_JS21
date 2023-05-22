function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
        if (value === '' || value === 0) {
            //sai
            getEle(errorId).style.display = 'block';
            getEle(errorId).innerHTML = mess;
            return false;
        }

        //đúng
        getEle(errorId).style.display = 'none';
        getEle(errorId).innerHTML = '';
        return true;
    }

    this.kiemTraDoDaiKiTu = function (value, errorId, mess, min, max) {
        if (min <= value.length && value.length <= max) {
            //đúng
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = '';
            return true;
        }
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    }

    this.kiemTraDoDai = function (value, errorId, mess, min, max) {
        if (value >= min && value <= max) {
            //true
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = '';
            return true;
        }
        // false
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    }

    this.kiemTraSelect = function (seclectId, errorId, mess) {
        if (getEle(seclectId).selectedIndex !== 0) {
            //đúng
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = '';
            return true;
        }

        //sai
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    }

    this.kiemTraKiTu = function (value, pattern, errorId, mess) {
        if (value.match(pattern)) {
            //true
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = '';
            return true;
        }
        // false
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    }
}