// script vs typescript
let userName = "Alice";
let age = 30;
let isMarraige = false;
console.log(`debug >>>> typescript userName `, typeof userName);
console.log(`debug >>>> typescript age `, typeof age);
console.log(`debug >>>> typescript isMarraige `, typeof isMarraige);
// array
let ary = ["임정섭", "김철수", "박영희"];
const user = {
    email: "alice@example.com",
    password: "password123"
};
console.log(`debug >>>> user `, user);
let userAry = [
    {
        email: "alice@example.com",
        password: "password123"
    },
    {
        email: "bob@example.com",
        password: "password456",
        address: "123 Main St"
    }
];
console.log(`debug >>>> userAry `, userAry);
// 함수
function showMessage(name) {
    return `${name}님 환영합니다.`;
}
showMessage("Alice");
// union type
let status;
status = "success";
status = 404;
console.log(`debug >>>> union `, status);
export {};
