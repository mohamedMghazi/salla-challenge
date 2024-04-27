import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchForProducts} from "utils/store/eCommerce/actions";

const ProductSearch = () => {
    const dispatch = useDispatch();

    const categories = useSelector((state: any) => state.eCommerce.categories);

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");

    useEffect(() => {
        dispatch(searchForProducts({ query, category }) as any);
    }, [query, category, dispatch]);

    return (
        <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex flex-col gap-1 flex-1">
                <label htmlFor="product_query" className="hidden">ابحث عن منتج</label>
                <input
                    type="text"
                    id="product_query"
                    name="query"
                       className="w-full p-2 bg-white appearance-none rounded-md border text-md"
                       placeholder="ادخل اسم المنتج..."
                          onChange={(e) => {
                                setQuery(e.target.value);
                          }}
                />
            </div>

            <div className="flex flex-col gap-1 shrink-0 sm:min-w-[180px]">
                <label htmlFor="categories" className="hidden">اختر تصنيف</label>
                <select onChange={(e) => setCategory(e.target.value)} defaultValue="all" id="category" name="categoryId"
                        className="bg-white border text-md rounded-md focus:ring-secondary-50 focus:border-secondary-50 block w-full px-2 py-1">
                    <option value="all">جميع التصنيفات</option>
                    {categories.map((category: any) => (
                        <option key={category.id} value={category.id}>{category.categoryName}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default ProductSearch;
