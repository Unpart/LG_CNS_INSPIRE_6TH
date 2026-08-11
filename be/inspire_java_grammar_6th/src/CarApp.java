import features.car.Car;

public class CarApp {
    public static void main(String[] args) {
        Car car = new Car();
        car.brand = "아우디";
        System.out.println("car brand : "+ car.brand);

        ////////////////////////
        Car bmw = new Car("BMW");
        System.out.println("car brand : "+ bmw.brand);

         ////////////////////////
        Car benz = new Car("BENZ", "C200");
        System.out.println("car brand : "+ benz.brand + ", car model : "+ benz.model);

        Car car1 = new Car();
        car1.setBrand("KIA");
        car1.setModel("K5");
        System.out.println("car brand : "+ car1.getBrand() + ", car model : "+ car1.getModel());
        System.out.println("car Info : "+ car1.carInfo());

    }
}
