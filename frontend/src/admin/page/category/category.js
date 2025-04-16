import axios from "axios";
import { useEffect, useState } from "react";
import API from "../../../configs/endpoint";
import { CopyPlus, UserPlus, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ListUser = () => {
    const [categorys, setCategory] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [modalUpdate, setModalUpdate] = useState(null)
    const [modalDelete, setModalDelete] = useState(null)
    const [modalAddCategory, setModalAddCategory] = useState(false)
    const [search, setSearch] = useState('')
    const [verifyCategory, setVerifyCategory] = useState('');


    const token = localStorage.getItem("token");

    const filteredCategory = categorys.filter(category =>
        category.CategoryID.toString().includes(search) ||
        category.CategoryName.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = async () => {
        const res = await axios.get(`${API}/get-category`)
        if (res.data.EC === 0) {
            setCategory(res.data.Data)
        }
    }

    const createCategory = async () => {
        const res = await axios.post(`${API}/create-category`, { categoryName }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.data.EC === 0) {
            console.log(res.data.Data);
            await getCategory()
            setCategoryName('')
            setModalAddCategory(false)
            toast.success(res.data.Message)
        } else {
            toast.warn(res.data.Message)
        }
    }

    const updateCategory = async () => {
        const res = await axios.put(`${API}/update-category`, modalUpdate, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.data.EC === 0) {
            console.log(res.data.Data);
            await getCategory()
            setModalUpdate()
            toast.success(res.data.Message)
        } else {
            toast.warn(res.data.Message)
        }
    }

    const deleteUser = async (CategoryID) => {
        if (verifyCategory === modalDelete.CategoryName) {
            const res = await axios.delete(`${API}/delete-category`, {
                data: { CategoryID },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.EC === 0) {
                toast.success(res.data.Message)
                await getCategory()
                setModalDelete()
                setVerifyCategory('')

            }
            else {
                toast.warn(res.data.Message)
            }
        }
    }

    return (
        <div className="p-4">
            <ToastContainer />
            <div className="flex justify-between pb-2">
                <h2 className="text-2xl font-bold">Danh mục</h2>
                <div className="space-x-5 flex items-center">
                    <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Tìm kiếm" className="p-2 ư h-10 border border-gray-200 rounded-lg outline-none focus:border-2 focus:border-gray-300" />
                    <button onClick={() => setModalAddCategory(true)}><CopyPlus /></button>
                </div>
            </div>
            <div className="overflow-x-auto ">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="py-2 px-4 border-b ps-20 w-0">ID</th>
                            <th className="py-2 px-4 border-b w-72">Tên danh mục</th>
                            <th className="py-2 px-4 border-b w-32 text-center">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategory.map((category, index) => (
                            <tr key={index} className="hover:bg-gray-50 items-center">
                                <td className="py-2 px-4 border-b ps-20 h-14">{category.CategoryID}</td>
                                <td className="py-2 px-4 border-b">{category.CategoryName}</td>
                                <td className="py-2 px-4 border-b">
                                    <div className='flex space-x-2 justify-center'>
                                        <button onClick={() => setModalUpdate(category)} className='bg-blue-700 rounded-lg h-9 w-20 text-white hover:bg-blue-800'>Cập nhật</button>
                                        <button onClick={() => setModalDelete(category)} className='bg-red-700 rounded-lg h-9 w-20 text-white'>Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalAddCategory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[380px] h-[180px] rounded-lg p-7 mx-auto px-0">
                        <div className="flex justify-center">
                            <button onClick={() => setModalAddCategory(false)} className="fixed ms-[320px] -mt-3  text-xl"><X /></button>
                        </div>
                        <div className="flex flex-col pt-5 ps-10">
                            <p className=" font-bold">Tên danh mục</p>
                            <div className="space-x-3">
                                <input
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    className=" border rounded-lg mt-1 ps-1 h-10  w-52 outline-none focus:border-orange-400 focus:border-2 " />
                                <button type="submit" onClick={createCategory} className='bg-green-800 rounded-lg h-10 w-20 text-white hover:bg-green-900'>Thêm</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}


            {modalUpdate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[380px] h-[180px] rounded-lg p-7 mx-auto px-0">
                        <div className="flex justify-center">
                            <button onClick={() => setModalUpdate(false)} className="fixed ms-[320px] -mt-3  text-xl"><X /></button>
                        </div>
                        <div className="flex flex-col pt-5 ps-10">
                            <p className=" font-bold">Tên danh mục</p>
                            <div className="space-x-3">
                                <input type="text" value={modalUpdate.CategoryName} onChange={(e) => setModalUpdate({ ...modalUpdate, CategoryName: e.target.value })}
                                    className=" border rounded-lg mt-1 ps-1 h-10  w-52 outline-none focus:border-orange-400 focus:border-2 " />
                                <button type="submit" onClick={updateCategory} className='bg-blue-700 rounded-lg h-9 w-20 text-white hover:bg-blue-800'>Cập nhật</button>
                            </div>
                        </div>

                    </div>
                </div>
            )
            }

            {modalDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[380px] h-[180px] rounded-lg p-7 mx-auto px-0">
                        <div className="flex justify-center">
                            <button onClick={() => setModalDelete(false)} className="fixed ms-[320px] -mt-3  text-xl"><X /></button>
                        </div>
                        <div className="flex flex-col pt-5 ps-0">
                            <p className="font-bold text- ps-10">Xác nhận xóa danh mục: <span className="text-red-600">{modalDelete.CategoryName}</span></p>
                            <div className="space-x-3">
                                <input type="text" value={verifyCategory} onChange={(e) => setVerifyCategory(e.target.value)} placeholder="Xác nhận lại danh mục" className=" border rounded-lg ps-1 mt-5 ms-10 h-10  w-52 outline-none focus:border-orange-400 focus:border-2 " />
                                <button type="submit" onClick={() => deleteUser(modalDelete.CategoryID)} className='bg-red-700 rounded-lg h-10 w-20 text-white hover:bg-red-800'>Xóa</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}


        </div >
    )
}
export default ListUser;