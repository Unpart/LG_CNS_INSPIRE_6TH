package features.oop.tv;

public class LGTV implements TV{

    private static LGTV instance;

    private LGTV() {
    }
    
    public static LGTV getInstance() {
        if(instance == null){
            instance = new LGTV();
        }
        return instance;
    } 

    public void turnOn() {
        System.out.println("LG TV turnOn");
    }
}
