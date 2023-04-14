import { useState, useEffect } from 'react';
import Category from './category';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function Categories( { setSelectedCategories, newCategories, containerStyle, category } ) {

    const [categories, setCategories] = useState(null);
    const [selected, setSelected] = useState(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const token = await getToken({ template: "codehooks" });
            const response = await fetch(global.config.backend.apiUrl + "/category?owner=" + userId, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            setCategories(data);
            const toSelect = Array(data.length).fill(false);
            if (category) {
                let i = data.findIndex(c => c.name == category);
                if (i == -1) {
                    router.push("/404");
                }

                toSelect[i] = true;
            }
            setSelected(toSelect);
        }
        fetchData();
        console.log('fetching...');
    }, [newCategories, category]);

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
        <div style={containerStyle}>
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