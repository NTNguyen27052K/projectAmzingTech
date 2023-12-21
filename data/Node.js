// Run: json-server --watch db.json --port 8000
const axios = require("axios");

const updateLeaveApplicationF = async (id, data) => {
  try {
    const response = await axios.put(
      `http://localhost:1000/leaveApplicationForm/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn xin nghỉ phép:", error.message);
    throw error;
  }
};

// Ví dụ sử dụng:
// Giả sử `id` là ID của đơn xin nghỉ phép cần cập nhật
// và `data` chứa các trường cần cập nhật
const idCanCapNhat = 1; // Thay thế với ID thích hợp
const duLieuMoi = {
  status: "Approved", // Thay đổi với các trường và giá trị cần cập nhật
  // Thêm các trường khác nếu cần
};

updateLeaveApplicationF(idCanCapNhat, duLieuMoi)
  .then((formDaCapNhat) => {
    console.log("Đơn xin nghỉ phép đã cập nhật:", formDaCapNhat);
  })
  .catch((error) => {
    // Xử lý lỗi ở đây
    console.error("Cập nhật đơn xin nghỉ phép thất bại:", error);
  });
