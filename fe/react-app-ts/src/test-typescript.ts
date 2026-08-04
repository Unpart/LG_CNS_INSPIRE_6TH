// script vs typescript

let userName: string = "Alice";
let age: number = 30;
let isMarraige: boolean = false;

console.log(`debug >>>> typescript userName `, typeof userName);
console.log(`debug >>>> typescript age `, typeof age);
console.log(`debug >>>> typescript isMarraige `, typeof isMarraige);

// array
let ary: string[] = ["임정섭", "김철수", "박영희"];

// 객체 타입을 선언하고 변수의 타입으로 사용햐야 함(interface)
interface User {
    email: string;
    password: string;
    address?: string; // optional property
}

const user: User = {
    email: "alice@example.com",
    password: "password123"
};
console.log(`debug >>>> user `, user);

let userAry: User[] = [
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
function showMessage(name: string): string {
    return `${name}님 환영합니다.`;
}
showMessage("Alice");

// union type
let status: string | number;
status = "success";
status = 404;
console.log(`debug >>>> union `, status);

export {};