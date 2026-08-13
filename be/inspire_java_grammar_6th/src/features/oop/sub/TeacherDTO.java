package features.oop.sub;

import features.oop.sup.PersonDTO;

public class TeacherDTO extends PersonDTO {

    private String subject;

    public TeacherDTO() {

    }
    
    public TeacherDTO(String name, int age, String address, String subject) {
        super(name, age, address);
        this.subject = subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getSubject() {
        return subject;
    }

    @Override
    public String personInfo() {
        return super.personInfo() + ", subject=" + subject;
    }
}
