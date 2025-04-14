const users = [
    { username: "admin", email: "admin@mail.com", role: "Admin" },
    { username: "user01", email: "user01@mail.com", role: "User" },
    { username: "mod", email: "mod@mail.com", role: "Moderator" },
];

const ListUser = () => {
    return (
        <div className="p-4">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
                <div className="space-x-2">
                    <input type="text" placeholder="Tìm kiếm" className="p-2 ư h-10 border border-gray-200 rounded-lg outline-none focus:border-2 focus:border-gray-300" />
                    <button className="text-white px-2 w-24 h-9 bg-red-600 rounded-lg">
                        Tìm kiếm
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto ">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="w-32 border-b"></th>
                            <th className="py-2 px-4 border-b">Tài khoản</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Vai trò</th>
                            <th className="py-2 px-4 border-b">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-50 items-center">
                                <tr className="border-b">
                                    <img
                                        src='https://scontent.fsgn18-1.fna.fbcdn.net/v/t39.30808-6/479512658_1351962522704344_8795569477034108113_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHZ3GtCb8fAyfyxbYVX7ws9e4aEFlagktJ7hoQWVqCS0m5PPEugp9fl3txXdOHWO-E_nd0ucVcxCcEKPgW77XLW&_nc_ohc=rCy1mghqR8QQ7kNvwEglEj3&_nc_oc=AdkfFSOUzrKvEXptERPy3KNJyaD_kHNeFVrxYG108Dp1VzjmQB2ygcXxiaKzD_FxJ_weuF-LpCyKaM288JEOTxvu&_nc_zt=23&_nc_ht=scontent.fsgn18-1.fna&_nc_gid=7dJxf9tp7xLfoBtVo7AHLA&oh=00_AfH1lybbI-D4bL6oQObpzadxUNp0cEvq2wpMm3Ez_kHgmg&oe=67FE9047'
                                        className="w-10 h-10 m-2 mx-20 rounded-full object-cover flex-shrink-0"
                                    />
                                </tr>
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