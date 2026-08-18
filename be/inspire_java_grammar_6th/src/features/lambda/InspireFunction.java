package features.lambda;
/*
함수형 인터페이스
- 인터페이스가 가질 수 있는 메서드가 딱 하나인 것을 의미
- 람다식을 활용하기 위해서 

Supplier : 매개변수 X, 반환타입 O
Consumer : 매개변수 O, 반환타입 X
Function : 매개변수 O, 반환타입 O
predicate : 매개변수 O, 반환타입 Boolean
*/

@FunctionalInterface
public interface InspireFunction {
    public int Max(int x, int y);
}
