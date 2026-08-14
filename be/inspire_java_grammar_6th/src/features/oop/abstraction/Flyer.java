package features.oop.abstraction;

/*
interface
- 상수, 추상메서드
- 객체 생성 X
- 표준역할을 담당
*/
public interface Flyer {

    public int STUDENT = 1;

    public void fly();
    public void takeOff();
    public void landing();
}
