// import 'reflect-metadata';
// import { User } from "./entities/user.entity.js";
// import { Employee } from "./entities/employee.entity.js";
// import { TABLE_METADATA_KEY } from './entities/table.decorator.js';
// // import { User } from './entities/user.entity.js';
// // import { Employee } from './entities/employee.entity.js';
// console.log('User table:', Reflect.getMetadata(TABLE_METADATA_KEY, User));
// console.log('Employee table:', Reflect.getMetadata(TABLE_METADATA_KEY, Employee));
// const newUser = new User({
//     id: 0,
//     name: 'John Doe',
//     address: '123 Main St',
//     dob: new Date('1990-01-01'),
//     email: 'john.doe@example.com',
//     createdAt: new Date(),
//     createdBy: 1,
//     updatedAt: new Date(),
//     updatedBy: 1
// });
// await newUser.save();
// const newEmployee = new Employee({
//     id: 1,
//     name: 'Jane Smith',
//     position: 'Software Engineer',
//     department: 'Engineering',
//     salary: 90000,
//     createdAt: new Date(),
//     createdBy: 1,
//     updatedAt: new Date(),
//     updatedBy: 1
// });
// await newEmployee.save();
// const emp = await User.findById(1);
// await User.findAll();
// await User.findOne({ email: 'john.doe@example.com' });
// await User.deleteById(1);
// await User.deleteOne({ email: 'john.doe@example.com' });
// await User.deleteAll();
// const foundEmployee = await Employee.findById(1);
import 'reflect-metadata';
import { User } from "./entities/user.entity.js";
import { Employee } from "./entities/employee.entity.js";
import { TABLE_METADATA_KEY } from './entities/table.decorator.js';
console.log('User table:', Reflect.getMetadata(TABLE_METADATA_KEY, User));
console.log('Employee table:', Reflect.getMetadata(TABLE_METADATA_KEY, Employee));
// INSERT (id: 0)
const newUser = new User({
    id: 0,
    name: 'John Doe',
    address: '123 Main St',
    dob: new Date('1990-01-01'),
    email: 'john.doe@example.com',
    createdAt: new Date(),
    createdBy: 1,
    updatedAt: new Date(),
    updatedBy: 1
});
console.log('\n--- save() INSERT ---');
await newUser.save();
// UPDATE (id: 1)
const newEmployee = new Employee({
    id: 1,
    name: 'Jane Smith',
    position: 'Software Engineer',
    department: 'Engineering',
    salary: 90000,
    createdAt: new Date(),
    createdBy: 1,
    updatedAt: new Date(),
    updatedBy: 1
});
console.log('\n--- save() UPDATE ---');
await newEmployee.save();
console.log('\n--- findById ---');
const emp = await User.findById(1);
console.log('findById result:', emp);
console.log('\n--- findAll ---');
const allUsers = await User.findAll();
console.log('findAll result:', allUsers);
console.log('\n--- findOne ---');
const oneUser = await User.findOne({ email: 'john.doe@example.com' });
console.log('findOne result:', oneUser);
console.log('\n--- deleteById ---');
await User.deleteById(1);
console.log('\n--- deleteOne ---');
await User.deleteOne({ email: 'john.doe@example.com' });
console.log('\n--- deleteAll ---');
await User.deleteAll();
console.log('\n--- Employee findById ---');
const foundEmployee = await Employee.findById(1);
console.log('Employee findById result:', foundEmployee);
//# sourceMappingURL=index.js.map