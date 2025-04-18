import axios from "axios";
import { useEffect, useState } from "react";
import API from "../../../configs/endpoint";
import { UserPlus, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ListUser = () => {
    const [users, setUsers] = useState([])
    const [modalUpdate, setModalUpdate] = useState(null)
    const [modalDelete, setModalDelete] = useState(null)
    const [modalAddUser, setModalAddUser] = useState(false)
    const [search, setSearch] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('user')
    const [verifyEmail, setVerifyEmail] = useState('');
    const token = localStorage.getItem("token");

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async () => {
        const res = await axios.get(`${API}/getAllUsers`)
        if (res.data.EC === 0) {
            setUsers(res.data.Data)
        }
    }

    const createUser = async () => {
        const res = await axios.post(`${API}/createUser`, { email, name, role }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.data.EC === 0) {
            console.log(res.data.Data);
            await getAllUsers()
            setName('')
            setEmail('')
            setRole('user')
            setModalAddUser(false)
            toast.success(res.data.Message)
        } else {
            toast.warn(res.data.Message)
        }
    }

    const updateUser = async () => {
        const res = await axios.put(`${API}/updateUser-admin`, modalUpdate)
        if (res.data.EC === 0) {
            console.log(res.data.Data);
            await getAllUsers()
            setModalUpdate()
            toast.success(res.data.Message)
        } else {
            toast.warn(res.data.Message)
        }
    }

    const deleteUser = async (id) => {
        if (verifyEmail === modalDelete.email) {
            const res = await axios.delete(`${API}/deleteUser`, {
                data: { id },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.EC === 0) {
                toast.success(res.data.Message)
                await getAllUsers()
                setModalDelete()
                setVerifyEmail('')

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
                <h2 className="text-2xl font-bold">Danh sách người dùng</h2>
                <div className="space-x-5 flex items-center">
                    <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Tìm kiếm" className="p-2 ư h-10 border border-gray-200 rounded-lg outline-none focus:border-2 focus:border-gray-300" />
                    <button onClick={() => setModalAddUser(true)}><UserPlus /></button>
                </div>
            </div>
            <div className="overflow-x-auto ">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="w-32 border-b"></th>
                            <th className="py-2 px-4 border-b w-72">Tên người dùng</th>
                            <th className="py-2 px-4 border-b w-72">Email</th>
                            <th className="py-2 px-4 border-b w-72">Vai trò</th>
                            <th className="py-2 px-4 border-b w-32 text-center">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-50 items-center">
                                <td className="border-b">
                                    <img
                                        src={user.avatarUrl || `https://images.ctfassets.net/j040bzbn054u/2HldvDjZU5qwkIuFzJnmjQ/bb328d0561dfd69d44d9284b037b2fee/u-next_square_profile_icon_grey.jpg?fm=jpg&fl=progressive&q=80&w=1000`}
                                        className="w-10 h-10 m-2 mx-20 rounded-full object-cover flex-shrink-0"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                                <td className={`py-2 px-4 border-b ${user.role === 'admin' ? 'text-red-600 font-bold' : 'text-blue-600 font-bold'}`}>{user.role}</td>
                                <td className="py-2 px-4 border-b">
                                    <div className='flex space-x-2 justify-center'>
                                        <button onClick={() => setModalUpdate(user)} className='bg-blue-700 rounded-lg h-9 w-20 text-white hover:bg-blue-800'>Cập nhật</button>
                                        <button onClick={() => setModalDelete(user)} className='bg-red-700 rounded-lg h-9 w-20 text-white'>Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalUpdate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[320px] h-[550px] rounded-lg p-7 mx-auto px-0">
                        <div className="flex justify-center">
                            <img className="w-24 h-24 rounded-full" src={modalUpdate.avatarUrl || `https://images.ctfassets.net/j040bzbn054u/2HldvDjZU5qwkIuFzJnmjQ/bb328d0561dfd69d44d9284b037b2fee/u-next_square_profile_icon_grey.jpg?fm=jpg&fl=progressive&q=80&w=1000`} />
                            <button onClick={() => setModalUpdate()} className="fixed ms-[250px]  text-xl"><X /></button>
                        </div>
                        <div className="flex flex-col pt-10 ps-10">
                            <p className=" font-bold">Tên người dùng</p>
                            <input type="text" value={modalUpdate.name} onChange={(e) => setModalUpdate({ ...modalUpdate, name: e.target.value })} className=" border rounded-lg mt-1 ps-1 h-10  w-60 outline-none focus:border-orange-400 focus:border-2 " />
                        </div>
                        <div className="flex flex-col ps-10 pt-3">
                            <p className=" font-bold">Email</p>
                            <input type="text" value={modalUpdate.email} onChange={(e) => setModalUpdate({ ...modalUpdate, email: e.target.value })} className=" border rounded-lg mt-1 p-2 w-60 outline-none focus:border-orange-400 focus:border-2 " />
                        </div>
                        <div className="flex flex-col ps-10 pt-3">
                            <p className=" font-bold">Vai trò</p>
                            <select
                                id="role"
                                className="border rounded-lg mt-1 p-2 w-60 outline-none focus:border-orange-400 focus:border-2 "
                                value={modalUpdate.role}
                                onChange={(e) =>
                                    setModalUpdate({ ...modalUpdate, role: e.target.value })
                                }
                            >
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                            </select>
                        </div>
                        <div className="pt-20 flex mx-[120px] w-full">
                            <button type="submit" onClick={updateUser} className='bg-blue-700 rounded-lg h-9 w-20 text-white hover:bg-blue-800'>Cập nhật</button>
                        </div>
                    </div>
                </div>
            )}

            {modalDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[450px] h-[250px] rounded-lg p-7 mx-auto px-0">
                        <div className="flex justify-center">
                            <button onClick={() => setModalDelete()} className="fixed ms-[350px]  text-xl"><X /></button>
                        </div>
                        <div className="flex flex-col pt-10 ps-0">
                            <p className="font-bold text- ps-10">Xác nhận xóa tài khoản <span className="text-red-600">{modalDelete.email}</span></p>
                            <input type="text" value={verifyEmail} onChange={(e) => setVerifyEmail(e.target.value)} placeholder="Xác nhận lại email để xóa" className=" border rounded-lg ps-1 mt-5 ms-10 h-10  w-[370px] outline-none focus:border-orange-400 focus:border-2 " />
                        </div>

                        <div className="pt-6 flex mx-[180px] w-full">
                            <button type="submit" onClick={() => deleteUser(modalDelete.id)} className='bg-red-700 rounded-lg h-9 w-20 text-white hover:bg-red-800'>Xóa</button>
                        </div>
                    </div>
                </div>
            )}

            {modalAddUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[320px] h-[550px] rounded-lg p-7 mx-auto px-0">
                        <div className="flex justify-center">
                            <img className="w-24 h-24 rounded-full" src={`https://images.ctfassets.net/j040bzbn054u/2HldvDjZU5qwkIuFzJnmjQ/bb328d0561dfd69d44d9284b037b2fee/u-next_square_profile_icon_grey.jpg?fm=jpg&fl=progressive&q=80&w=1000`} />
                            <button onClick={() => setModalAddUser(false)} className="fixed ms-[250px]  text-xl"><X /></button>
                        </div>
                        <div className="flex flex-col pt-10 ps-10">
                            <p className=" font-bold">Tên người dùng</p>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className=" border rounded-lg mt-1 ps-1 h-10  w-60 outline-none focus:border-orange-400 focus:border-2 " />
                        </div>
                        <div className="flex flex-col ps-10 pt-3">
                            <p className=" font-bold">Email</p>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className=" border rounded-lg mt-1 p-2 w-60 outline-none focus:border-orange-400 focus:border-2 " />
                        </div>
                        <div className="flex flex-col ps-10 pt-3">
                            <p className=" font-bold">Vai trò</p>
                            <select
                                id="role"
                                className="border rounded-lg mt-1 p-2 w-60 outline-none focus:border-orange-400 focus:border-2 "
                                value={role}
                                onChange={(e) => setRole(e.target.value)}

                            >
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>
                        <div className="pt-20 flex mx-[120px] w-full">
                            <button type="submit" onClick={createUser} className='bg-green-800 rounded-lg h-9 w-20 text-white hover:bg-green-900'>Thêm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ListUser;