import { useState, useEffect } from 'react';
import Category from './category';

export default function Categories( { setSelectedCategories, newCategories } ) {

    const [categories, setCategories] = useState(null);
    const [selected, setSelected] = useState(null);
    const USER = "IDK";

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(global.config.backend.apiUrl + "/category?owner=" + USER, {
                method: "GET",
                headers: {
                    "x-apikey": global.config.backend.apiKey
                }
            });
            const data = await response.json();
            setCategories(data);
            setSelected(Array(data.length).fill(false));
        }
        fetchData();
    }, [newCategories]);

    useEffect(() => {
        if (categories == null) {
            return;
        }

        const selectedCategories = [];
        for (let i = 0; i < categories.length; i++) {
            if (selected[i]) {
                selectedCategories.push(categories[i]);
            }
        }
        setSelectedCategories(selectedCategories);
    }, [selected]);

    return (
        <div>
            {categories == null ? "Loading Categories..." : categories.map((category, index) => {

                const select = () => {
                    const newSelected = [...selected];
                    newSelected[index] =!newSelected[index];
                    setSelected(newSelected);
                }

                return (
                    <Category
                        key={category.name}
                        category={category.name}
                        selected={selected[index]}
                        onClick={select}
                    />
                )
            })}
        </div>
    )
}