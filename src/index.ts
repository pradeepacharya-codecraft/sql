import "reflect-metadata";
import { User } from "./entities/user.entity.js";
import { Employee } from "./entities/employee.entity.js";
import { TABLE_METADATA_KEY } from "./entities/table.decorator.js";

console.log("User table:", Reflect.getMetadata(TABLE_METADATA_KEY, User));
console.log(
  "Employee table:",
  Reflect.getMetadata(TABLE_METADATA_KEY, Employee),
);

const newUser = new User({
  id: 0,
  name: "John Doe",
  address: "123 Main St",
  dob: new Date("1990-01-01"),
  email: "john.doe@example.com",
  createdAt: new Date(),
  createdBy: 1,
  updatedAt: new Date(),
  updatedBy: 1,
});

await newUser.save();

const newEmployee = new Employee({
  id: 1,
  name: "Jane Smith",
  position: "Software Engineer",
  department: "Engineering",
  salary: 90000,
  createdAt: new Date(),
  createdBy: 1,
  updatedAt: new Date(),
  updatedBy: 1,
});
await newEmployee.save();

await User.findById(1);

await User.findAll();

await User.findOne({ email: "john.doe@example.com" });

await User.deleteById(1);

await User.deleteOne({ email: "john.doe@example.com" });

await User.deleteAll();
