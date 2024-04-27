import { FC } from "react";
import ProductCard from "components/ProductCard";

const dummyProducts = [
    {
        id: 1,
        title: "سماعات apple AirPods Max الاصدار الجديد",
        description: "الاصدار الاحدث و الافضل حتى اليوم",
        image: "/images/products/01.png",
        categories: [
            {id: 1, title: "تصنيف اول"},
            {id: 2, title: "تصنيف ثاني"},
        ],
        old_price: 2500.00,
        price: 2250.00,
    },
    {
        id: 2,
        title: "سماعات apple AirPods Max الاصدار الجديد",
        description: "الاصدار الاحدث و الافضل حتى اليوم",
        image: "/images/products/02.png",
        categories: [
            {id: 1, title: "تصنيف اول"},
            {id: 2, title: "تصنيف ثاني"},
        ],
        old_price: 2500.00,
        price: 2250.00
    },
    {
        id: 3,
        title: "سماعات apple AirPods Max الاصدار الجديد",
        description: "الاصدار الاحدث و الافضل حتى اليوم",
        image: "/images/products/03.png",
        categories: [
            {id: 1, title: "تصنيف اول"},
            {id: 2, title: "تصنيف ثاني"},
        ],
        old_price: 2500.00,
        price: 2250.00
    },
    {
        id: 4,
        title: "سماعات apple AirPods Max الاصدار الجديد",
        description: "الاصدار الاحدث و الافضل حتى اليوم",
        image: "/images/products/04.png",
        categories: [
            {id: 1, title: "تصنيف اول"},
            {id: 2 , title: "تصنيف ثاني"},
        ],
        old_price: 2500.00,
        price: 2250.00
    }
]

const Home: FC = () => {
    return (
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
            <div className="w-full  bg-gray-100 rounded-lg mb-8">
                <img src="/images/main-slider/01.png" className="w-full aspect-video rounded-lg" alt=""/>
            </div>
            <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex flex-col gap-1 flex-1">
                    <label htmlFor="product_query" className="hidden">ابحث عن منتج</label>
                    <input type="text" id="product_query" name="product_query"
                           className="w-full p-2 bg-white appearance-none rounded-md border text-md"
                           placeholder="ادخل اسم المنتج..."/>
                </div>

                <div className="flex flex-col gap-1 shrink-0 sm:min-w-[180px]">
                    <label htmlFor="categories" className="hidden">اختر تصنيف</label>
                    <select defaultValue="all" id="categories" name="categories" className="bg-white border text-md rounded-md focus:ring-secondary-50 focus:border-secondary-50 block w-full px-2 py-1">
                        <option value="all">الكل</option>
                        <option value="cat_1">تصنيف ١</option>
                        <option value="cat_2">تصنيف ٢</option>
                        <option value="cat_3">تصنيف ٣</option>
                        <option value="cat_4">تصنيف ٤</option>
                    </select>
                </div>
            </div>

            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-4">
                {dummyProducts.map((product) => <ProductCard product={product} key={product.id}/>)}
            </div>
        </div>
    );
}

export default Home;
