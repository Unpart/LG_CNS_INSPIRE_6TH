import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.stream.Stream;

import features.lambda.InspireFunction;

/*
Java Stream API
- 코드의 가독성, 병렬처리, 유지보수 향상
- 작업을 내부적으로 처리(람다식)
- 원본데이터의(Collection) 손상을 가하지 않음.
- 일회성

*/

public class StreamApp {
    public static void main(String[] args) {
        InspireFunction func01 = (x, y) -> x > y ? x : y;
        System.out.println(func01.Max(100, 200));

        System.out.println();
        InspireFunction func02 = (x, y) -> x + y;
        System.out.println(func02.Max(100, 200));

        System.out.println();
        System.out.println("debug >>>> Supplier");
        Supplier<String> supplier = () -> "inspire";
        System.out.println(supplier.get());

        System.out.println();
        System.out.println("debug >>>> Consumer");
        Consumer<String> consumer = (str) -> System.out.println(str.split(" ")[1]);
        consumer
            .andThen(System.out::println)
            .accept("lgcns inspire");

        System.out.println();
        System.out.println("debug >>>> Function");
        Function<String, Integer> function = (str) -> {
            return str.length();
        };
        Integer len = function.apply("lgcns inspire 6th camp(feat. jslim)");
        System.out.println(len);

        System.out.println();
        System.out.println("debug >>>> Predicate");
        Predicate<String> predicate = (str) -> str.equals("lgcns");
        Boolean isFlag = predicate.test("inspire");
        System.out.println(isFlag);

        System.out.println();
        System.out.println("debug >>>> forEach");
        List<String> brands = 
            Arrays.asList("samsung", "lg", "lgcns", "inspire", "camp", "6th");
        // brands.forEach((brand) -> System.out.println(brand));
        // brands.forEach(System.out::println);

        System.out.println();
        System.out.println("debug >>>> collection -> stream");
        System.out.println("debug >>>> stream : 가공 - 최종연산");
        Stream<String> stream = brands.stream();

        stream.forEach((brand) -> {
            System.out.println(brand);
        });
        
        System.out.println("debug >>>> 메서드 참조방식");
        stream = brands.stream();
        stream.forEach(System.out::println);
    }
}
