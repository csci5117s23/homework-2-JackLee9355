import { useRouter } from "next/router";
import Todos from '../todos';

export default function IdTodo() {
    const router = useRouter();
    const id = router.query.id;

    return (
        <Todos done={false} id={id}/>
    );
}