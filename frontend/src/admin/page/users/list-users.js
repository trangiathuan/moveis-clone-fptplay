const users = [
    { username: "admin", email: "admin@mail.com", role: "Admin" },
    { username: "user01", email: "user01@mail.com", role: "User" },
    { username: "mod", email: "mod@mail.com", role: "Moderator" },
];

const ListUser = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="py-2 px-4 border-b">Tài khoản</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Vai trò</th>
                            <th className="py-2 px-4 border-b">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{user.username}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                                <td className="py-2 px-4 border-b">{user.role}</td>
                                <td className="py-2 px-4 border-b">{user.role}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ListUser;