import features.oop.factory.BeanFactory;
import features.oop.tv.LGTV;
import features.oop.tv.SamsungTV;
import features.oop.tv.TV;

public class TVClientApp {
    public static void main(String[] args) {
        
        // SamsungTV tv = new SamsungTV();
        // tv.powerOn();
        // LGTV tv = new LGTV();
        // tv.tv();

        // TV tv = new SamsungTV();
        // tv.turnOn();

        // TV tv = SamsungTV.getInstance();
        // System.out.println("debug >>>> tv address " + tv);
        // tv.turnOn();

        // TV tv1 = SamsungTV.getInstance();
        // System.out.println("debug >>>> tv1 address " + tv1);
        // tv.turnOn();

        BeanFactory factory = BeanFactory.getInstance();
        TV tv = factory.getBrand("lg");
        tv.turnOn();
    }
}
