import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewlyAvailableData } from "../../../Redux/NewlyAvailable/NewlyAvailableAction";
import { AppDispatch } from "../../../Redux/Store";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

type NewlyAvailableItem = {
  id: string;
  src: string;
  alt: string;
  color: string;
  category: string;
  text: string;
  price: string;
  Inventory: number;
};

const AdminNewlyAvailable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { newlyAvailable, loading, error } = useSelector(
    (state: any) =>
      state.newlyAvailable as {
        newlyAvailable: NewlyAvailableItem[];
        loading: boolean;
        error: string;
      }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<NewlyAvailableItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<NewlyAvailableItem>({
    id: crypto.randomUUID(),
    src: "",
    alt: "",
    color: "white",
    category: "",
    text: "",
    price: "",
    Inventory: null as unknown as number,
  });

  const colorOptions = ["white", "black", "blue", "glass"];

  useEffect(() => {
    dispatch(fetchNewlyAvailableData());
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
          await axios.delete(`http://localhost:3001/NewlyAvailable/${id}`);
          Swal.fire("حذف شد!", "مورد با موفقیت حذف شد.", "success");
          dispatch(fetchNewlyAvailableData());
        } catch (error) {
          Swal.fire("خطا!", "مشکلی در حذف مورد پیش آمد.", "error");
        }
      }
    });
  };

  const handleEdit = (item: NewlyAvailableItem) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editItem) {
      setEditItem({
        ...editItem,
        [name]: name === "Inventory" ? Number(value) : value,
      });
    }
  };

  const handleAddChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: name === "Inventory" ? Number(value) : value,
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColor = e.target.value;
    if (editItem) {
      setEditItem({ ...editItem, color: selectedColor });
    } else {
      setNewItem({ ...newItem, color: selectedColor });
    }
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
            `http://localhost:3001/NewlyAvailable/${editItem.id}`,
            editItem
          );
          Swal.fire("ذخیره شد!", "تغییرات با موفقیت ثبت شد.", "success");
          setIsModalOpen(false);
          dispatch(fetchNewlyAvailableData());
        } catch (error) {
          Swal.fire("خطا!", "مشکلی در ذخیره تغییرات پیش آمد.", "error");
        }
      }
    });
  };

  const handleAddItem = async () => {
    if (
      !newItem.src ||
      !newItem.alt ||
      !newItem.category ||
      !newItem.text ||
      !newItem.price
    ) {
      Swal.fire("خطا!", "لطفاً تمامی فیلدها را پر کنید.", "error");
      return;
    }

    try {
      await axios.post("http://localhost:3001/NewlyAvailable", newItem);
      Swal.fire("موفق!", "مورد جدید با موفقیت اضافه شد.", "success");

      // ریست کردن فرم بعد از اضافه شدن
      setNewItem({
        id: crypto.randomUUID(),
        src: "",
        alt: "",
        color: "white",
        category: "",
        text: "",
        price: "",
        Inventory: null as unknown as number,
      });

      setIsAddModalOpen(false);
      dispatch(fetchNewlyAvailableData());
    } catch (error) {
      Swal.fire("خطا!", "مشکلی در افزودن مورد پیش آمد.", "error");
    }
  };

  return (
    <>
      {loading && <div>در حال بارگذاری...</div>}
      {error && (
        <div className="error-message text-red-500 text-2xl text-center leading-[60px]">
          NewlyAvailable : {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <h2 className="leading-[80px] text-4xl text-center bg-(--gradient)">
            Newly Available
          </h2>
          <div className="w-[90%] m-auto flex flex-wrap items-center justify-center gap-5">
            {newlyAvailable?.map((item) => (
              <div
                key={item.id}
                className="w-[80%] max-w-[350px] md:w-[35%] lg:w-[25%] bg-blue-500 p-2 m-3 rounded-md"
              >
                <img src={item.src} alt={item.alt} />
                <p className="text-center text-sm mt-1 text-white line-clamp-3">
                  Alt: {item.alt}
                </p>
                <p className="text-center text-sm leading-[30px] text-white line-clamp-3">
                  دسته بندی: {item.category}
                </p>
                <p className="h-[90px] text-center text-md text-white line-clamp-3">
                  {item.text}
                </p>
                <p className="text-center text-sm text-white line-clamp-3">
                  رنگ: {item.color}
                </p>
                <p className=" text-center text-md text-sm text-white line-clamp-3">
                  قیمت: {item.price}
                </p>
                <p className=" text-center text-md text-sm text-white line-clamp-3">
                  موجودی: {item.Inventory}
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
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-5 rounded-lg w-[90%] max-w-[500px]"
            onClick={(e) => e.stopPropagation()}
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
              className="w-full p-2 border rounded-md mb-1"
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
              className="w-full p-2 border rounded-md mb-1"
              placeholder="Alt"
            />
            <label htmlFor="category" className="block mt-1 text-sm">
              دسته‌بندی
            </label>
            <input
              type="text"
              name="category"
              value={editItem.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-1"
              placeholder="دسته‌بندی"
            />
            <label htmlFor="text" className="block mt-1 text-sm">
              توضیحات
            </label>
            <textarea
              name="text"
              value={editItem.text}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="توضیحات"
              rows={2}
            />
            <label htmlFor="price" className="block mt-1 text-sm">
              قیمت
            </label>
            <input
              type="text"
              name="price"
              value={editItem.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-1"
              placeholder="قیمت"
            />
            <label htmlFor="Inventory" className="block mt-1 text-sm">
              موجودی
            </label>
            <input
              type="text"
              name="Inventory"
              value={editItem.Inventory}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-1"
              placeholder="موجودی"
            />
            <label htmlFor="color" className="block mt-1 text-sm">
              رنگ
            </label>
            <select
              value={editItem.color}
              onChange={handleColorChange}
              className="w-full p-2 border rounded-md mb-1"
            >
              {colorOptions.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <div className="flex justify-between mt-1">
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
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-white p-5 rounded-lg w-[90%] max-w-[500px]"
            onClick={(e) => e.stopPropagation()}
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
              placeholder="آدرس تصویر"
            />
            <input
              type="text"
              name="alt"
              value={newItem.alt}
              onChange={handleAddChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Alt"
            />
            <input
              type="text"
              name="category"
              value={newItem.category}
              onChange={handleAddChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="دسته‌بندی"
            />
            <textarea
              name="text"
              value={newItem.text}
              onChange={handleAddChange}
              className="w-full p-2 border rounded-md"
              placeholder="توضیحات"
              rows={2}
            />
            <input
              type="text"
              name="price"
              value={newItem.price}
              onChange={handleAddChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="قیمت"
            />
            <input
              type="text"
              name="Inventory"
              value={newItem.Inventory}
              onChange={handleAddChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="موجودی"
            />
            <select
              value={newItem.color}
              onChange={handleColorChange}
              className="w-full p-2 border rounded-md mb-2"
            >
              {colorOptions.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
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

export default AdminNewlyAvailable;
