$('#fRegister').on('submit', function (event) {
    event.preventDefault();

    const username = $('#username').val();
    $.getJSON(`/isAvailable?user=${username}`, (data) => {
        //console.log(data);
        console.log(111);
        if (data === false) {
            //alert("tai khoan da dang ky");
            document.getElementById('aleart').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" id="aleart" sty>
                <strong>Tài khoản đã được đăng ký!</strong>
                <button type="button" class="close" data-dismiss="alert" id="closeAleart">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
        }
        else {
            $('#fRegister').off('submit').submit();
        }
    })
})

// // xử lý điều kiện :
// 1: kiểm tra sách nhập mới đã tồn tại trong kho chưa
// 2: kiểm tra sách nhập mới có quantity > 150 kho
// 3: kiểm tra sách nhập cũ có tồn tại trong kho chưa
// 3: kiểm tra sách nhâp cũ có sô lượng >300 không
// 4: kiểm tra sách nhập cũ có quantity > 150 không

