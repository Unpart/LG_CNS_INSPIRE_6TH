import features.var.Teacher;

public class TeacherApp {
    
    public static void main(String[] args) {
        
        // new 연산자를 이용해서 instance를 생성할 수 있음
        Teacher teacher = new Teacher();
        System.out.println("teacher - " + teacher);

        // 인스턴스 소유 메서드 접근
        teacher.setName("임정섭");
        String name = teacher.getName();
        System.out.println(name);

        // 인스턴스 소유 변수 접근
        teacher.name = "inspire";
        System.out.println(name);

    }
}
