package features.oop.service;

import features.oop.sub.ManagerDTO;
import features.oop.sub.StudentDTO;
import features.oop.sub.TeacherDTO;
import features.oop.sup.PersonDTO;
import features.oop.util.Flag;

/*
- 배열을 통한 xxxxxDTO 를 관리하고 싶다.
- search, delete, insert, update 요청 처리
*/
public class OopService {
    
    private PersonDTO [] ary;
    private int idx;

    public OopService() {
        ary = new PersonDTO[10];
        idx = 0;
    }
    // public void setAry(TeacherDTO tea) {
    //     ary[idx++] = tea;
    // }
    // public void setAry(ManagerDTO man) {
    //     ary[idx++] = man;
    // }
    // public void setAry(StudentDTO stu) {
    //     ary[idx++] = stu;
    // }
    public void setAry(PersonDTO per) {
        ary[idx++] = per;
    }

    // copy (shallow copy, deep copy)
    public PersonDTO [] getAry() {
        return ary;
    }

    /*
    CRUD
    params : flag, name, age, address, comm(ssn, subject, dept) 
    flag : 1 -> Student, 2 -> Teacher, 3 -> Mananger
    makePerson() 매개변수로 전달된 값을 가지고 타입에 맞는 객체를 생성하고 배열 담는 역할
    */
    public void makePerson(Flag flag, String name, int age, String address, String comm) {
        System.out.println("debug >>>> enum flag"+ flag) ;
        System.out.println("debug >>>> enum flag XXXXX" + flag.getFlag());

        // switch (flag) {
        //     case 1 -> System.out.println("학생");
        //     case 2 -> System.out.println("강사");
        //     case 3 -> System.out.println("매니저");
        // }
        // switch (flag) {
        //     case STUDENT -> System.out.println("학생");
        //     case TEACHER -> System.out.println("강사");
        //     case MANAGER -> System.out.println("매니저");
        // }
        PersonDTO per = (flag.getFlag() == 1) 
        ?
            StudentDTO.builder()
                .name(name).age(age).address(address)
                .ssn(comm).build()
        : (flag.getFlag() == 2) ?
            TeacherDTO.builder()
                .name(name).age(age).address(address)
                .subject(comm).build()
            :   ManagerDTO.builder()
                .name(name).age(age).address(address)
                .dept(comm).build() ;
        setAry(per);
    }

    /*
    params : name
    method : findPerson
    return : PersonDTO
    Q) 이름을 전달받아서 일치하는 이름을 가진 PersonDTO를 리턴한다.
    */
    public PersonDTO findPerson(String name) {
        PersonDTO[] per = getAry();
        for(int i = 0; i <= per.length; i++) {
            if(per[i] == null){
                break;
            } else if(per[i].getName().equals(name)){
                return per[i];
            }
        }
        return null;

        // PersonDTO result = null;
        // for(PersonDTO person :ary) {
        //     if(person == null) {
        //         break;
        //     } else {
        //         if(person.getName().equals(name)) {
        //             return person;
        //         }
        //     }
        // }
    }
}
