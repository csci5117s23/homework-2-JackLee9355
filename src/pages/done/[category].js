import { useRouter } from "next/router";
import Todos from '../todos';

export default function DoneCategoryTodo() {
    const router = useRouter();
    const data = router.query.data;

    return (
        <Todos 
            done={true}
            category={data.length != 24 ? data : null}
            id={data.length == 24 ? data : null}
        />
    );
}