'use client'

import { NextPage } from "next"
import { useEffect, useState } from "react"
import Header from "../home/header"
import Image from "next/image"
import iconMap from "../assets/imgs/map.svg"
import LocationSelect from "../location/page"
import axios from "axios"
import Footer from "../home/footer"
import { useDropzone } from "react-dropzone"
import { uploadToCloudinary } from "../services/ImageService"
import { addCar } from "../services/CarServices"
import { useRouter } from "next/navigation"

const link = process.env.NEXT_PUBLIC_LINK

const CarRegistry: NextPage = () => {
    const [licensePlate, setLicensePlate] = useState('')
    const [carInfo, setCarInfo] = useState({
        brand: '',
        model: '',
        seats: 4,
        transmission: 'AT',
        fuelType: 'GASOLINE',
        fuelConsumption: 10,
        description: '',
        features: [] as number[],
        rental: null,
        images: [] as string[],
        location: ''
    })
   
    const [year, setYear] = useState(2024)
    const [step, setStep] = useState<number>(1)
    const [isLocationOpen, setIsLocationOpen] = useState(false)
    const [location, setLocation] = useState<string>('')
    const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 })

    const toggleLocationFrame = () => setIsLocationOpen(!isLocationOpen)

    const handleLocationSelect = (selectedLocation: string) => {
        setLocation(selectedLocation)
    }


    const nextStep = () => {
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const prevStep = () => {
        setStep(step - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const updateCarInfo = (key: keyof typeof carInfo, value: any) => {
        setCarInfo((prev) => ({ ...prev, [key]: value }))
    }

    const toggleFeature = (feature: number) => {
        setCarInfo((prev) => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter((f) => f !== feature)
                : [...prev.features, feature],
        }))
        //console.log(carInfo.features)
    }

    const OPEN_CAGE_API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY
    const getCoordinate = async (location: string) => {
        try {
            const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
                params: {
                    q: location,
                    key: OPEN_CAGE_API_KEY,
                    language: 'vi',
                    countrycode: 'VN',
                },
            });
            if (response) {
                const { lat, lng } = response.data.results[0].geometry
                setCoordinates({ latitude: lat, longitude: lng })
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error)
        }
    };

    const [uploadedImages, setUploadedImages] = useState<File[]>([])
    const onDrop = (acceptedFiles: File[]) => {
        setUploadedImages([...uploadedImages, ...acceptedFiles])
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    const removeImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index))
    };

    useEffect(() => {
        if (location) {
            getCoordinate(location)
            updateCarInfo('location', location)
        }
        
    }, [location])

    const router = useRouter()
    const registryCar = async () => {
        await uploadListImages()
        addCar(carInfo.model + ' ' + year, Number(carInfo.rental), carInfo.brand, carInfo.location, carInfo.transmission, carInfo.fuelType,
                 carInfo.seats, carInfo.fuelConsumption + 'L/100km', 'Biển số xe: ' + licensePlate + '\n' + carInfo.description, carInfo.features, carInfo.images)
        router.push('/home')
    }

    //console.log(carInfo.features)

    const uploadListImages = async () => {
        try {
            //const uploadPromises = uploadedImages.map((image) => uploadToCloudinary(image))
            const list: string[] = await Promise.all(uploadedImages.map((image) => 
                uploadToCloudinary(image)
                    .then(res => res.data)))
                    
            // Lọc ra các ảnh tải lên thành công.
            list
                .map((image) => {
                    carInfo.images.push(String(link + image))
                    return image
                })  
        } catch (error) {
            console.error('Lỗi khi tải ảnh:', error)
        }
    }

    console.log(carInfo.fuelType)

    return (
        <section className="w-full flex flex-col items-center justify-center font-baloo-2">
            <Header></Header>
            <div className="w-full flex flex-col items-center justify-center bg-whitesmoke p-2 pt-8 gap-2 border-y border-smoke">
                <div className="w-[1120px] relative flex justify-center items-center m-2 mt-6">
                    <h2 className="text-2xl font-semibold text-xxl">Đăng ký xe</h2>
                </div>

                <div className="w-[750px] flex flex-col items-center justify-center mt-4 bg-white rounded-lg p-4 gap-2">
                    <div className="flex items-center space-x-6">
                        <span className={`w-[60px] h-[60px] text-xx flex items-center justify-center rounded-full ${step > 0 ? 'bg-lowblue text-white' : 'bg-whitesmoke text-black'}`}>
                            1
                        </span>
                        <span className={`h-1 w-12 ${step > 1 ? 'bg-lowblue' : 'bg-whitesmoke'}`} ></span>
                        <span className={`w-[60px] h-[60px] text-xx flex items-center justify-center rounded-full ${step > 1 ? 'bg-lowblue text-white' : 'bg-whitesmoke text-black'}`}>
                            2
                        </span>
                        <span className={`h-1 w-12 ${step > 2 ? 'bg-lowblue' : 'bg-whitesmoke'}`} ></span>
                        <span className={`w-[60px] h-[60px] text-xx flex items-center justify-center rounded-full ${step > 2 ? 'bg-lowblue text-white' : 'bg-whitesmoke text-black'}`}>
                            3
                        </span>
                    </div>
                    <div className="flex flex-row items-center justify-between w-[372px] text-silver">
                        <span> Thông tin </span>
                        <span> Cho thuê </span>
                        <span> Hình ảnh </span>
                    </div>
                </div>

                {step === 1 &&
                    (<div className="w-[750px] relative flex flex-col bg-white p-10 rounded-lg gap-4">
                        {/* License Plate */}
                        <div className="mb-4">
                            <label className="block font-medium mb-1 text-xx">Biển số xe</label>
                            <p className="text-red-500 mb-1 text-red">Lưu ý: Biển số sẽ không thể thay đổi sau khi đăng ký.</p>
                            <input
                                type="text"
                                value={licensePlate}
                                onChange={(e) => setLicensePlate(e.target.value)}
                                className="w-1/2 p-2 border border-silver rounded"
                            />
                        </div>

                        {/* Basic Information */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-xx mb-2">Thông tin cơ bản</h3>
                            <p className="text-red-500 mb-3 text-red">Lưu ý: Các thông tin cơ bản sẽ không thể thay đổi sau khi đăng ký.</p>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1">Hãng xe</label>
                                    <select
                                        value={carInfo.brand}
                                        onChange={(e) => updateCarInfo('brand', e.target.value)}
                                        className="w-full p-2 border border-silver rounded font-medium bg-white"
                                    >
                                        <option>Chọn hãng xe</option>
                                        <option value="Toyota">Toyota</option>
                                        <option value="Honda">Honda</option>
                                        <option value="Honda">BMV</option>
                                        <option value="Honda">Vinfast</option>
                                        <option value="Honda">Mecerdes</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1">Mẫu xe</label>
                                    <input
                                        type="text"
                                        value={carInfo.model}
                                        onChange={(e) => updateCarInfo('model', e.target.value)}
                                        className="w-full p-2 border border-silver rounded font-medium bg-white placeholder:text-silver"
                                        disabled={!carInfo.brand}
                                        placeholder="Chọn hãng xe trước"
                                    >
                                        
                                    </input>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block mb-1">Số ghế</label>
                                    <select
                                        value={carInfo.seats}
                                        onChange={(e) => updateCarInfo('seats', Number(e.target.value))}
                                        className="w-full p-2 border border-silver rounded font-medium bg-white"
                                    >
                                        <option value={2}>Bán tải</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1">Năm sản xuất</label>
                                    <input
                                        type="number"
                                        value={year}
                                        onChange={(e) => setYear(Number(e.target.value))}
                                        className="w-full p-2 border border-silver rounded font-medium bg-white"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block mb-1">Truyền động</label>
                                    <select
                                        value={carInfo.transmission}
                                        onChange={(e) => updateCarInfo('transmission', e.target.value)}
                                        className="w-full p-2 border border-silver rounded font-medium bg-white"
                                    >
                                        <option value="AT">Số tự động</option>
                                        <option value="MT">Số sàn</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1">Loại nhiên liệu</label>
                                    <select
                                        value={carInfo.fuelType}
                                        onChange={(e) => updateCarInfo('fuelType', e.target.value)}
                                        className="w-full p-2 border border-silver rounded font-medium bg-white"
                                    >
                                        <option value="GASOLINE">Xăng</option>
                                        <option value="ELECTRICITY">Điện</option>
                                        <option value="DIESEL">Dầu diesel</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Fuel Consumption */}
                        <div className="mb-4">
                            <label className="block font-medium mb-1 text-xx">Mức tiêu thụ nhiên liệu</label>
                            <p className="text-silver mb-1 ">{carInfo.fuelType == 'ELECTRICITY' ? 'Quãng đường tối đa 1 lần sạc' : 'Số lít nhiên liệu trên quãng đường 100km'}</p>
                            <input
                                type="number"
                                value={carInfo.fuelConsumption}
                                onChange={(e) => updateCarInfo('fuelConsumption', Number(e.target.value))}
                                className="w-1/2 p-2 border border-silver rounded font-medium bg-white"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block font-medium mb-1 text-xx">Mô tả</label>
                            <textarea
                                value={carInfo.description}
                                onChange={(e) => updateCarInfo('description', e.target.value)}
                                placeholder="Huyndai Elantra số tự động đăng ký tháng 06/2018. Xe gia đình mới đẹp, nội thất nguyên bản, sạch sẽ, bảo dưỡng thường xuyên, rửa xe miễn phí cho khách. Xe rộng rãi, an toàn, tiện nghi, phủ hợp cho gia đình du lịch. Xe trang bị hệ thống cảm biến lùi, gạt mưa tự động, đèn pha tự động. camera hành trình, hệ thống giải trí AV cùng nhiều tiên nghĩ khác"
                                className="w-full p-2 border border-silver rounded h-24 resize-none placeholder:text-silver"
                            ></textarea>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                            <h3 className="font-medium text-xx mb-2">Tính năng</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: "Bản đồ", value: 1 },
                                    { label: "Bluetooth", value: 2 },
                                    { label: "Camera 360", value: 3 },
                                    { label: "Camera hành trình", value: 5 },
                                    { label: "Camera lùi", value: 6 },
                                    { label: "Cửa sổ trời", value: 10 },
                                    { label: "Khe cắm USB", value: 13 },
                                    { label: "Camera cập lề", value: 4 },
                                    { label: "Cảm biển lốp", value: 7 },
                                    { label: "Cảm biến va chạm", value: 8 },
                                    { label: "Cảnh báo tốc độ", value: 9 },
                                    { label: "Định vị GPS", value: 11 },
                                    { label: "Ghế trẻ em", value: 12 },
                                    { label: "Lốp dự phòng", value: 14 },
                                    { label: "Màn hình DVD", value: 15 },
                                    { label: "Nắp thùng xe bán tải", value: 16 },
                                    { label: "ETC", value: 17 },
                                    { label: "Túi khí an toàn", value: 18 },
                                    { label: "Sac khong day", value: 19 },
                                ].map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() => toggleFeature(item.value)}
                                        className={`p-2 border border-silver rounded ${carInfo.features.includes(item.value) ? "bg-lowblue text-white" : "bg-gray-200"}`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>)}

                {step === 2 &&
                    (<div className="w-[750px] relative flex flex-col bg-white p-10 rounded-lg gap-4">
                        {/* Đơn giá thuê mặc định */}
                        <div className="flex flex-col mb-6 gap-2">
                            <label className="block font-medium text-xx">Đơn giá thuê mặc định</label>
                            <p className="text-silver mb-1 ">
                                Đơn giá áp dụng cho tất cả các ngày. Bạn có thể tuỳ chỉnh giá khác cho các ngày đặc biệt
                                (cuối tuần, lễ, tết...) trong mục quản lý xe sau khi đăng ký.

                            </p>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={Number(carInfo.rental)}
                                    onChange={(e) => updateCarInfo('rental', Number(e.target.value))}
                                    className="w-1/2 p-2 border border-silver rounded"
                                    placeholder="500"
                                />
                                <span className="">K</span>
                            </div>
                        </div>

                        {/* Địa chỉ xe */}
                        <div className="flex flex-col mb-6 gap-2">
                            <label className="block font-medium mb-1 text-xx">Địa chỉ xe</label>
                            {/* <input
                                type="text"
                                className="w-full border border-silver rounded p-2"
                                placeholder="Nhập địa chỉ xe"
                            /> */}

                            <div onClick={toggleLocationFrame} className="w-full flex flex-row items-center justify-start border border-silver rounded p-2 gap-2">
                                <Image alt="" className="w-8 h-8" src={iconMap} />
                                {location ? location : "Địa chỉ mặc định của xe"}
                            </div>
                            {isLocationOpen && (
                                <LocationSelect onLocationSelect={handleLocationSelect} onToggleLocationFrame={toggleLocationFrame} />
                            )}
                            {/* Bản đồ */}
                            {location && (
                                <div className="mt-4 border border-gray-300 rounded-md overflow-hidden">
                                    <iframe
                                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.longitude - 0.01},${coordinates.latitude - 0.01},${coordinates.longitude + 0.01},${coordinates.latitude + 0.01}&layer=mapnik&marker=${coordinates.latitude},${coordinates.longitude}`}
                                        title="Map"
                                        className="w-full h-64"
                                        style={{ border: "none" }}
                                    ></iframe>
                                </div>
                            )}

                        </div>

                        {/* Điều khoản thuê xe */}
                        <div className="flex flex-col mb-6 gap-2">
                            <label className="block font-medium text-xx">Điều khoản thuê xe</label>
                            <p className="text-silver mb-1 ">
                                Ghi rõ các yêu cầu để khách có thể thuê xe.
                            </p>
                            <textarea
                                className="w-full border border-silver rounded p-2 placeholder:text-silver"
                                placeholder="Không sử dụng xe vào mục đích phi pháp. Lái xe cẩn thận, giữ xe sạch sẽ, trả xe đúng giờ. Phụ thu 500k nếu hút thuốc lá trong xe."
                                rows={4}
                            >
                            </textarea>
                        </div>
                    </div>
                    )}

                {step === 3 &&
                    (<div className="w-[750px] relative flex flex-col bg-white p-10 rounded-lg gap-4">
                        <h2 className="block font-medium text-xx">Tải lên hình ảnh</h2>
                        <p className="text-gray-600 mb-4">
                            Chọn và tải lên nhiều hình ảnh cho xe của bạn.
                        </p>

                        <div
                            {...getRootProps()}
                            className="w-full h-48 flex justify-center items-center border-2 border-dashed border-lowblue rounded cursor-pointer text-lowblue"
                        >
                            <input {...getInputProps()} />
                            <p className="text-gray-500">Kéo hình ảnh vào đây hoặc bấm để chọn</p>
                        </div>

                        {/* Hiển thị hình ảnh đã tải lên */}
                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {uploadedImages.map((file, index) => (
                                <div key={index} className="relative group">
                                    {/* Hình ảnh */}
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Uploaded ${index}`}
                                        className="w-full h-32 object-cover rounded-lg shadow"
                                    />
                                    {/* Nút xóa */}
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    )}

                <div className="w-[750px] flex justify-between py-4">
                    <button onClick={prevStep} disabled={step == 1} type="button"
                        className={`w-1/3 px-4 py-3 border font-medium rounded-lg ${step == 1 ? "text-silver border-silver" : "border-lowblue text-lowblue hover:bg-whiteblue hover:-translate-y-1 hover:shadow-lg transition transform duration-200"}`}>
                        Quay lại
                    </button>
                    <div onClick={step < 3 ? nextStep : registryCar} className="w-1/3 px-4 py-3 text-center font-medium border border-silver rounded-lg bg-primary text-white cursor-pointer hover:bg-lowblue hover:-translate-y-1 hover:shadow-lg transition transform duration-200">
                        {step < 3 ? "Kế tiếp" : "Đăng ký"}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </section>
    );
};

export default CarRegistry
