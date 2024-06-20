import { useEffect, useState } from 'react';
import './App.css';
import TmnCateGoryList from './components/TmnCateGoryList';
import axios from './api/TmnApi';
import TmnCateGoryForm from './components/TmnCateGoryForm';

function TmnApp() {
  // Lấy dữ liệu từ API
  const [tmnCategories, setTmnCategories] = useState([]);

  const getCategories = async () => {
    try {
      const tmnCateResponse = await axios.get('TmnCategory');
      setTmnCategories(tmnCateResponse.data);
    } catch (error) {
      console.log('Lỗi:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Trạng thái form
  const [tmnCategoryIsForm, setTmnCategoryIsForm] = useState(false);

  const tmnHandleAddNew = (param) => {
    setTmnCategoryIsForm(param);
  };

  const tmnHandleCategoryCloseForm = (param) => {
    setTmnCategoryIsForm(param);
  };

  const tmnHandleCategorySubmit = (param) => {
    let id = tmnCategories.length > 0 ? tmnCategories[tmnCategories.length - 1].tmnId : 0;
    console.log('Mã:', id);
    param.tmnId = id + 1;
    setTmnCategories((prev) => [...prev, param]);
    setTmnCategoryIsForm(false);
  };

  // Hàm xử lý sự kiện xóa một đối tượng category
  const tmnHandleDelete = async (tmnId) => {
    console.log('App-Delete-tmnId:', tmnId);
    try {
      // Xóa trên api
      // const tmnResponse = axios.delete('https://666d7f237a3738f7cacc86e2.mockapi.io/tmnApi/tmnV1/TmnCategory/${tmnId}');
      const tmnResponse = axios.delete(TmnCategory/${tmnId});
      console.log('tmnResponse-Delete', tmnResponse);
      let tmnDelete = tmnCategories.filter((x) => x.tmnId !== tmnId);
      setTmnCategories(tmnDelete);
      console.log('Deleted:', tmnDelete);
    } catch (error) {
      console.log('Lỗi khi xóa:', error);
    }
  };

  return (
    <div className="container border my-3">
      <h1>TranMinhNam - Call API</h1>
      <TmnCateGoryList
        renderTmnCategories={tmnCategories}
        onAddNew={tmnHandleAddNew}
        onTmnDelete={tmnHandleDelete}
      />
      <hr />
      {tmnCategoryIsForm && (
        <TmnCateGoryForm
          onCloseForm={tmnHandleCategoryCloseForm}
          onCategorySubmit={tmnHandleCategorySubmit}
        />
      )}
    </div>
  );
}

export default TmnApp;
