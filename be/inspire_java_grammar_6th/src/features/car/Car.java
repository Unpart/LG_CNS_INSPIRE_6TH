package features.car;

public class Car {
    public String brand;
    public String model;
    
    private String brand1;
    private String model1;
    
    public String getBrand() {
        return brand1;
    }

    public void setBrand(String brand1) {
        this.brand1 = brand1;
    }

    public String getModel() {
        return model1;
    }

    public void setModel(String model1) {
        this.model1 = model1;
    }

    // 반환값 O, 매개변수 X
    public String carInfo() {
        return getBrand() + "\t" + getModel();
    }
    /* 
    constructor(생성자)
    - 반환타입이 void 아니고 없다.
    - 메서드의 이름이 클래스의 이름과 동일하다.
    - 인스턴스 소유가 아니므로
    - 일반 메서드 처럼 호출 되어질 수 없고
    - 반드시 new 연산자 뒤에서만 호출 되어야 함.
    */ 
    public Car() {

    }

    /*
    constructor overloading
    - 매개변수의 타입과 개수를 달리해서 선언된 것
    */
    public Car(String brand) {
        this.brand = brand;
    }

    public Car(String brand, String model) {
        this.brand = brand;
        this.model = model;
    }
}
