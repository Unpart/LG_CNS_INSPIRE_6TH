package features.oop.util;

/*
enum은 특수클래스로 정해진 상수집합
*/
public enum Flag {
    STUDENT(1), TEACHER(2), MANAGER(3);

    private final int flag;

    private Flag(int flag){
        this.flag = flag;
    }

    public int getFlag() {
        return this.flag;
    }
}