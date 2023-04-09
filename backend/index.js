import { app } from 'codehooks-js'
import { crudlify } from 'codehooks-crudlify'
import { date, object, string, array } from 'yup';

const categoryYup = object({
    owner: string().required(),
    name: string().required(),
    description: string().optional(),
});

const todoYup = object({
    owner: string().required(),
    status: string().required(),
    text: string().required(),
    priority: string().optional(),
    dueDate: date().optional(),
    categories: array().of(string()).optional(),
});

crudlify(app, { todo: todoYup, category: categoryYup });

export default app.init();