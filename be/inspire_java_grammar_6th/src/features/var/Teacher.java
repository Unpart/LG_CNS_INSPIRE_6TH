package features.var;

public class Teacher {

    // 선언 위치가 클래스 블럭으로 멤버변수
    public String name;
    public int age;
    public char gender;
    public String job;
    
    /*
    메서드
    - 구문형식
    - 반환타입 : 기본타입, 참조타입, void
    접근지정자 반환타입 메서드명([매개변수]) {
    }
    */

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public char getGender() {
        return gender;
    }
    public void setGender(char gender) {
        this.gender = gender;
    }
    public String getJob() {
        return job;
    }
    public void setJob(String job) {
        this.job = job;
    }


    
}
