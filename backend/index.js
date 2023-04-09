
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string } from 'yup';


const todoYup = object({
    status: string().required(),
    text: string().required(),
    priority: string().optional(),
    dueDate: date().default(() => new Date()),
})

// Use Crudlify to create a REST API for any collection
crudlify(app, {todo: todoYup});

// bind to serverless runtime
export default app.init();
