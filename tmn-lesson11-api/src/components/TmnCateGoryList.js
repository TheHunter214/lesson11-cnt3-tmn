import React from 'react';

export default function TmnCateGoryList({ renderTmnCategories, onAddNew ,onTmnDelete }) {
    console.log("renderTmnCategories: ", renderTmnCategories);
    let tmnCategoriesElement = renderTmnCategories.map((tmnCategory, index) => {
        return (
            <tr key={index}>
                <th>{index + 1}</th>
                <td>{tmnCategory.tmnId}</td>
                <td>{tmnCategory.tmnCategoryName}</td>
                <td>{tmnCategory.tmnCategoryStatus === true ? "Hiển Thị" : "Tạm Khóa"}</td>
                <td>
                    <button className='btn btn-danger' 
                    onClick={()=>tmnHandleDelete(tmnCategory.tmnId)}>
                        Delete</button>
                    <button className='btn btn-success'
                          onClick={()=>tmnHandleEdit(tmnCategory)}>
                        Edit
                    </button> 
                </td>
            </tr>
        );
    });

    const tmnHandleAdd = () => {
        onAddNew(true);
    };

    //Ham xu ly su kien xoa 
    const tmnHandleDelete = (tmnId)=>{
        if(window.comfirm('Ban co thuc su muon xoa Category co ma['+tmnId+'] khong?')){
            console.log("Delete:",tmnId);
            onTmnDelete(tmnId)
            
        }else{

        }
       
    }

    return (
        <div className='container m-2'>
            <h2>Danh Sách Loại Sản Phẩm</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã Loại</th>
                        <th>Tên Loại</th>
                        <th>Trạng Thái</th>
                        <th>Chức Năng</th>
                    </tr>
                </thead>
                <tbody>
                    {tmnCategoriesElement}
                </tbody>
            </table>
            <button className='btn btn-primary' onClick={tmnHandleAdd}>Thêm Mới</button>
        </div>
    );
}
