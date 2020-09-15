// 封装对所有localStorage的操作

// 封装一个存储数据到localStorage中的方法
const setLocal = (key, value) => {
    uni.setStorage({key: key, data: JSON.stringify(value)});
  }
// 封装一个从localStorage中获取数据的方法
const getLocal = (key) => {
  uni.getStorage({
    key: key,
    success: function (res) {
      return res.data;
    }
  });
}
// 封装一个从localStorage中 删除数据的方法
const removeLocal = (key) => {
  uni.removeStorage({key: key});
}
// 导出
export { setLocal, getLocal, removeLocal }