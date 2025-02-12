import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainSliderData } from "../../../Redux/MainSlider/MainSliderAction";
import { AppDispatch } from "../../../Redux/Store";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

type SliderItem = {
  id: string;
  src: string;
  alt: string;
};

const AdminMainSlider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mainSlider, loading, error } = useSelector(
    (state: any) =>
      state.mainSlider as {
        mainSlider: SliderItem[];
        loading: boolean;
        error: string;
      }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<SliderItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSlide, setNewSlide] = useState<SliderItem>({
    id: "",
    src: "",
    alt: "",
  });

  useEffect(() => {
    dispatch(fetchMainSliderData());
  }, [dispatch]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

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
          await axios.delete(`http://localhost:3001/MainSlider/${id}`);
          Swal.fire("حذف شد!", "اسلاید با موفقیت حذف شد.", "success");
          dispatch(fetchMainSliderData());
        } catch (error) {
          Swal.fire("خطا!", "مشکلی در حذف اسلاید پیش آمد.", "error");
        }
      }
    });
  };

  const handleEdit = (item: SliderItem) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editItem) {
      setEditItem({ ...editItem, [e.target.name]: e.target.value });
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
            `http://localhost:3001/MainSlider/${editItem.id}`,
            editItem
          );
          Swal.fire("ذخیره شد!", "تغییرات با موفقیت ثبت شد.", "success");
          setIsModalOpen(false);
          dispatch(fetchMainSliderData());
        } catch (error) {
          Swal.fire("خطا!", "مشکلی در ذخیره تغییرات پیش آمد.", "error");
        }
      }
    });
  };
  const handleAddSlide = async () => {
    if (!newSlide.src || !newSlide.alt) {
      Swal.fire("خطا!", "لطفاً تمامی فیلدها را پر کنید.", "error");
      return;
    }

    try {
      await axios.post("http://localhost:3001/MainSlider", {
        id: Date.now().toString(), // ایجاد یک ID یکتا
        src: newSlide.src,
        alt: newSlide.alt,
      });

      Swal.fire("موفق!", "اسلاید جدید با موفقیت اضافه شد.", "success");
      setIsAddModalOpen(false);
      dispatch(fetchMainSliderData()); // به‌روز‌رسانی لیست اسلایدها
    } catch (error) {
      Swal.fire("خطا!", "مشکلی در افزودن اسلاید پیش آمد.", "error");
    }
  };

  return (
    <>
      {loading && <div>در حال بارگذاری...</div>}
      {error && (
        <div className="error-message text-red-500 text-2xl text-center leading-[60px]">
          MainSlider : {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <h2 className="leading-[80px] text-4xl text-center bg-(--gradient)">
            Main Slider
          </h2>
          <div className="w-[90%] m-auto flex flex-wrap items-center justify-center gap-5">
            {mainSlider?.map((item) => (
              <div
                key={item.id}
                className="w-[90%] lg:w-[45%] bg-blue-500 p-2 m-3 rounded-md"
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
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-5 rounded-lg w-[90%] max-w-[500px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl text-center font-bold mb-4">ویرایش</h2>
            <label htmlFor="alt" className="block mt-1 text-sm">
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
              placeholder="Alt"
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
          onClick={() => setIsAddModalOpen(false)} 
        >
          <div
            className="bg-white p-5 rounded-lg w-[90%] max-w-[500px]"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2 className="text-xl text-center font-bold mb-4">افزودن اسلاید جدید</h2>
            <input
              type="text"
              name="src"
              value={newSlide.src}
              onChange={(e) =>
                setNewSlide({ ...newSlide, src: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-2"
              placeholder="آدرس تصویر"
            />
            <input
              type="text"
              name="alt"
              value={newSlide.alt}
              onChange={(e) =>
                setNewSlide({ ...newSlide, alt: e.target.value })
              }
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
              <button className="AdminPageGreenButton" onClick={handleAddSlide}>
                افزودن
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminMainSlider;
