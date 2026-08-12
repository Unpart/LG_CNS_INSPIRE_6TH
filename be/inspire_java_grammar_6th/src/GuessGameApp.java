import java.util.Scanner;

import features.game.GuessGame;

public class GuessGameApp {
    public static void main(String[] args) {
        GuessGame game = new GuessGame();

        Scanner scan = new Scanner(System.in);

        // System.out.println("-------------For-------------");
        // String resultFor = game.gameFor(scan);
        // System.out.println(resultFor);

        // System.out.println("-------------While-------------");
        // String resultWhile = game.gameWhile(scan);
        // System.out.println(resultWhile);

        System.out.println("-------------DoWhile-------------");
        String resultDoWhile = game.gameDoWhile(scan);
        System.out.println(resultDoWhile);
    }
}
