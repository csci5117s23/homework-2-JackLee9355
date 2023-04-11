import { useAuth, UserButton } from '@clerk/nextjs';
import Categories from './categories';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Header({category}) {
    const [newCategories, setNewCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(category ? [{name: category}] : []);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        let pathname;
        if (selectedCategories.length > 0) {
            console.log(selectedCategories);
            const newCategory = selectedCategories.find(c => c.name != category);
            if (newCategory) { 
                pathname = '/todos/' + newCategory.name;
                if (pathname !== router.pathname) {
                    router.push(pathname);
                }
            }
        } else {
            pathname = '/todos';
            if (pathname !== router.pathname) {
                router.push(pathname);
            }
        }
      }, [selectedCategories]);

    return (
        <div style={{
            paddingLeft: "10px",
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-between',
            height: '75px',
            width: '100vw',
            backgroundColor: 'var(--green)',
            borderBottom: '2px solid black',
        }}>
            <h1>Epic Todo List</h1>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent:'center',
                alignContent: 'center',
                paddingRight: '40px',
                alignItems: 'center',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    alignContent: 'center',
                    height: 'fit-content',
                }}> 
                    <Categories
                        setSelectedCategories={setSelectedCategories}
                        newCategories={newCategories}
                        category={category}
                        containerStyle={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: 'fit-content',
                            marginRight: '10px',
                        }}
                    />
                    <div style={{
                        width: 'fit-content',
                        height: 'fit-content',
                    }}>
                        {userId && <UserButton />}
                    </div>
                </div>
            </div>
        </div>
    )
}