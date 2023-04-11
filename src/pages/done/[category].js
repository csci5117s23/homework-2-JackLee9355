import { useRouter } from "next/router";
import Todos from '../todos';

export default function DoneCategoryTodo() {
    const router = useRouter();
    const category = router.query.category;

    return (
        <Todos done={true} category={category}/>
    );
}