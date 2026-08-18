import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import features.oop.sub.ManagerDTO;
import features.oop.sub.StudentDTO;
import features.oop.sub.TeacherDTO;
import features.oop.sup.PersonDTO;

public class CollectionApp {
    /*
    Colletion API(- java.util.*)
    - List(중복허용, 순서존재, 요소의 타입으로 객체만, 가변길이)
    - Set(중복허용 X, 순서존재 X, 요소의 타입으로 객체만, 가변길이)
    - Map({key : value}, {key : value}, ....)

    Boxing, UnBoxing
    Wrapper Class ( primitive type -> reference type, reference type <- primitive type )
    - int -> Integer
    - char - Character

    Generics (파라미터 타입)
    T- type
    E - elements(collection)
    K - key
    V - value
    N - number
    */
    public static void main(String[] args) {
        System.out.println("debug >>>> array");
        int[] intAry = {1,2,3,4,5};
        System.out.println(intAry.length);
        System.out.println(Arrays.toString(intAry));

        System.out.println();
        System.out.println("debug >>>> Collection API - List");
        List<String> list = new ArrayList<>();
        list.add("String");
        // generic 문법에 의한 error
        // list.add(10);
        // list.add(true);
        System.out.println("debug >>>> list "+ list.size());
        System.out.println("debug >>>> list "+ list);
        for(int i = 0; i < list.size(); i++) {
            String data = list.get(i);
            System.out.println(data);

        }

        System.out.println();
        System.out.println("debug >>>> ArrayList Elements xxxxDTO");
        List<PersonDTO> personList = new ArrayList<PersonDTO>();
        StudentDTO student = StudentDTO.builder().name("inspire").build();
        TeacherDTO teacher = TeacherDTO.builder().name("jslim").build();
        ManagerDTO manager = ManagerDTO.builder().name("lgcns").build();
        
        personList.add(student); 
        personList.add(teacher); 
        personList.add(manager);

        // 명령형 처리
        // List<String> fileringList = new ArrayList<String>();
        // for(int i = 0; i < personList.size(); i++) {
        //     PersonDTO person = personList.get(i);
        //     if(person.getName().startsWith("j")) {
        //         fileringList.add(person.getName().toUpperCase());
        //     }
        // }

        // Stream API (선언적 처리)
        // 컬렉션을 Stream 객체로 바인딩하고 - 중간연산(0~N) - 연산결과를 최종연산(1)
        // System.out::println
        // s -> s.startsWith()
        // List<String> fileringList = personList.stream()
        //                                 .filter(s -> s.getName().startsWith("j"))
        //                                 .map(s -> s.getName().toUpperCase())
        //                                 .collect(Collectors.toList());
        // System.out.println(fileringList);

        personList.stream()
            .filter(person -> person.getName().length() > 5)
            // .forEach(System.out::println);
            .forEach(person -> System.out.println(person.personInfo()));

        System.out.println();
        System.out.println("debug >>>> Set");
        Set<String> set = new HashSet<>();
        set.add("jslim");
        set.add("inspire");
        set.add("lgcns");
        set.add("jslim");
        System.out.println(set);
        Object [] setAry = set.toArray();
        for(Object data : setAry) {
            System.out.println(data);
        }

        System.out.println();
        System.out.println("debug >>>> Map(key : value) === Json");

        List<StudentDTO> studentList = new ArrayList<StudentDTO>();
        List<TeacherDTO> teacherList = new ArrayList<TeacherDTO>();
        List<ManagerDTO> managerList = new ArrayList<ManagerDTO>();
        Map<String, List<? extends PersonDTO>> map = new HashMap<>();
        map.put("student", studentList);
        map.put("teacher", teacherList);
        map.put("manager", managerList);

        // List<? extends PersonDTO> mapList = map.get("manager");
        // mapList.forEach(person -> System.out.println(person.personInfo()));

        // map.get("student")
        //     .stream()
        //     .filter(null)
        //     .map(null)
        //     .forEach(person -> System.out.println(person.personInfo()));
    }
}