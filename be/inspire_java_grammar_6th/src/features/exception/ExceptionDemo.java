package features.exception;

import features.exception.util.InspireException;

/*
Error : 논리적 오류, etc....
Exception : mild Error
예외(예기치 못한 상황) 처리방법
- 예외발생 시점
    - compile(IOException)
    - runtime(RuntimeException)

예외처리 방법
- case 01
try{
    예외코드
} catch (발생된 예외객체를 정의){
    예외를 처리하고 예외발생시 수행하는 블럭
} finally {
    예외발생여부와 상관없이 무조건 수행되는 블럭
}

- case 02
public void xxxx() throws xxxxException {
    예외코드
}

사용자 정의 예외클래스
public class XXXXX extends Exception {

}

강제로 예외를 발생시키는 상황
throw new XXXXException
*/
public class ExceptionDemo {
    public void first(int x) throws InspireException{
        System.out.println("debug >>>> first method start");

        try{
            if(x < 0){
                throw new InspireException("양의 정수만 가능합니다!!");
            }
        } finally {
            System.out.println("debug >>>> first method end");
        }
    }
}
