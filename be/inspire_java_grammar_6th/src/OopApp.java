import features.oop.sub.ManagerDTO;
import features.oop.sub.StudentDTO;
import features.oop.sub.TeacherDTO;
import features.oop.sup.PersonDTO;

public class OopApp {
    public static void main(String[] args) {
        
        // StudentDTO stu = new StudentDTO();
        // stu.setSsn("2026");
        // stu.setName(null);
        // stu.setAge(0);
        // stu.setAddress(null);

        System.out.println("debug >>>> StudentDTO");

        StudentDTO stu = new StudentDTO("임섭순", 20, "서울", "2026");
        System.out.printf("%s %d %s %s",stu.getName(), stu.getAge(), stu.getAddress(), stu.getSsn());
        System.out.println();

        System.out.println("debug >>>> TeacherDTO");

        TeacherDTO tea = new TeacherDTO("홍길동", 25, "경기", "cs");
        System.out.printf("%s %d %s %s",tea.getName(), tea.getAge(), tea.getAddress(), tea.getSubject());
        
        System.out.println();
        System.out.println("debug >>>> 변수타입의 다형성");
        PersonDTO manager = new ManagerDTO("김철수", 35, "부산", "manager");

        // Q) manager.getDept() 접근할 수 있는 방법은?
        // casting이 참조타입에 적용될 수 있음(다만, 상속관계를 전제로)
        // System.out.println(((ManagerDTO)manager).getDept());
        System.out.printf("%s %d %s %s",manager.getName(), manager.getAge(), manager.getAddress(), ((ManagerDTO)manager).getDept());

        System.out.println();
        System.out.println("debug >>>> 변수타입의 다형성을 활용 : 배열");

        PersonDTO [] ary = new PersonDTO[3];
        ary[0] = new TeacherDTO("임정섭",20,"서울","react");
        ary[1] = new ManagerDTO("김혜림",20,"서울","교육팀");
        ary[2] = new StudentDTO("이상혁",20,"서울","2026");

        PersonDTO per01 = ary[0];
        System.out.printf("%s %d %s %s",per01.getName(), per01.getAge(), per01.getAddress(), ((TeacherDTO)per01).getSubject());
        
        System.out.println();
        // for(int i = 0; i < ary.length; i++) {
        //     PersonDTO per = ary[i];
        //     if(per instanceof TeacherDTO) {
        //         System.out.printf("%s %d %s %s",per.getName(), per.getAge(), per.getAddress(), ((TeacherDTO)per).getSubject());
        //     } else if (per instanceof ManagerDTO) {
        //         System.out.printf("%s %d %s %s",per.getName(), per.getAge(), per.getAddress(), ((ManagerDTO)per).getDept());
        //     } else if (per instanceof StudentDTO) {
        //         System.out.printf("%s %d %s %s",per.getName(), per.getAge(), per.getAddress(), ((StudentDTO)per).getSsn());
        //     } else {
        //         System.out.println("뭔데");
        //     }
        //     System.out.println();
        // }
        
        for(int i = 0; i < ary.length; i++) {
            PersonDTO per = ary[i];
            System.out.println(per.personInfo());
        }
    }
}
