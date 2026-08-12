package features.operator;

import features.blogs.domain.dto.BlogRequestDTO;
import features.blogs.domain.dto.BlogResponseDTO;

public class OperatorDemo {

    private int number;

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
    
    public OperatorDemo() {

    }

    // 반환타입 X, 매개변수 X
    public void operator() {
        System.out.println(">>> 산술 연산자 : +, -, *, /, %, +=, -=, *=, /= etc...");
        System.out.println(">>> 증감 연산자 : ++, --");
        System.out.println(">>> 삼항 연산자 : (조건식) ? true : false");
        System.out.println(">>> 논리 연산자 : &, |, !, &&, ||");
        System.out.println(">>> 관계 연산자 : >, >=, <, <=, ==, !=");
    }   

    // 반환타입 O, 매개변수 O
    public BlogResponseDTO register(String title, String content, String email) {
        System.out.println(">>>> 반환타입 O, 매개변수 O");
        System.out.println(">>>> 전달된 매개변수를 가지고 업무로직을 처리");
        if(email == "jslim9413@naver.com") {
            return new BlogResponseDTO(201,"OK");
        } else {
            return new BlogResponseDTO(400,"FAIL");
        }
    }
    public BlogResponseDTO register(BlogRequestDTO request) {
        if(request.getEmail() == "jslim9413@naver.com") {
            return new BlogResponseDTO(201,"OK");
        } else {
            return new BlogResponseDTO(400,"FAIL");
        }
    }

    /*
    Q)
    매개변수 number 값의 범위 : 1 ~ 3
    - 1 : 금도끼, 2 : 은도끼, 3 : 쇠도끼
    - 나무꾼이 자기의 도끼가 1번이라고 하면 -> 산신령이 대답하길 "거짓말 하는구나"
    - 나무꾼이 자기의 도끼가 2번이라고 하면 -> 산신령이 대답하길 "또 거짓말 하는구나"
    - 나무꾼이 자기의 도끼가 3번이라고 하면 -> 산신령이 대답하길 "정직하구나 너에게 모든 도끼를 주겠다"
    */
    public String woodMain(int number) {
        // case 1 : if-else 문
        // if(number == 1) {
        //     return "거짓말 하는구나";
        // } else if(number == 2) {
        //     return "또 거짓말 하는구나";
        // } else if(number == 3) {
        //     return "정직하구나 너에게 모든 도끼를 주겠다";
        // } else {
        //     return null;
        // }

        // case 2 : switch 문
        // switch (number) {
        //     case 1:
        //         return "거짓말 하는구나";
        //     case 2:
        //         return "또 거짓말 하는구나";
        //     case 3:
        //         return "정직하구나 너에게 모든 도끼를 주겠다";
        //     default:
        //         return null;
        // }

        // case 3 : 삼항연산자
        // return (number < 1 || number > 3) ? "1~3 사이의 번호만 말할 수 있느니라"
        //         : (number == 1) ? "거짓말하는구나"
        //                 : (number == 2) ? "거짓말하는구나"
        //                         : "정직하구나. 너에게 모든 도끼를 주겠다";

        // case 4 : lambda
        // case params type : byte, short, int, char, String, enum
        // lambda : ->
        return switch (number) {
            case 1 -> "거짓말 하는구나";
            case 2 -> "또 거짓말 하는구나";
            case 3 -> "정직하구나 너에게 모든 도끼를 주겠다";
            default -> "1 ~ 3 사이의 숫자를 입력해주세요";
        };
    }
    /*
        반복구문?(for ~ , while, do ~ while)
        - [] , Collection API(List, set, map)
        - java ver 8 ~ Stream API(forEach ~) : lambda expression
        - 함수형 인터페이스(Supplier, Consumer, Function, Predicate)
        - 요소의 타입으로 기본타입보다 참조타입을 활용하는 방법
        - continue, break : 반복도중 종료, 계속진행하기 위한 키워드
        */
    
    // 하한값의 경계와 상한값의 경계를 포함하는 총합을 반환하고 싶다면?
    public int sumNumber(int start, int end) {
        int result = 0;
        for(int i = start; i <= end; i++) {
            result += i;
        }
        return result;
    }

    /*
    Q)
    ? static
    - 1 ~ 100 사이의 난수를 발생시킬예정(어떻게)
    - casting
    int nan = (int)(Math.random() * 100) + 1;
    - 1 ~ 해당 난수까지의 누적합을 계산
    hint)
    - static
    - argument X,
    - return type : int
    - method name : sumRandom 
    */

    public static int sumRandom() {
        int result = 0;
        int end = 100;
        int nan = (int)(Math.random() * 100) + 1;
        System.out.println("랜덤 숫자(1~100) : " + nan);
        // for문
        // for(int i = nan; i <= end; i++) {
        //     result += i;
        // }

        // while문
        // while(nan <= end) {
        //     result += nan;
        //     nan++;
        // }

        // do ~ while()
        do {
            result += nan;
            nan++;
        } while (nan <= end);

        return result;
    }
   
    /*
    format : %d, %s, %f
    Sysout.out.printf()

    - argument : int
    - return type : void
    - method name : printGugudan
    */

    public void printGugudan(int dan) {
        for(int i = 1; i <= 9; i++) {
            System.out.printf("%d * %d = %d\t", dan, i, dan * i);
        }
    }

    /*
    Q)
    - 5단까지만 출력하고 루프를 빠져나가고 싶다면?
    */
    public void gugudan() {
        outer:
        for(int row = 2; row <= 9; row++){
            // if(row == 5){
            //     continue;
            // }
            inter:
            for(int col = 1; col <= 9; col++){
                if(row == 5){
                    break outer;
                }
                System.out.printf("%d * %d = %d\t",row, col,(row * col));
            }
            System.out.println();
        }
    }

    // Q) 문자열도 반복구문 이용이 가능한가?
    public void popstr(String str) {
        System.out.println("debug >>>> params : " + str);
        System.out.println("debug >>>> params length : " + str.length());
        for(int i = str.length()-1 ; i >= 0; i--){
            System.out.print(str.charAt(i));
        }
    }
}

