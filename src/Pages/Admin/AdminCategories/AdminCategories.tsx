import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../Redux/Store";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { fetchCategoriesData } from "../../../Redux/Categories/CategoriesAction";

type CategoriesItem = {
  id: string;
  src: string;
  alt: string;
};

const AdminCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoriesItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<CategoriesItem>({
    id: "",
    src: "",
    alt: "",
  });

  const { categories, loading, error } = useSelector(
    (state: any) =>
      state.categories as {
        categories: CategoriesItem[];
        loading: boolean;
        error: string;
      }
  );

  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  // قفل کردن اسکرول هنگام باز بودن مودال
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
          await axios.delete(`http://localhost:3001/Categories/${id}`);
          Swal.fire("حذف شد!", "دسته‌بندی با موفقیت حذف شد.", "success");
          dispatch(fetchCategoriesData());
        } catch (error) {
          Swal.fire("خطا!", "مشکلی در حذف دسته‌بندی پیش آمد.", "error");
        }
      }
    });
  };

  const handleEdit = (category: CategoriesItem) => {
    setEditCategory(category);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!editCategory) return;

    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "تغییرات ثبت شوند؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله، ذخیره کن",
      cancelButtonText: "لغو",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `http://localhost:3001/Categories/${editCategory.id}`,
            editCategory
          );
          Swal.fire(
            "ویرایش شد!",
            "دسته‌بندی با موفقیت به‌روزرسانی شد.",
            "success"
          );
          setIsModalOpen(false);
          dispatch(fetchCategoriesData());
        } catch (error) {
          Swal.fire("خطا!", "مشکلی در ویرایش دسته‌بندی پیش آمد.", "error");
        }
      }
    });
  };

  const handleAddNewCategory = async () => {
    if (!newCategory.src.trim() || !newCategory.alt.trim()) {
      Swal.fire("خطا!", "لطفاً تمامی فیلدها را پر کنید.", "warning");
      return;
    }

    try {
      await axios.post("http://localhost:3001/Categories", {
        ...newCategory,
        id: Date.now().toString(),
      });

      Swal.fire("افزوده شد!", "دسته‌بندی جدید با موفقیت اضافه شد.", "success");

      setIsAddModalOpen(false);
      setNewCategory({ id: "", src: "", alt: "" }); // پاک کردن فرم
      dispatch(fetchCategoriesData());
    } catch (error) {
      Swal.fire("خطا!", "مشکلی در افزودن دسته‌بندی پیش آمد.", "error");
    }
  };

  return (
    <>
      {loading && <div>در حال بارگذاری...</div>}
      {error && (
        <div className="text-red-500 text-2xl text-center leading-[60px]">
          Categories : {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <h2 className="leading-[80px] text-4xl text-center bg-(--gradient)">
            Categories
          </h2>
          <div className="w-[90%] m-auto flex flex-wrap items-center justify-center gap-5">
            {categories?.map((item) => (
              <div
                key={item.id}
                className="w-[40%] md:w-[25%] lg:w-[15%] bg-blue-500 p-2 m-3 rounded-md"
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
            onClick={() => setIsAddModalOpen(true)}
            className="AdminPageAddButton"
          >
            Add
          </button>

          <Link to="/Admin" className="AdminPageBackButton">
            Back
          </Link>
        </>
      )}

      {isModalOpen && editCategory && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-5 rounded-md w-[400px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-center mb-3">ویرایش</h2>
            <label className="block text-sm font-medium">تصویر</label>
            <input
              type="text"
              value={editCategory.src}
              onChange={(e) =>
                setEditCategory({ ...editCategory, src: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-3"
            />
            <label className="block text-sm font-medium">Alt</label>
            <input
              type="text"
              value={editCategory.alt}
              onChange={(e) =>
                setEditCategory({ ...editCategory, alt: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-3"
            />
            <div className="flex justify-between">
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
            className="bg-white p-5 rounded-md w-[400px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-center mb-3">
              افزودن دسته‌بندی جدید
            </h2>

            <input
              type="text"
              name="src"
              value={newCategory.src}
              onChange={handleNewCategoryChange}
              className="w-full p-2 border rounded-md mb-3"
              placeholder="آدرس تصویر"
            />

            <input
              type="text"
              name="alt"
              value={newCategory.alt}
              onChange={handleNewCategoryChange}
              className="w-full p-2 border rounded-md mb-3"
              placeholder="Alt"
            />

            <div className="flex justify-between">
              <button
                className="AdminPageRedButton"
                onClick={() => setIsAddModalOpen(false)}
              >
                لغو
              </button>
              <button
                className="AdminPageGreenButton"
                onClick={handleAddNewCategory}
              >
                افزودن
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCategories;
