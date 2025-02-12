import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandsData } from "../../../Redux/Brands/BrandsAction";
import { AppDispatch } from "../../../Redux/Store";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

type BrandItem = {
  id: string;
  src: string;
  alt: string;
};

const AdminBrands = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { brands, loading, error } = useSelector(
    (state: any) =>
      state.brands as {
        brands: BrandItem[];
        loading: boolean;
        error: string;
      }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<BrandItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<BrandItem>({
    id: "",
    src: "",
    alt: "",
  });

  useEffect(() => {
    dispatch(fetchBrandsData());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله، حذف کن!",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/Brands/${id}`);
          Swal.fire("حذف شد!", "مورد با موفقیت حذف شد.", "success");
          dispatch(fetchBrandsData());
        } catch (error) {
          Swal.fire("خطا!", "مشکلی در حذف مورد پیش آمد.", "error");
        }
      }
    });
  };

  const handleEdit = (item: BrandItem) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editItem) {
      setEditItem({ ...editItem, [e.target.name]: e.target.value });
    }
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editItem) return;
    Swal.fire({
      title: "ذخیره تغییرات؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "بله، ذخیره کن!",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `http://localhost:3001/Brands/${editItem.id}`,
            editItem
          );
          Swal.fire("ذخیره شد!", "تغییرات با موفقیت ثبت شد.", "success");
          setIsModalOpen(false);
          dispatch(fetchBrandsData());
        } catch (error) {
          Swal.fire("خطا!", "مشکلی در ذخیره تغییرات پیش آمد.", "error");
        }
      }
    });
  };

  const handleAddItem = async () => {
    if (!newItem.src || !newItem.alt) {
      Swal.fire("خطا!", "لطفاً تمامی فیلدها را پر کنید.", "error");
      return;
    }

    const newItemWithId = { ...newItem, id: crypto.randomUUID() };

    try {
      await axios.post("http://localhost:3001/Brands", newItemWithId);
      Swal.fire("موفق!", "مورد جدید با موفقیت اضافه شد.", "success");

      // ریست کردن مقدار ورودی‌ها
      setNewItem({
        id: "",
        src: "",
        alt: "",
      });

      setIsAddModalOpen(false);
      dispatch(fetchBrandsData());
    } catch (error) {
      Swal.fire("خطا!", "مشکلی در افزودن مورد پیش آمد.", "error");
    }
  };

  return (
    <>
      {loading && <div>در حال بارگذاری...</div>}
      {error && (
        <div className="error-message text-red-500 text-2xl text-center leading-[60px]">
          Brands : {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <h2 className="leading-[80px] text-4xl text-center bg-(--gradient)">
            Brands
          </h2>
          <div className="w-[90%] m-auto flex flex-wrap items-center justify-center gap-5">
            {brands?.map((item) => (
              <div
                key={item.id}
                className="w-[40%] md:w-[25%] lg:w-[20%] bg-blue-500 p-2 m-3 rounded-md"
              >
                <img src={item.src} alt={item.alt} />
                <p className="text-center text-md leading-[40px] text-white">
                  Alt: {item.alt}
                </p>
                <div className="flex items-center justify-center gap-2 p-3">
                  <button
                    className="AdminPageRedButton"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="AdminPageEditButton"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="AdminPageAddButton"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add
          </button>
          <Link to="/Admin" className="AdminPageBackButton">
            Back
          </Link>
        </>
      )}

      {isModalOpen && editItem && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)} // بستن مودال با کلیک روی پس‌زمینه
        >
          <div
            className="bg-white p-5 rounded-lg w-[90%] max-w-[500px]"
            onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن با کلیک روی خود فرم
          >
            <h2 className="text-xl text-center font-bold mb-4">ویرایش</h2>
            <label htmlFor="src" className="block mt-1 text-sm">
              آدرس تصویر
            </label>
            <input
              type="text"
              name="src"
              value={editItem.src}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="تصویر"
            />
            <label htmlFor="alt" className="block mt-1 text-sm">
              Alt
            </label>
            <input
              type="text"
              name="alt"
              value={editItem.alt}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="نام برند"
            />
            <div className="flex justify-between mt-4">
              <button
                className="AdminPageRedButton"
                onClick={() => setIsModalOpen(false)}
              >
                لغو
              </button>
              <button className="AdminPageGreenButton" onClick={handleUpdate}>
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center"
          onClick={() => setIsAddModalOpen(false)} // بستن مودال با کلیک روی پس‌زمینه
        >
          <div
            className="bg-white p-5 rounded-lg w-[90%] max-w-[500px]"
            onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن مودال با کلیک داخل آن
          >
            <h2 className="text-xl text-center font-bold mb-4">
              افزودن آیتم جدید
            </h2>
            <input
              type="text"
              name="src"
              value={newItem.src}
              onChange={handleAddChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="آدرس تصویر "
            />
            <input
              type="text"
              name="alt"
              value={newItem.alt}
              onChange={handleAddChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Alt"
            />
            <div className="flex justify-between mt-4">
              <button
                className="AdminPageRedButton"
                onClick={() => setIsAddModalOpen(false)}
              >
                لغو
              </button>
              <button className="AdminPageGreenButton" onClick={handleAddItem}>
                افزودن
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminBrands;
