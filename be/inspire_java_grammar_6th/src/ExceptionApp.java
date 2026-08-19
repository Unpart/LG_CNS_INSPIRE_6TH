import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import features.exception.ExceptionDemo;

public class ExceptionApp {
    public static void main(String[] args) /*throws IOException*/{
        System.out.println("debug >>>> main start");

        // System.out.println("debug >>>> runtime exception ~ ");
        // String [] strAry = {"jslim", "inspire", "lgcns"};
        // try {
        //     for(int i=0; i<=strAry.length; i++) {
        //         System.out.println("debug >>>> catch 예외발생시에만 수행");
        //         System.out.println(strAry[i]);
        //     }
        // } catch (ArrayIndexOutOfBoundsException e) {
        //     e.printStackTrace();
        // } finally {
        //     System.err.println("debug >>>> 예외발생 여부와 상관없이 수행");
        // }
        
        // System.out.println("debug >>>> runtime exception ~ ");

        // BufferedReader br = new BufferedReader(new InputStreamReader(System.in)) ;
        // String line = null;
        // try {
        //     System.out.print("메시지를 입력하세요 : ");
        //     line = br.readLine();
        // } catch (IOException e) {
        //     e.printStackTrace();
        // }
        // System.out.println(line);

        System.out.println("debug >>>> user exception and throw");
        ExceptionDemo demo = new ExceptionDemo();
        try {
            demo.first(10);
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("debug >>>> main end");
    }
}
