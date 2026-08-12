package features.game;

import java.util.Scanner;

/*
Q) 숫자를 맞추는 게임
- 난수(1 ~ 100) : answer
- 주어진 기회는 10번 (up, down)

콘솔로부터 데이터를 입력받기 위한(java.util.scanner)
- 성공) "x번 만에 정답을 맞췄습니다."
- 실패) "10번의 기회를 모두 소진했습니다."
*/
public class GuessGame {

    public GuessGame() {
    }
    
    public String gameFor(Scanner scan){
        int answer = (int)(Math.random()*100);
        for(int count = 1; count <= 10; count++){
            System.out.print("생각하는 숫자를 입력하세요 : ");
            int guess = scan.nextInt();
            if(guess == answer) {
                return count + "%번 만에 정답을 맞췄습니다.";
            } else if(guess > answer) {
                System.out.println("숫자가 너무 큽니다.");
            } else {
                System.out.println("숫자가 너무 작습니다.");
            }
        }
        return "10번의 기회를 모두 소진했습니다.";
    }
    public String gameWhile(Scanner scan){
        int answer = (int)(Math.random()*100);
        int count = 1;
        while(count <= 10){
            System.out.print("생각하는 숫자를 입력하세요 : ");
            int guess = scan.nextInt();
            if(guess == answer) {
                return count + "번 만에 정답을 맞췄습니다.";
            } else if(guess > answer) {
                System.out.println("숫자가 너무 큽니다.");
            } else {
                System.out.println("숫자가 너무 작습니다.");
            }
            count++;    
        }
        return "10번의 기회를 모두 소진했습니다.";
    }
    public String gameDoWhile(Scanner scan){
        int answer = (int)(Math.random()*100);
        int count = 1;
        do {
            System.out.print("생각하는 숫자를 입력하세요 : ");
            int guess = scan.nextInt();
            if(guess == answer) {
                return count + "번 만에 정답을 맞췄습니다.";
            } else if(guess > answer) {
                System.out.println("숫자가 너무 큽니다.");
            } else {
                System.out.println("숫자가 너무 작습니다.");
            }
            count++;    
        } while(count <= 10);
        return "10번의 기회를 모두 소진했습니다.";
    }
}
