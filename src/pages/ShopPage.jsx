import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import allProducts from '../data/allProducts';
import ProductGrid from '../components/product/ProductGrid';
import ProductSortBar from '../components/product/ProductSortBar';
import ProductFilters from '../components/product/ProductFilters';
import Sidebar from '../components/layout/Sidebar';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { SORT_OPTIONS } from '../constants/sortOptions';

export default function ShopPage() {
  const [params] = useSearchParams();
  const genderParam = params.get('gender') ?? '';
  const typeParam = params.get('type') ?? '';
  const categoryParam = params.get('category') ?? '';

  const isMobile = useMediaQuery('(max-width: 767px)');

  const [sort, setSort] = useState(SORT_OPTIONS[0].value);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync url params visually to the local sidebar arrays
  useEffect(() => {
    if (genderParam) setSelectedGenders([genderParam]);
    if (categoryParam) setSelectedCategories([categoryParam]);
  }, [genderParam, categoryParam]);

  const filtered = useMemo(() => {
    let list = allProducts;
    
    if (selectedGenders.length > 0) {
      list = list.filter((p) => selectedGenders.includes(p.gender));
    } else if (genderParam) {
      list = list.filter((p) => p.gender === genderParam);
    }

    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.type));
    } else if (categoryParam) {
      list = list.filter((p) => p.type === categoryParam);
    }

    if (typeParam) {
      list = list.filter((p) => p.type === typeParam);
    }
    
    list = list.filter((p) => p.price <= maxPrice);

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [genderParam, typeParam, categoryParam, selectedGenders, selectedCategories, maxPrice, sort]);

  const heading = genderParam
    ? `${genderParam.charAt(0).toUpperCase() + genderParam.slice(1)}${typeParam ? ` — ${typeParam.charAt(0).toUpperCase() + typeParam.slice(1)}` : ''}`
    : 'All Products';

  return (
    <main className="container py-8 lg:py-16">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Desktop: inline sticky sidebar */}
        {!isMobile && isFilterOpen && (
          <aside className="w-64 shrink-0 sticky top-24 z-20 hidden lg:block">
            <ProductFilters 
              selectedGenders={selectedGenders}
              setSelectedGenders={setSelectedGenders}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onApply={() => setIsFilterOpen(false)}
            />
          </aside>
        )}

        {/* Mobile: slide-up drawer via Sidebar component */}
        {isMobile && (
          <Sidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            selectedGenders={selectedGenders}
            setSelectedGenders={setSelectedGenders}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 w-full min-w-0">
          <ProductSortBar 
            count={filtered.length} 
            sort={sort} 
            setSort={setSort} 
            heading={heading} 
            isFilterOpen={isFilterOpen}
            onToggleFilters={() => setIsFilterOpen(!isFilterOpen)}
          />
          
          <ProductGrid products={filtered} />
        </div>
      </div>
    </main>
  );
}
