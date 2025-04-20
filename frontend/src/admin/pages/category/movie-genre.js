import axios from "axios";
import { useEffect, useState } from "react";
import API from "../../../configs/endpoint";
import { CopyPlus, UserPlus, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from "react-icons/fa";


const MovieGenre = () => {
    const [genres, setGenres] = useState([])
    const [genre, setGenreName] = useState('')
    const [modalUpdate, setModalUpdate] = useState(null)
    const [modalDelete, setModalDelete] = useState(null)
    const [modalAddGenre, setModalAddGenre] = useState(false)
    const [search, setSearch] = useState('')
    const [verifyGenre, setVerifyGenre] = useState('');




    const token = localStorage.getItem("token");

    const filteredGenres = genres.filter(genre =>
        genre.id.toString().includes(search) ||
        genre.Genre.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        getGenre()
    }, [])

    const getGenre = async () => {
        const res = await axios.get(`${API}/get-genre`)
        if (res.data.EC === 0) {
            setGenres(res.data.Data)
        }
    }

    const createGenre = async () => {
        const res = await axios.post(`${API}/create-Genre`, { genre }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.data.EC === 0) {
            console.log(res.data.Data);
            await getGenre()
            setGenreName('')
            setModalAddGenre(false)
            toast.success(res.data.Message)
        } else {
            toast.warn(res.data.Message)
        }
    }

    const updateGenre = async () => {
        const res = await axios.put(`${API}/update-Genre`, modalUpdate, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.data.EC === 0) {
            console.log(res.data.Data);
            await getGenre()
            setModalUpdate()
            toast.success(res.data.Message)
        } else {
            toast.warn(res.data.Message)
        }
    }

    const deleteUser = async (id) => {
        if (verifyGenre === modalDelete.Genre) {
            const res = await axios.delete(`${API}/delete-genre`, {
                data: { id },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.EC === 0) {
                toast.success(res.data.Message)
                await getGenre()
                setModalDelete()
                setVerifyGenre('')

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
                <h2 className="text-2xl font-bold">Thể loại</h2>
                <div className="space-x-5 flex items-center">
                    <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Tìm kiếm" className="p-2 ư h-10 border border-gray-200 rounded-lg outline-none focus:border-2 focus:border-gray-300" />
                    <button onClick={() => setModalAddGenre(true)}><CopyPlus /></button>
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
                        {filteredGenres.map((genre, index) => (
                            <tr key={index} className="hover:bg-gray-50 items-center">
                                <td className="py-2 px-4 border-b ps-20 h-14">{genre.id}</td>
                                <td className="py-2 px-4 border-b">{genre.Genre}</td>
                                <td className="py-2 px-4 border-b">
                                    <div className='flex space-x-2 justify-center'>
                                        <button onClick={() => setModalUpdate(genre)} className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transform hover:scale-105 transition duration-200">
                                            <FaEdit />Cập nhật</button>
                                        <button onClick={() => setModalDelete(genre)} className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-200">
                                            <FaTrash />Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalAddGenre && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[380px] h-[180px] rounded-lg p-7 mx-auto px-0">
                        <div className="flex justify-center">
                            <button onClick={() => setModalAddGenre(false)} className="fixed ms-[320px] -mt-3  text-xl"><X /></button>
                        </div>
                        <div className="flex flex-col pt-5 ps-10">
                            <p className=" font-bold">Tên thể loại</p>
                            <div className="space-x-3">
                                <input
                                    type="text"
                                    value={genre}
                                    onChange={(e) => setGenreName(e.target.value)}
                                    className=" border rounded-lg mt-1 ps-1 h-10  w-52 outline-none focus:border-orange-400 focus:border-2 " />
                                <button type="submit" onClick={createGenre} className='bg-green-800 rounded-lg h-10 w-20 text-white hover:bg-green-900'>Thêm</button>
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
                                <input type="text" value={modalUpdate.Genre} onChange={(e) => setModalUpdate({ ...modalUpdate, Genre: e.target.value })}
                                    className=" border rounded-lg mt-1 ps-1 h-10  w-52 outline-none focus:border-orange-400 focus:border-2 " />
                                <button type="submit" onClick={updateGenre} className='bg-blue-700 rounded-lg h-9 w-20 text-white hover:bg-blue-800'>Cập nhật</button>
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
                            <p className="font-bold text- ps-10">Xác nhận xóa danh mục: <span className="text-red-600">{modalDelete.Genre}</span></p>
                            <div className="space-x-3">
                                <input type="text" value={verifyGenre} onChange={(e) => setVerifyGenre(e.target.value)} placeholder="Xác nhận lại danh mục" className=" border rounded-lg ps-1 mt-5 ms-10 h-10  w-52 outline-none focus:border-orange-400 focus:border-2 " />
                                <button type="submit" onClick={() => deleteUser(modalDelete.id)} className='bg-red-700 rounded-lg h-10 w-20 text-white hover:bg-red-800'>Xóa</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}


        </div >
    )
}
export default MovieGenre;