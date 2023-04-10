import { useRouter } from "next/router";
import Todos from '../todos';

export default function CategoryTodo() {
    const router = useRouter();
    const category = router.query.category;

    return (
        <Todos done={false} category={category}/>
    );
}