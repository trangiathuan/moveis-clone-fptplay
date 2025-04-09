import React from 'react'



const DetailPackage = () => {

  return (
    <div className="container mx-auto  py-8">
      <div className='flex flex-col  justify-center items-center px-40'>
        <h1 className="text-2xl font-bold text-center mb-8 text-left">Mua gói</h1>
        <div className="border-b border-gray-700">
          <table className="border-collapse border-spacing-0 w-full">
            <thead>
              <tr className="bg-black">
                <th className="px-4 py-4 w-2/6 text-white text-3xl text-left">Mua gói</th>
                <th className="w-auto">
                  <img src={require("../../asset/images-package/smax+.png")} alt="Smax+" />
                </th>
                <th className="w-auto">
                  <img src={require("../../asset/images-package/k+.png")} alt="K+" />
                </th>
                <th className="w-auto">
                  <img src={require("../../asset/images-package/smaxk+.png")} alt="SmaxK+" />
                </th>
                <th className="w-auto">
                  <img src={require("../../asset/images-package/zplay.png")} alt="ZPlay" />
                </th>
                <th className="w-auto">
                  <img src={require("../../asset/images-package/noAds.png")} alt="No Ads" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center font-bold">
                <td className="px-4 py-4 text-white w-1/7 text-sm text-left bg-neutral-900">Giá dịch vụ</td>
                <td className="px-4 py-4 text-white bg-neutral-900">66.000vnđ</td>
                <td className="px-4 py-4 text-white bg-neutral-900">179.000vnđ</td>
                <td className="px-4 py-4 text-white bg-neutral-900">219.000vnđ</td>
                <td className="px-4 py-4 text-white bg-neutral-900">44.000vnđ</td>
                <td className="px-4 py-4 text-white bg-neutral-900">20.000vnđ</td>
              </tr>
              <tr className="text-center font-bold">
                <td className="px-4 py-4 text-white w-1/7 text-sm text-left">Số thiết bị</td>
                <td className="px-4 py-4 text-white">3</td>
                <td className="px-4 py-4 text-white">1</td>
                <td className="px-4 py-4 text-white">3</td>
                <td className="px-4 py-4 text-white">2</td>
                <td className="px-4 py-4 text-white">2</td>
              </tr>
              <tr className="text-center">
                <td className="px-4 py-4 font-bold text-white w-1/7 text-sm text-left bg-neutral-900">Kho phim đặc sắc</td>
                <td className="px-4 py-4 text-green-500 bg-neutral-900">✔</td>
                <td className="px-4 py-4 text-red-500 bg-neutral-900">✘</td>
                <td className="px-4 py-4 text-green-500 bg-neutral-900">✔</td>
                <td className="px-4 py-4 text-green-500 bg-neutral-900">✔</td>
                <td className="px-4 py-4 text-red-500 bg-neutral-900">✘</td>
              </tr>
              <tr className="text-center">
                <td className="px-4 py-4 font-bold text-white w-1/7 text-sm text-left">Nhóm kênh thiết yếu & kênh địa phương</td>
                <td className="px-4 py-4 text-green-500">✔</td>
                <td className="px-4 py-4 text-green-500">✔</td>
                <td className="px-4 py-4 text-green-500">✔</td>
                <td className="px-4 py-4 text-green-500">✔</td>
                <td className="px-4 py-4 text-red-500">✘</td>
              </tr>
              <tr className="text-center">
                <td className="px-4 py-4 font-bold text-white w-1/7 text-sm text-left bg-neutral-900">Nhóm kênh trong nước & quốc tế</td>
                <td className="px-4 py-4 text-green-500 bg-neutral-900">✔</td>
                <td className="px-4 py-4 text-red-500 bg-neutral-900">✘</td>
                <td className="px-4 py-4 text-green-500 bg-neutral-900">✔</td>
                <td className="px-4 py-4 text-red-500 bg-neutral-900">✘</td>
                <td className="px-4 py-4 text-red-500 bg-neutral-900">✘</td>
              </tr>
              <tr className="text-center">
                <td className="px-4 py-4 font-bold text-white w-1/7 text-sm text-left">Thể thao đỉnh cao</td>
                <td className="px-4 py-4 text-green-500">✔</td>
                <td className="px-4 py-4 text-red-500">✘</td>
                <td className="px-4 py-4 text-green-500">✔</td>
                <td className="px-4 py-4 text-red-500">✘</td>
                <td className="px-4 py-4 text-red-500">✘</td>
              </tr>
              <tr className="text-center">
                <td className="px-4 py-4 font-bold text-white w-1/7 text-sm text-left bg-neutral-900">Nhóm kênh K+</td>
                <td className="px-4 py-4 text-red-500 bg-neutral-900">✘</td>
                <td className="px-4 py-4 text-green-500 bg-neutral-900">✔</td>
                <td className="px-4 py-4 text-green-500 bg-neutral-900">✔</td>
                <td className="px-4 py-4 text-red-500 bg-neutral-900">✘</td>
                <td className="px-4 py-4 text-red-500 bg-neutral-900">✘</td>
              </tr>
              <tr className="text-center">
                <td className="px-4 py-4 font-bold text-white w-1/7 text-sm text-left">Không quảng cáo trong VOD</td>
                <td className="px-4 py-4 text-red-500">✘</td>
                <td className="px-4 py-4 text-red-500">✘</td>
                <td className="px-4 py-4 text-red-500">✘</td>
                <td className="px-4 py-4 text-red-500">✘</td>
                <td className="px-4 py-4 text-green-500">✔</td>
              </tr>

              <tr className="text-center">
                <td className="px-4 py-4 text-white text-sm text-left">Hành động</td>
                <td className="px-4 py-4">
                  <button className="px-4 py-4 bg-neutral-900 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600">
                    Chọn gói này
                  </button>
                </td>
                <td className="px-4 py-4">
                  <button className="px-4 py-4 bg-neutral-900 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600">
                    Chọn gói này
                  </button>
                </td>
                <td className="px-4 py-4">
                  <button className="px-4 py-4 bg-neutral-900 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600">
                    Chọn gói này
                  </button>
                </td>
                <td className="px-4 py-4">
                  <button className="px-4 py-4 bg-neutral-900 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600">
                    Chọn gói này
                  </button>
                </td>
                <td className="px-4 py-4">
                  <button className="px-4 py-4 bg-neutral-900 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600">
                    Chọn gói này
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      <div>
        <div class="flex flex-col justify-start items-start text-left py-8">
          <div class="text-sm text-gray-600  px-40">
            <p class="mb-2  ">(* ) Một số dòng TV và thiết bị đời cũ có thể không hỗ trợ nội dung K+ và thể thao đỉnh cao do yêu cầu mã hóa bản quyền.</p>
            <p class="mb-2  ">(** ) Nhóm kênh K+ chỉ xem được trên 1 thiết bị tại cùng thời điểm.</p>
            <ul class="list-disc pl-6 mb-4">
              <li>Gói ZPlay Lite chỉ hỗ trợ xem trên Mobile & Web</li>
              <li>Nội dung các gói dịch vụ có thể thay đổi theo quy định của đơn vị cung cấp bản quyền và chỉ phát hành ở lãnh thổ Việt Nam.</li>
            </ul>
            <tr className='flex flex-grow gap-3  '>
              <th><h2 class="font-bold text-lg">Các nền tảng hỗ trợ</h2></th>
              <th> <img src={require("../../asset/images-package/icon-tv.jpg")} alt="" /></th>
              <th><img src={require("../../asset/images-package/icon-desktop.jpg")} alt="" /></th>
              <th><img src={require("../../asset/images-package/icon-web.jpg")} alt="" /></th>
              <th><img src={require("../../asset/images-package/icon-ios.jpg")} alt="" /></th>
              <th><img src={require("../../asset/images-package/icon-android.jpg")} alt="" /></th>
            </tr>
            <th className='py-5'> <a href="/"> <img src={require("../../asset/images-package/banner.jpg")} alt="" /></a></th>
          </div>
        </div>

      </div>
    </div>
  );
};



export default DetailPackage;
