import React, { useEffect, useState } from 'react';
import axios from "../api/TmnApi";

export default function TmnCateGoryForm({ oncloseForm, onCategorySubmit, renderTmnCategory }) {
    // State 
    const [tmnCategoryName, setTmnCategoryName] = useState("");
    const [tmnCategoryStatus, setTmnCategoryStatus] = useState(true);
    const [tmnCategStatus,setTmnCategoryStatus] = useState(true);

    useEffect(()=>{
        setTmnId(renderTmnCategory.tmnId);
        setTmnCategoryName(renderTmnCategory.tmnCategoryName);
        setTmnId(renderTmnCategory.tmnCategoryStatus);
    })

    const tmnHandleClose = () => {
        oncloseForm(false);
    };

    const tmnHandleSubmit = async (event) => {
        event.preventDefault();
        let tmnCategory = {
            tmnId: 0,
            tmnCategoryName: tmnCategoryName,
            tmnCategoryStatus: tmnCategoryStatus
        };
        console.log("tmnCategory", tmnCategory);
        try {
            await axios.post("TmnCateGoryList", tmnCategory);
            onCategorySubmit(tmnCategory);
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    return (
        <div>
            <form>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Category Name</span>
                    <input
                        type="text"
                        className="form-control"
                        name="tmnCategoryName"
                        value={tmnCategoryName}
                        onChange={(ev) => setTmnCategoryName(ev.target.value)}
                        placeholder="Category Name"
                        aria-label="Category Name"
                        aria-describedby="basic-addon1"
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Category Status</span>
                    <select
                        className="form-control"
                        name="tmnCategoryStatus"
                        value={tmnCategoryStatus}
                        onChange={(ev) => setTmnCategoryStatus(ev.target.value === "true")}>
                        <option value={true}>Hiển Thị</option>
                        <option value={false}>Tạm Khóa</option>
                    </select>
                </div>
                <button className="btn btn-success" onClick={tmnHandleSubmit}>Ghi Lại</button>
                <button className="btn btn-danger" onClick={tmnHandleClose}>Đóng</button>
            </form>
        </div>
    );
}
